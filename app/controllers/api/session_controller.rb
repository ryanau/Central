class Api::SessionController < Api::BaseController
  before_action :authenticate_any!, only: [:identity]

  def identity
    user = current_user
    render json: UserSerializer.new(user).to_json
  end

end
