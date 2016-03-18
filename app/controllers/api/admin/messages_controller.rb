class Api::Admin::MessagesController < Api::BaseController
  before_action :authenticate_api_admin!

  def approve
    message = Message.find(params[:message_id])
    message.approve
    report = message.report
    render_json_message(200, message: "Message approved!", resource: {report: report.serialize})
  end
end
