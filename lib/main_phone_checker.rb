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
    if check_replycode_for_message && did_volunteer_receive_report? && !did_volunteer_activate_replycode_previously?
      # find unused number to use
      conversation_check_release_number
      # if we have more than one type of task
      act_on_task_type
    else
      # handle error when replycode is invalid
      handle_invalid_replycode
    end
  end

  private

  def did_volunteer_activate_replycode_previously?
    if @volunteer.conversations.find_by(task_id: @replycode.message.task.id)
      true
    end
    rescue
      false
  end

  def handle_invalid_replycode
    if did_volunteer_activate_replycode_previously?
      content = "You have already replied with this replycode. A member of the NGO will contact you shortly."
    else
      content = "Sorry your replycode is not valid. Please try again by replying with the code in the [bracket] from the previous digest."
    end
    to = @volunteer.phone_number
    SmsOutbound.send_from_main_phone(to, content)
  end

  def check_replycode_for_message
    if @replycode = Replycode.find_by(code: @body)
      @message = @replycode.message
      @report = @message.report
      @task = @message.task
    end
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
    if @task.task_type_id == 1
      recruit_volunteer_task_response = RecruitVolunteerTaskResponse.new(@volunteer, @task, nil)
      # format question based on the task; have to add in personalized information in text; only for initial question
      recruit_volunteer_task_response.format_initial_question
      # dispatch question
      dispatch_question(recruit_volunteer_task_response.initial_question_content)
    end
    log_conversation
  end

  def dispatch_question(content)
    SmsOutbound.send_from_system_phone(@system_phone.number, @volunteer.phone_number, content)
  end

  def log_conversation
    # log conversation for record, so we know which phone numbers have been used
    Conversation.create(phone_id: @system_phone.id, volunteer_id: @volunteer.id, task_id: @task.id)
  end
end