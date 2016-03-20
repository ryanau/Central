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
      p 'proceeding in system phone'
      @task = @conversation.task
      system_phone_response_handler = SystemPhoneResponseHandler.new(@body, @volunteer, @task, @phone, @conversation)
      system_phone_response_handler.proceed
    else
      # error handler: inbound invalid, prompt to register for central
    end
  end

  private

  def check_conversation?
    p 'checking conversation'
    @conversation = Conversation.find_by(volunteer_id: @volunteer.id, phone_id: @phone.id)
  end

  def check_system_phone?
    p 'checking system phone'
    p @target_phone
    @phone = Phone.find_by(number: @target_phone)
  end
end