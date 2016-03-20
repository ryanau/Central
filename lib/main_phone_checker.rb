class MainPhoneChecker
  def initialize(text_body, volunteer)
    @body = text_body
    @replycode = {}
    @message = {}
    @report = {}
    @volunteer = volunteer
    @system_phone = {}
  end

  def proceed
    # locate message and check if volunteer has indeed received digest
    if check_replycode_for_message && did_volunteer_receive_report?
      # find unused number to use
      conversation_check_release_number
      # if we have more than one type of task
      act_on_task_type
    else
      # handle error when replycode is invalid
      # or when volounteer didn't actually receive a report
    end
  end

  private

  def check_replycode_for_message
    @replycode = Replycode.find_by(code: @body)
    @message = @replycode.message
    @report = @message.report
    @task = @message.task
  end

  def did_volunteer_receive_report?
    ReportVolunteerLog.find_by(report_id: @report.id, volunteer_id: @volunteer.id)
  end

  def conversation_check_release_number
    # find an unused system phone number
    phone_in_use = @volunteer.conversations.pluck(:phone_id)
    phone_availabe = Phone.all.pluck(:id) - phone_in_use
    @system_phone = Phone.find(phone_availabe.first)
  end

  def act_on_task_type
    # task types: (if we have more than 1 task in the future)
    # 1: recruit volunteer task
    if @message.task.task_type == 1
      recruit_volunteer_task = RecruitVolunteerTask.new(@volunteer, @message, @report, @system_phone)
      recruit_volunteer_task.proceed
    end
    log_conversation
  end

  def log_conversation
    # log conversation for record, so we know which phone numbers have been used
    Conversation.create(phone_id: @system_phone.id, volunteer_id: @volunteer.id, task_id: @task.id)
  end
end