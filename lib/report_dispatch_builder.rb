module ReportDispatchBuilder
  # def self.build_report(report_id)
  #   report = Report.find(report_id)
  #   message = ""
  #   message << report.title + "\n\n"
  #   report.approved_messages.each do |msg|
  #     message << msg.content + "\n"
  #   end
  #   Volunteer.all.each do |volunteer|
  #     to = volunteer.phone_number
  #     SmsOutbound.send_from_main_phone(to, message)
  #     ReportVolunteerLog.create(volunteer_id: volunteer.id, report_id: report.id)
  #   end
  #   report.update(dispatched: true)
  #   report.event.generate_next_report
  # end

  def self.build_report(report_id)
    report = Report.find(report_id)
    message = ""
    message << report.title + "\n\n"
    report.approved_messages.each do |msg|
      message << msg.content + "\n"
    end
    dispatch_report(report)
  end

  private

  def dispatch_report(report)
    # dispatch report and also log which volunteer should've received it
    Volunteer.all.each do |volunteer|
      to = volunteer.phone_number
      SmsOutbound.send_from_main_phone(to, message)
      ReportVolunteerLog.create(volunteer_id: volunteer.id, report_id: report.id)
    end
    report.update(dispatched: true)
    report.event.generate_next_report
  end
end