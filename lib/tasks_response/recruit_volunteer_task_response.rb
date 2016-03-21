class RecruitVolunteerTaskResponse
  def initialize(volunteer, message, report, available_phone)
    @volunteer = volunteer
    @message = message
    @report = report
    @task = @message.task
    @user = @message.user
    @system_phone = available_phone
  end

  def proceed
    # build questions in a task
    configure_initial_question
  end

  def configure_initial_question
    content = @message.task.questions.first.content
    content = content % {volunteer_first_name: @volunteer.first_name, organization_name: @task.user.organization_name, task_title: @task.title}
    dispatch_question(content)
  end

  private

  def dispatch_question(content)
    SmsOutbound.send_from_system_phone(@system_phone.number, @volunteer.phone_number, content)
  end
end






