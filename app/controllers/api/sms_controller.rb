class Api::SmsController < Api::BaseController
  def inbound
    target_phone = params[:To][2, params[:To].length]
    caller_phone = params[:From][2, params[:From].length]
    body = params[:Body].strip.downcase
    SmsInboundWorker.perform_async(target_phone, caller_phone, body)
  end
end
