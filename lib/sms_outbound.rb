module SmsOutbound
  # helper function for twilio outbound messages
  def self.send_from_main_phone(to, message)
    from = ENV['TWILIO_PHONE']
    to = '+1' + to.to_s
    twilio_sms(from, to, message)
  end

  def self.send_from_system_phone(from, to, message)
    from = '+1' + from
    to = '+1' + to.to_s
    twilio_sms(from, to, message)
  end

  private
  
  def self.twilio_sms(from, to, body)
    account_sid = ENV['TWILIO_ACCOUNT_SID']
    auth_token = ENV['TWILIO_AUTH_TOKEN']
    @client = Twilio::REST::Client.new account_sid, auth_token
    @client.messages.create(
      from: from,
      to: to,
      body: body,
    )
  end
end