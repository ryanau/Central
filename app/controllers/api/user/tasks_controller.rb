class Api::User::TasksController < Api::BaseController
  before_action :authenticate_api_user!

  def index
    event = Event.find(params[:event_id])
    approved_tasks = event.approved_tasks.where(user_id: current_user.id)
    unapproved_tasks = event.unapproved_tasks.where(user_id: current_user.id)
    dispatched_tasks = event.dispatched_tasks.where(user_id: current_user.id)
    render_json_message(200, resource: {approved_tasks: approved_tasks.map(&:serialize), unapproved_tasks: unapproved_tasks.map(&:serialize), dispatched_tasks: dispatched_tasks.map(&:serialize)})
  end

  def show
    task = Task.find_by(event_id: params[:event_id], id: params[:id])
    # authorize! :read, task
    render_json_message(200, resource: {task: task.user_task_serialize})
    # rescue
    #   render_json_message(404, errors: ["Task not found."])
  end

  def create
    task = Task.create!(create_params)
    # make into async
    task.build_task
    event = Event.find(task.event_id)
    tasks = event.tasks.where(user_id: current_user.id)
    render_json_message(201, message: "Task created!", resource: {tasks: tasks.map(&:serialize)})
    rescue
      render_json_message(500, errors: task.errors.messages[:name])
  end

  def demo_get
    task = Task.create!(title: "Debris cleaning", zipcode: "94704", number_of_volunteers: 20, user_id: 1, event_id: 1, task_type_id: 1)
    task.build_task
    render_json_message(201, message: "Task created!")
  end

  private

  def create_params
    params.require(:task).permit(:title, :zipcode, :number_of_volunteers, :date_time, :event_id, :task_type_id).merge(user_id: current_user.id)
  end
end
