class SystemPhoneChecker
  def initialize(target_phone, text_body, volunteer)
    @target_phone = target_phone
    @body = text_body
    @volunteer = volunteer
    @phone = {}
    @converation = {}
    @task = {}
  end

  def proceed
    if check_system_phone? && check_conversation?
      @task = @conversation.task
      system_phone_response_handler = SystemPhoneResponseHandler.new(@body, @volunteer, @task, @phone, @conversation)
      system_phone_response_handler.proceed
    else
      # error handler: inbound invalid
      # conversation is inactive
      handle_conversation_is_inactive
    end
  end

  private

  def check_conversation?
    @conversation = Conversation.find_by(volunteer_id: @volunteer.id, phone_id: @phone.id, active: true)
  end

  def check_system_phone?
    @phone = Phone.find_by(number: @target_phone)
  end

  def handle_conversation_is_inactive
    content = "Sorry you are no longer eligible for this volunteering opportunity. For more info, please wait for the next digest."
    SmsOutbound.send_from_system_phone(@target_phone, @volunteer.phone_number, content)
  end
end