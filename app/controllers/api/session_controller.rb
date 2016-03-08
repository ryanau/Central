class Api::SessionController < Api::BaseController
  before_action :authenticate_any!, only: [:identity]

  def identity
    user = current_user
    if user.is_a?(User)
      authorization = 'user'
    else
      authorization = 'admin'
    end
    render_json_message(:ok, resource: {identity: user.serialize, authorization: authorization})
  end

end
