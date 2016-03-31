class Api::Admin::TasksController < Api::BaseController
  before_action :authenticate_api_admin!

  def approve
    task = Task.find(params[:task_id])
    task.approve

    event = task.event
    render_json_message(200, message: "Task approved!", resource: {event: event.event_task_serialize})
  end
end
