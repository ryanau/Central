class MainPhoneChecker
  def initialize(caller, text_body, volunteer)
    @caller = caller
    @body = text_body
    @replycode = {}
    @message = {}
    @report = {}
    @volunteer = volunteer
  end

  def proceed
    # locate message and check if volunteer has indeed received digest
    if check_replycode_for_message && did_volunteer_receive_report?
      # initiate task message
      available_phone = conversation_check_release_number
      recruit_volunteer_task = RecruitVolunteerTask.new(@volunteer, @message, @report, available_phone)
      recruit_volunteer_task.dispatch_initial_question
    end
  end

  private

  def check_replycode_for_message
    @replycode = Replycode.find_by(code: @body)
    @message = @replycode.message
    @report = @message.report
  end

  def did_volunteer_receive_report?
    ReportVolunteerLog.find_by(report_id: @report.id, volunteer_id: @volunteer.id)
  end

  def conversation_check_release_number
    phone_in_use = @volunteer.conversations.pluck(:phone_id)
    phone_availabe = Phone.all.pluck(:id) - phone_in_use
    Phone.find(phone_availabe.first)
  end
end