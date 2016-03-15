module ReportDispatchBuilder
  def self.build_report(report_id)
    report = Report.find(report_id)
    message = ""
    message << report.title + "\n\n"
    report.approved_messages.each do |msg|
      message << msg.content + "\n"
    end
    Victim.all.each do |victim|
      to = victim.phone_number
      SmsOutbound.send_from_main_phone(to, message)
    end
    report.update(dispatched: true)
    report.event.generate_next_report
  end
end