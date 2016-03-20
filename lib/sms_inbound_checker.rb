class SmsInboundChecker
  def initialize(params)
    @target_phone = params[:To][2, params[:To].length]
    @caller_phone = params[:From][2, params[:From].length]
    @body = params[:Body]
    @volunteer = {}
  end

  def proceed
    if is_caller_a_volunteer?
      p 'its a volunteer'
      check_target_phone
    else
      p 'its not a volunteer'
    end
  end

  def is_caller_a_volunteer?
    @volunteer = Volunteer.find_by(phone_number: @caller_phone)
  end

  def check_target_phone
    if check_main_phone?
      # responding to digest phone
      p 'checking target phone'
      main_phone_checker = MainPhoneChecker.new(@body, @volunteer)
      main_phone_checker.proceed
    else
      # responding to task phone
      p 'checking system phone'
      system_phone_checker = SystemPhoneChecker.new(@target_phone, @body, @volunteer)
      p 'proceeding system phone'
      system_phone_checker.proceed
    end
  end

  private

  def check_main_phone?
    @target_phone == ENV['TWILIO_PHONE']
  end
end