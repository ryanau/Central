class ApplicationController < ActionController::API
  # protect_from_forgery with: :null_session
  include DeviseTokenAuth::Concerns::SetUserByToken
  include CanCan::ControllerAdditions

  # Handle unauthorized requests
  rescue_from CanCan::AccessDenied do |exception|
    render_json_message(:unauthorized, errors: [exception.message])
  end

  def render_json_message(status, options = {})
    render json: {
      message: options[:message],
      resource: options[:resource],
      to: options[:to],
      errors: options[:errors]
    }, status: status
  end
end
