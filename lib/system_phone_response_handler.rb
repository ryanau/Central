class SystemPhoneResponseHandler
  def initialize(text_body, volunteer, task, phone, conversation)
    @body = text_body
    @volunteer = volunteer
    @task = task
    @system_phone = phone
    @conversation = conversation
    @question = {}
    @next_question = {}
    @question_remaining = {}
    @object_tags = {}
  end

  def proceed
    # handle responses from volunteer in a task
    check_volunteer_progress_in_task


    # check response type
    response_type_identifier
  end

  private

  def check_volunteer_progress_in_task
    # check how many questions the volunteer has answered
    question_ids = @task.questions.pluck(:id)
    responded_question_ids = @volunteer.responses.where(question_id: question_ids).pluck(:question_id)
    unanswered_question_ids = question_ids - responded_question_ids
    identify_questions(responded_question_ids, unanswered_question_ids)
  end

  def identify_questions(responded_question_ids, unanswered_question_ids)
    if responded_question_ids.length > 0
      @question = Question.find(unanswered_question_ids.first)
    else
      @question = @task.questions.first
    end
    if unanswered_question_ids.length > 0
      @question_remaining = true
    else
      @question_remaining = false
    end
    # might not need this now, since we're delegating the next question task to individual task response file, i.e. using question formatter
    # if @question_remaining && unanswered_question_ids.length > 1
    #   unanswered_question_ids.shift
    #   @next_question = Question.find(unanswered_question_ids.first)
    # end
  end

  def response_type_identifier
    if @question.response_type == 1
      # expecting boolean yes/no
      boolean_yes_no_handler
    elsif @question.response_type == 2
      # expecting number
      number_handler
    elsif @question.response_type == 3
      # expecting text/string
    elsif @question.response_type == 4
      # expecting word 'remove'
      remove_handler
    elsif @question.response_type == 5
      # expecting object tags
      object_tags_handler
    elsif @question.response_type == 6
      # expecting verb tags
      verb_tags_handler
    end
  end

  def dispatch_next_question(next_question_content)
    # content = @next_question.content
    SmsOutbound.send_from_system_phone(@system_phone.number, @volunteer.phone_number, next_question_content)
  end

  def incorrect_response_handler
    # for now there are 5 types of responses
    if @question.response_type == 1
      filler = "'YES' or 'NO'"
    elsif @question.response_type == 2
      filler = "a number"
    elsif @question.response_type == 3
      filler = "a word"
    elsif @question.response_type == 4
      filler = "'REMOVE' if you no longer want to volunteer for this event"
    elsif @question.response_type == 5
      # object tags
      objects = ""
      @object_tags.each do |tag|
        objects << "#{tag.capitalize}\n"
      end
      filler = "the following items that you can bring *separated by a commma*:\n\n#{objects}\nPlease reply 'NO' if you cannot bring any of the item listed."
    elsif @question.response_type == 6
      verbs = ""
      @verb_tags.each do |tag|
        verbs << "#{tag.capitalize}\n"
      end
      filler = "the following actions that you're confident in performing *separated by a commma*:\n\n#{verbs}\nPlease reply 'NO' if you aren't confident in performing any of the actions listed."
    end
    content = "Sorry your input is invalid. Please reply with #{filler}."
    SmsOutbound.send_from_system_phone(@system_phone.number, @volunteer.phone_number, content)
  end

  # different respones handler
  def boolean_yes_no_handler
    if @body == 'yes' || @body == 'no'
      log_response
      if @body == 'yes' && @question_remaining
        # ********** question formatter **********
        question_formatter = QuestionFormatter.new(@task, @question, @volunteer, @body)
        next_question_content = question_formatter.proceed
        dispatch_next_question(next_question_content)
      else
        after_volunteer_removes
      end
    else
      incorrect_response_handler
    end
  end

  def number_handler
    if is_number?(@body) && @question_remaining
      log_response
      # ********** question formatter **********
      question_formatter = QuestionFormatter.new(@task, @question, @volunteer, @body)
      next_question_content = question_formatter.proceed
      dispatch_next_question(next_question_content)
    else
      incorrect_response_handler
    end
  end

  def remove_handler
    if @body == 'remove'
      log_response
      # don't need to dispatch next question coz this should be the last one, instead send concluding removal SMS
      after_volunteer_removes
    else
      incorrect_response_handler
    end
  end

  def object_tags_handler
    sanitized = @body.split(/[,]/).map! { |tag| tag.strip }
    @object_tags = @task.object_tags.pluck(:object)
    # compare if there's any match
    if !(sanitized & @object_tags).empty? || @body == 'no'
      if !(sanitized & @object_tags).empty?
      # there's a match
      log_sanitized_response(sanitized)
      # ********** question formatter **********
      question_formatter = QuestionFormatter.new(@task, @question, @volunteer, @body)
      next_question_content = question_formatter.proceed
      dispatch_next_question(next_question_content)
      else
      # user has no object match
      log_response
      # ********** question formatter **********
      question_formatter = QuestionFormatter.new(@task, @question, @volunteer, @body)
      next_question_content = question_formatter.proceed
      dispatch_next_question(next_question_content)
      end
    else
      # wrong input
      incorrect_response_handler
    end
  end

  def verb_tags_handler
    sanitized = @body.split(/[,]/).map! { |tag| tag.strip }
    @verb_tags = @task.verb_tags.pluck(:verb)
    # compare if there's any match
    if !(sanitized & @verb_tags).empty? || @body == 'no'
      if !(sanitized & @verb_tags).empty?
      # there's a match
      log_sanitized_response(sanitized)
      # ********** question formatter **********
      question_formatter = QuestionFormatter.new(@task, @question, @volunteer, @body)
      next_question_content = question_formatter.proceed
      dispatch_next_question(next_question_content)
      else
      # user has no verb match
      log_response
      # ********** question formatter **********
      question_formatter = QuestionFormatter.new(@task, @question, @volunteer, @body)
      next_question_content = question_formatter.proceed
      dispatch_next_question(next_question_content)
      end
    else
      # wrong input
      incorrect_response_handler
    end
  end

  def after_volunteer_removes
    content = "You have removed yourself from the volunteering appointment: #{@task.title} by #{@task.user.organization_name}."
    SmsOutbound.send_from_system_phone(@system_phone.number, @volunteer.phone_number, content)
    # close conversation
    terminate_conversation
  end

  def terminate_conversation
    @conversation.update(active: false)
  end

  def log_response
    Response.create(question_id: @question.id, volunteer_id: @volunteer.id, content: @body)
  end

  def log_sanitized_response(response)
    response.each do |tag|
      Response.create(question_id: @question.id, volunteer_id: @volunteer.id, content: tag)
    end
  end

  def is_number?(string)
    true if Float(string) rescue false
  end
end



