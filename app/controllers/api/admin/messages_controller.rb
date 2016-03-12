class Api::Admin::MessagesController < Api::BaseController
  before_action :authenticate_api_admin!

  def approve
    message_id = params[:message_id]
    message = Message.find(message_id)
    message.approve
    report = message.report
    render_json_message(200, resource: {report: report.serialize})
  end
end
