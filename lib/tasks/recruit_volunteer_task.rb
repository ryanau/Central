class RecruitVolunteerTask
  def initialize(task)
    @task = task
  end

  def proceed
    # build questions in a task
    create_initial_question
    # check if there are verb/object tags
    create_tags_questions
    # generic follow up questions
    create_follow_up_questions
  end

  def create_initial_question
    sDT = @task.start.strftime("%a, %m/%d %l:%M %p")
    eDT = @task.end.strftime("%a, %m/%d %l:%M %p")
    content = "Hi %{volunteer_first_name}! Hope you are safe and sound. This is %{organization_name} contacting you through Central. You've signed up for our upcoming volunteering opportunity:\n\n#{@task.title} at #{@task.location}. From #{sDT} to #{eDT}. Details: #{@task.description}.\n\nPlease confirm that you are coming by replying 'YES'. If not, please reply 'NO'. Thank you!"
    Question.create(content: content, response_type: 1, task_id: @task.id, question_order: 1)
  end

  private

  def create_tags_questions
    if object_tags?
      create_object_tags_questions
    end
    if verb_tags?
      create_verb_tags_questions
    end
  end

  def object_tags?
    !@task.object_tags.empty?
  end

  def verb_tags?
    !@task.verb_tags.empty?
  end

  def create_object_tags_questions
    objects = ""
    @task.object_tags.each do |tag|
      objects << "#{tag.object.capitalize}\n"
    end
    content = "%{expression}. To better utilize our resources, we would like to know if you can bring the following items:\n\n#{objects}\nPlease reply with the items that you can bring *separated by a comma*. If not, please reply 'NO'."
    Question.create(content: content, response_type: 5, task_id: @task.id, question_order: 1.1, object_tag: true)
  end

  def create_verb_tags_questions
    verbs = ""
    @task.verb_tags.each do |tag|
      verbs << "#{tag.verb.capitalize}\n"
    end
    content = "%{expression}. Additionally, we would like to check if you can perform the following actions:\n\n#{verbs}\nPlease reply with the actions that you are confident in performing *separated by a comma*. If not, please reply 'NO'."
    Question.create(content: content, response_type: 6, task_id: @task.id, question_order: 1.2, verb_tag: true)
  end

  def create_follow_up_questions
    ask_number_of_participants
    remove_if_volunteer_no_longer_available
  end

  def ask_number_of_participants
    if object_tags? || verb_tags?
      content = "%{expression}. Last question. How many people (including yourself) are coming to this event?\n\nPlease reply with a number."
    else
      content = "Glad to hear that %{volunteer_first_name}! How many people (including yourself) are coming to this event?\n\nPlease reply with a number."
    end
    Question.create(content: content, response_type: 2, task_id: @task.id, question_order: 2)
  end

  def remove_if_volunteer_no_longer_available
    sDT = @task.start.strftime("%a, %m/%d %l:%M %p")
    eDT = @task.end.strftime("%a, %m/%d %l:%M %p")
    content = "Great! We have you confirmed for:\n\n#{@task.title} at #{@task.location} from #{sDT} to #{eDT}, along with %{number_of_participants} others.\n\nWhen you arrive at the site, please ask the coordinator for the check in code and enter it here.\n\nIf you're no longer able to help out, please reply with 'REMOVE' anytime."
    Question.create(content: content, response_type: 4, task_id: @task.id, question_order: 3)
  end
end






