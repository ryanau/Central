class Api::SessionController < Api::BaseController
  before_action :authenticate_api_user!, only: [:show]

  def identity
    user = current_user
    render json: UserSerializer.new(user).to_json
  end

end
