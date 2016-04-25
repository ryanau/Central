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

  def account
    organization_name = current_user.organization_name
    render_json_message(200, resource: {organization_name: organization_name})
  end

  def update_organization_name
    organization_name = params[:organization_name]
    current_user.update(organization_name: organization_name)
    message = "Organization name updated as: #{organization_name}"
    render_json_message(201, message: message,resource: {organization_name: organization_name})
    rescue
      render_json_message(500, errors: ["Error updating organization name."])
  end
end
