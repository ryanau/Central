class Api::User::TasksController < Api::BaseController
  before_action :authenticate_api_user!

  def index
    event = Event.find(params[:event_id])
    tasks = event.tasks.where(user_id: current_user.id)
    render_json_message(200, resource: {tasks: tasks.map(&:serialize)})
  end

  def show
    event = Event.find(params[:event_id])
    task = event.tasks.find(params[:id])
    # authorize! :read, task
    render_json_message(200, resource: {task: task.user_task_serialize})
    rescue
      render_json_message(404, errors: ["Task not found."])
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
