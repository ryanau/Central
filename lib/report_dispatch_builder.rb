module ReportDispatchBuilder
  def self.build_report(report_id)
    report = Report.find(report_id)
    message = ""
    message << report.title
    message << "\n\n"
    report.approved_messages.each do |msg|
      message << msg.content
      message << "\n"
    end
    Victim.all.each do |victim|
      to = victim.phone_number
      SmsOutbound.send_from_main_phone(to, message)
    end
    report.update(dispatched: true)
  end
end