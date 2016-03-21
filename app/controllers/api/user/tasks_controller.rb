class Api::User::TasksController < Api::BaseController
  # before_action :authenticate_api_user!

  def index
    event = Event.find(params[:event_id])
    tasks = event.tasks.where(user_id: current_user.id)
    p '8' *40
    p tasks
    render_json_message(200, resource: {tasks: tasks.map(&:serialize)})
  end

  def create
    task = Task.create!(create_params)
    task.build_task
    render_json_message(201, message: "Task created!")
    rescue
      render_json_message(500, errors: task.errors.messages[:name])
  end

  def demo_get
    task = Task.create!(title: "Debris cleaning", zipcode: "94704", number_of_volunteers: 20, user_id: 1, event_id: 1, task_type: 1)
    task.build_task
    render_json_message(201, message: "Task created!")
  end

  private

  def create_params
    params.require(:task).permit(:title, :zipcode, :number_of_volunteers, :date_time, :event_id, :task_type).merge(user_id: current_user.id)
  end
end
