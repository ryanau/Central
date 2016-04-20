require 'date'

class Api::User::TasksController < Api::BaseController
  before_action :authenticate_api_user!

  def index
    event = Event.find(params[:event_id])
    approved_tasks = event.approved_tasks.where(user_id: current_user.id).order(created_at: :DESC)
    unapproved_tasks = event.unapproved_tasks.where(user_id: current_user.id).order(created_at: :DESC)
    dispatched_tasks = event.dispatched_tasks.where(user_id: current_user.id).order(created_at: :DESC)
    render_json_message(200, resource: {approved_tasks: approved_tasks.map(&:serialize), unapproved_tasks: unapproved_tasks.map(&:serialize), dispatched_tasks: dispatched_tasks.map(&:serialize), event_id: event.id})
  end

  def show
    task = current_user.tasks.find_by(event_id: params[:event_id], id: params[:id])
    # authorize! :read, task
    render_json_message(200, resource: {task: task.user_task_serialize})
    # rescue
    #   render_json_message(404, errors: ["Task not found."])
  end

  def create
    task = Task.create!(create_params)
    if !params[:task][:object_tags].nil?
      task.add_object_tags(params[:task][:object_tags])
    end
    if !params[:task][:verb_tags].nil?
      task.add_verb_tags(params[:task][:verb_tags])
    end
    # TaskBuilderWorker -> TaskBuilder
    task.build_task
    event = Event.find(task.event_id)
    approved_tasks = event.approved_tasks.where(user_id: current_user.id)
    unapproved_tasks = event.unapproved_tasks.where(user_id: current_user.id)
    dispatched_tasks = event.dispatched_tasks.where(user_id: current_user.id)
    render_json_message(201, message: "Task created!", resource: {approved_tasks: approved_tasks.map(&:serialize), unapproved_tasks: unapproved_tasks.map(&:serialize), dispatched_tasks: dispatched_tasks.map(&:serialize), event_id: event.id})
    rescue
      render_json_message(500, errors: ["Error when creating task."])
  end

  private

  def create_params
    startDT = Time.at(params[:task][:start].to_i).to_datetime
    endDT = Time.at(params[:task][:end].to_i).to_datetime
    params.require(:task).permit(:title, :zipcode, :number_of_volunteers, :date_time, :location, :description, :event_id, :task_type_id).merge(user_id: current_user.id, start: startDT, end: endDT)
  end
end
