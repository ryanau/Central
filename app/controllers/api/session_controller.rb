class Api::SessionController < Api::BaseController
  before_action :authenticate_any!

  def identity
    uid = params[:uid]
    user = current_user
    if user.is_a?(User)
      authorization = 'user'
    else
      authorization = 'admin'
    end
    render_json_message(200, resource: {identity: user.identity_serialize, authorization: authorization, uid: uid})
  end

end
