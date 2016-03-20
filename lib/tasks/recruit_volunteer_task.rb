class RecruitVolunteerTask
  def initialize(volunteer, message, report, available_phone)
    @volunteer = volunteer
    @message = message
    @report = report
    @task = @message.task
    @user = @message.user
    @system_phone = available_phone
  end

  def dispatch_initial_question
    content = "Hi #{@volunteer.first_name}! Hope you are safe and sound. This is #{@user.organization_name} contacting you through Central. Are you interested in volunteering for our upcoming event: #{@task.title}?\n\nIf you are, please reply 'YES'. Thank you!"

    SmsOutbound.send_from_system_phone(@system_phone.number, @volunteer.phone_number, content)
    log_conversation
  end

  def log_conversation
    Conversation.create(phone_id: @system_phone.id, volunteer_id: @volunteer.id, task_id: @task.id)
  end
end