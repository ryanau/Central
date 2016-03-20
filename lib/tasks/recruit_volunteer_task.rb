class RecruitVolunteerTask
  def initialize(volunteer, message, report, available_phone)
    @volunteer = volunteer
    @message = message
    @report = report
    @task = @message.task
    @user = @message.user
    @system_phone = available_phone
  end

  def proceed
    create_initial_question
    create_follow_up_questions
  end

  def create_initial_question
    content = "Hi #{@volunteer.first_name}! Hope you are safe and sound. This is #{@user.organization_name} contacting you through Central. Are you interested in volunteering for our upcoming event: #{@task.title}?\n\nIf you are, please reply 'YES'. Thank you!"
    Question.create(content: content, response_type: 1, task_id: @task.id)
    dispatch_question(content)

  end

  private

  def create_follow_up_questions
    ask_number_of_participants
    remove_if_volunteer_no_longer_available
  end

  def dispatch_question(content)
    SmsOutbound.send_from_system_phone(@system_phone.number, @volunteer.phone_number, content)
  end

  def ask_number_of_participants
    content = "Great! How many people (including yourself) are coming to this event?\n\nPlease reply with a number."
    Question.create(content: content, response_type: 2, task_id: @task.id)
  end

  def remove_if_volunteer_no_longer_available
    # look up previous response
    # previous_question = @volunteer.responses.find_by(question_id: @number_of_participants_question.id)
    # number_of_participants = previous_question.content
    # content = "We have confirmed that #{number_of_participants} of people are coming, including yourself.\n\nPlease reply 'CANCEL' if you are no longer interested in coming anymore."
    content = "We have confirmed that you are coming.\n\nPlease reply 'REMOVE' if you are no longer interested in coming anymore."
    Question.create(content: content, response_type: 4, task_id: @task.id)
  end
end






