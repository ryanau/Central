class RecruitVolunteerTask
  def initialize(task)
    @task = task
  end

  def proceed
    # build questions in a task
    create_initial_question
    create_follow_up_questions
  end

  def create_initial_question
    # content = "Hi %{volunteer_first_name}! Hope you are safe and sound. This is %{organization_name} contacting you through Central. Are you interested in volunteering for our upcoming event: %{task_title}?\n\nIf you are, please reply 'YES'. If not, please reply 'NO'. Thank you!"
    sDT = @task.start.strftime("%a, %m/%d %l:%M %p")
    eDT = @task.end.strftime("%a, %m/%d %l:%M %p")
    content = "Hi %{volunteer_first_name}! Hope you are safe and sound. This is %{organization_name} contacting you through Central. You've signed up for our upcoming volunteering opportunity:\n\n#{@task.title} at #{@task.location}. From #{sDT} to #{eDT}. Details: #{@task.description}.\n\nPlease confirm that you are coming by replying 'YES'. If not, please reply 'NO'. Thank you!"
    Question.create(content: content, response_type: 1, task_id: @task.id, question_order: 1)
  end

  private

  def create_follow_up_questions
    ask_number_of_participants
    remove_if_volunteer_no_longer_available
  end

  def ask_number_of_participants
    content = "Glad to hear that %{volunteer_first_name}! How many people (including yourself) are coming to this event?\n\nPlease reply with a number."
    Question.create(content: content, response_type: 2, task_id: @task.id, question_order: 2)
  end

  def remove_if_volunteer_no_longer_available
    # content = "We have confirmed you have %{number_of_participants} people coming!\n\nPlease reply 'REMOVE' if you are no longer interested in coming anymore."
    sDT = @task.start.strftime("%a, %m/%d %l:%M %p")
    eDT = @task.end.strftime("%a, %m/%d %l:%M %p")
    content = "We have you confirmed for:\n\n#{@task.title} at #{@task.location} from #{sDT} to #{eDT}, along with %{number_of_participants} others.\n\nPlease reply with 'REMOVE' anytime if you're no longer able to help out."
    Question.create(content: content, response_type: 4, task_id: @task.id, question_order: 3)
  end
end






