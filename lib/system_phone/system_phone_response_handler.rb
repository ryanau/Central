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
    identify_questions(responded_question_ids, unanswered_question_ids.sort!)
  end

  def identify_questions(responded_question_ids, unanswered_question_ids)
    if responded_question_ids.length > 0
      @question = Question.find(unanswered_question_ids.first)
    else
      @question = @task.questions.order(:question_order).first
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
    SmsOutbound.send_from_system_phone(@system_phone.number, @volunteer.phone_number, next_question_content)
  end

  def incorrect_response_handler
    handler = SystemPhoneResponseErrorHandler.new(@question, @system_phone, @volunteer, @object_tags, @verb_tags)
    handler.proceed
  end

  # different respones handler
  def boolean_yes_no_handler
    if agree_checker || @body == 'no'
      log_response
      if agree_checker && @question_remaining
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
      if @body.to_i <= @task.number_of_volunteers
        log_response
        # ********** question formatter **********
        question_formatter = QuestionFormatter.new(@task, @question, @volunteer, @body)
        next_question_content = question_formatter.proceed
        dispatch_next_question(next_question_content)
      else
        exceed_number_handler(@task.number_of_volunteers)
      end
    else
      incorrect_response_handler
    end
  end

  def remove_handler
    if @body == @task.check_in_code
      log_response
      after_volunteer_checks_in
    elsif @body == 'remove'
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
      # *** But don't log invalid responses
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
      # *** But don't log invalid responses
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

  def exceed_number_handler(max)
    content = "Unfortunately, we only need #{max} volunteers. Please reply with a number no larger than #{max}."
    SmsOutbound.send_from_system_phone(@system_phone.number, @volunteer.phone_number, content)
  end

  def agree_checker
    if @body == 'yes' || @body == 'yeah' || @body == 'yea'
      true
    else
      false
    end
  end

  def after_volunteer_removes
    content = "You have removed yourself from the volunteering appointment: #{@task.title} by #{@task.user.organization_name}."
    SmsOutbound.send_from_system_phone(@system_phone.number, @volunteer.phone_number, content)
    # close conversation
    terminate_conversation
  end

  def after_volunteer_checks_in
    content = "You've just successfully checked in for: #{@task.title}! Please follow the instructions given by the onsite coordinator.\n\nWe sincerely thank you for using Central - the volunteer matching platform for local disasters."
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



