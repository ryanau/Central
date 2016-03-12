class Api::User::MessagesController < Api::BaseController
  before_action :authenticate_api_user!

  def index
    report_id = params[:report_id]
    approved_messages = Report.find(report_id).approved_messages.where(user_id: current_user.id)
    unapproved_messages = Report.find(report_id).unapproved_messages.where(user_id: current_user.id)
    render_json_message(200, resource: {approved_messages: approved_messages.map(&:user_message_serialize), unapproved_messages: unapproved_messages.map(&:user_message_serialize)})
  end

  def update
    message_id = params[:id]
    message = Message.find(message_id)
    if message.update!(update_params)
      message.update(approved: false)
    end
    approved_messages = Report.find(message.report_id).approved_messages.where(user_id: current_user.id)
    unapproved_messages = Report.find(message.report_id).unapproved_messages.where(user_id: current_user.id)
    render_json_message(200, message: "Message saved!", resource: {approved_messages: approved_messages.map(&:user_message_serialize), unapproved_messages: unapproved_messages.map(&:user_message_serialize)})
    rescue
      render_json_message(:forbidden, errors: message.errors.full_messages)
  end

  def create
    message = Message.new(user_id: current_user.id)
    message.update!(message_params)
    message.save!
    approved_messages = Report.find(message.report_id).approved_messages.where(user_id: current_user.id)
    unapproved_messages = Report.find(message.report_id).unapproved_messages.where(user_id: current_user.id)
    render_json_message(200, message: "Message created!", resource: {approved_messages: approved_messages.map(&:user_message_serialize), unapproved_messages: unapproved_messages.map(&:user_message_serialize)})
    rescue
      render_json_message(:forbidden, errors: message.errors.full_messages)
  end

  private

  def update_params
    params.permit(:content, :id)
  end

  def message_params
    params.permit(:content, :report_id)
  end
end
