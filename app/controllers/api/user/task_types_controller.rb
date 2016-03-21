class Api::User::TaskTypesController < Api::BaseController
  before_action :authenticate_api_user!

  def index
    task_types = TaskType.all
    render_json_message(200, resource: {task_types: task_types.map(&:serialize)})
  end
end
