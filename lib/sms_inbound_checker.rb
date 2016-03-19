class SmsInboundChecker
  def initialize(params)
    @target_phone = params[:To][2, params[:To].length]
    @caller = params[:From][2, params[:From].length]
    @body = params[:Body]
  end

  def check_target_phone
    if check_main_phone?
      # responding to digest phone
      main_phone_checker = MainPhoneChecker.new(@caller, @body)
      main_phone_checker.proceed
    else
      # responding to task phone
    end
  end

  private

  def check_main_phone?
    '+1' + @target_phone == ENV['TWILIO_PHONE']
  end
end