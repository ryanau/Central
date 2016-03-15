class Api::SessionController < Api::BaseController
  before_action :authenticate_any!

  def identity
    user = current_user
    if user.is_a?(User)
      authorization = 'user'
    else
      authorization = 'admin'
    end
    render_json_message(200, resource: {identity: user.identity_serialize, authorization: authorization})
  end

end
