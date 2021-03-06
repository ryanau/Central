module ReportDispatchBuilder
  def self.build_report(report_id)
    report = Report.find(report_id)
    message = ""
    # message << report.title + "\n\n"
    message << "This is Central - the volunteer matching platform for local disasters you signed up for. We have matched you with a number of volunteering opportunities.\n\n"
    message << "Please respond with the code within the [bracket] to sign up for your desired volunteering opportunity.\n\n"
    report.approved_messages.each do |msg|
      message << msg.content + "\n"
    end
    dispatch_report(report, message)
  end

  private

  def self.dispatch_report(report, message)
    # dispatch report and also log which volunteer should've received it
    Volunteer.where(profile_completed: true).each do |volunteer|
      to = volunteer.phone_number
      SmsOutbound.send_from_main_phone(to, message)
      ReportVolunteerLog.create(volunteer_id: volunteer.id, report_id: report.id)
    end
    report.update(dispatched: true, dispatching: false)
    report.tasks.update_all(dispatched: true)
    report.event.generate_next_report
  end
end