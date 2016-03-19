class Api::User::TasksController < Api::BaseController
  before_action :authenticate_api_user!

  def index
    
  end

  def create
    task = Task.create!(create_params)

  end

  private

  def create_params
    params.require(:task).permit(:title, :zipcode, :number_of_volunteers, :date_time).merge(user_id: current_user.id)
  end
end
