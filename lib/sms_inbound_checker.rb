class SmsInboundChecker
  def initialize(params)
    @target_phone = params[:To][2, params[:To].length]
    @caller_phone = params[:From][2, params[:From].length]
    @body = params[:Body].strip.downcase
    @volunteer = {}
  end

  def proceed
    if check_intake_phone?
      intake = Intake.new(@caller_phone, @body)
      intake.proceed
    elsif is_caller_a_registered_volunteer?
      # it's a volunteer
      check_target_phone
    else
      # it's not a volunteer and not texting to register
      handle_caller_not_registered
    end
  end

  def is_caller_a_registered_volunteer?
    @volunteer = Volunteer.find_by(phone_number: @caller_phone, profile_completed: true)
  end

  def check_target_phone
    if check_main_phone?
      # responding to main phone (for a digest or sign up)
      main_phone_checker = MainPhoneChecker.new(@body, @volunteer)
      main_phone_checker.proceed
    else
      # responding to system phone
      system_phone_checker = SystemPhoneChecker.new(@target_phone, @body, @volunteer)
      system_phone_checker.proceed
    end
  end

  private

  def check_intake_phone?
    @target_phone == ENV['TWILIO_INTAKE']
  end

  def check_main_phone?
    @target_phone == ENV['TWILIO_PHONE']
  end

  def handle_caller_not_registered
    if check_main_phone?
      content = "Come on! You are not registered with Central! Please reply with 'JOIN' if you are interested in joining."
      to = @caller_phone
      SmsOutbound.send_from_main_phone(to, content)
    else
      content = "ARE YOU KIDDING!! You are not registered with Central yet! Please text 'JOIN' to 5102963977 to sign up!"
      to = @caller_phone
      SmsOutbound.send_from_system_phone(@target_phone, to, content)
    end
  end
end