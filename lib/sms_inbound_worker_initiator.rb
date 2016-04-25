module SmsInboundWorkerInitiator
  def self.initiate(target_phone, caller_phone, body)
    action = SmsInboundChecker.new(target_phone, caller_phone, body)
    action.proceed
  end
end