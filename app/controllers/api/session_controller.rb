class Api::SessionController < Api::BaseController
  before_action :authenticate_any!, only: [:identity]

  def identity
    user = current_user
    render json: user, serializer: UserSerializer
  end

end
