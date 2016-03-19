class Api::SmsController < Api::BaseController
  def inbound
    action = SmsInboundChecker.new(params)
    action.check_target_phone
  end
end
