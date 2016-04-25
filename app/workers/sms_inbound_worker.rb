class SmsInboundWorker
  include Sidekiq::Worker
  sidekiq_options :retry => 3
  def perform(target_phone, caller_phone, body)
    SmsInboundWorkerInitiator.initiate(target_phone, caller_phone, body)
  end
end