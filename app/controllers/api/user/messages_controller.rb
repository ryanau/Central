class Api::User::MessagesController < Api::BaseController
  before_action :authenticate_api_user!

  def index
    report = Report.find(params[:report_id])
    # authorize! :read, report
    approved_messages = report.approved_messages.where(user_id: current_user.id)
    unapproved_messages = report.unapproved_messages.where(user_id: current_user.id)
    render_json_message(200, resource: {approved_messages: approved_messages.map(&:user_message_serialize), unapproved_messages: unapproved_messages.map(&:user_message_serialize)})
  end

  def update
    message = Message.find(params[:id])
    report = Report.find(message.report_id)
    authorize! :update, message
    if message.update!(update_params)
      message.update(approved: false)
    end
    approved_messages = report.approved_messages.where(user_id: current_user.id)
    unapproved_messages = report.unapproved_messages.where(user_id: current_user.id)
    render_json_message(200, message: "Message saved!", resource: {approved_messages: approved_messages.map(&:user_message_serialize), unapproved_messages: unapproved_messages.map(&:user_message_serialize)})
    rescue
      render_json_message(403, errors: ["Not authorize to update this message."])
  end

  def create
    message = Message.create!(create_params)
    authorize! :create, message
    approved_messages = Report.find(message.report_id).approved_messages.where(user_id: current_user.id)
    unapproved_messages = Report.find(message.report_id).unapproved_messages.where(user_id: current_user.id)
    render_json_message(201, message: "Message created!", resource: {approved_messages: approved_messages.map(&:user_message_serialize), unapproved_messages: unapproved_messages.map(&:user_message_serialize)})
    rescue
      render_json_message(403, errors: ["Cannot create a message for an archived event."])
  end

  def destroy
    message = Message.find(params[:id])
    authorize! :destroy, message
    message.destroy!
    approved_messages = Report.find(message.report_id).approved_messages.where(user_id: current_user.id)
    unapproved_messages = Report.find(message.report_id).unapproved_messages.where(user_id: current_user.id)
    render_json_message(200, message: "Message deleted.", resource: {approved_messages: approved_messages.map(&:user_message_serialize), unapproved_messages: unapproved_messages.map(&:user_message_serialize)})
    rescue
      render_json_message(403, errors: ["Not authorized to delete this message."])
  end

  private

  def update_params
    params.require(:message).permit(:content, :id)
  end

  def create_params
    params.require(:message).permit(:content, :report_id).merge(user_id: current_user.id)
  end
end
