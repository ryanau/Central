class Api::SmsController < Api::BaseController
  def inbound
    action = SmsInboundChecker.new(params)
    action.proceed
  end
end
