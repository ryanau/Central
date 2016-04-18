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
    if @question_remaining && unanswered_question_ids.length > 1
      unanswered_question_ids.shift
      @next_question = Question.find(unanswered_question_ids.first)
    end
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
    end
  end

  def dispatch_next_question(next_question_content)
    # content = @next_question.content
    SmsOutbound.send_from_system_phone(@system_phone.number, @volunteer.phone_number, next_question_content)
  end

  def incorrect_response_handler
    # for now there are 4 types of responses
    if @question.response_type == 1
      filler = "'YES' or 'NO'"
    elsif @question.response_type == 2
      filler = "a number"
    elsif @question.response_type == 3
      filler = "a word"
    elsif @question.response_type == 4
      filler = "'REMOVE' if you no longer want to volunteer for this event"
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
        question_formatter = QuestionFormatter.new(@task, @question, @volunteer)
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
      question_formatter = QuestionFormatter.new(@task, @question, @volunteer)
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

  def is_number?(string)
    true if Float(string) rescue false
  end
end



