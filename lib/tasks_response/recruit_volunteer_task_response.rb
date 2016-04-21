class RecruitVolunteerTaskResponse
  attr_reader :initial_question_content, :next_question_content
  def initialize(volunteer, task, question, text_body)
    @volunteer = volunteer
    @task = task
    @user = @task.user
    @question = question
    @body = text_body
    @next_question = {}
    @initial_question_content = {}
    @next_question_content = {}
  end

  def format_initial_question
    content = @task.questions.first.content
    @initial_question_content = content % {volunteer_first_name: @volunteer.first_name, organization_name: @task.user.organization_name, task_title: @task.title}
  end

  def format_question
    identify_questions
  end

  private

  def object_tags?
    !@task.object_tags.empty?
  end

  def verb_tags?
    !@task.verb_tags.empty?
  end

  def identify_questions
    if @question.question_order == 1
      if object_tags?
        @next_question = @task.questions.find_by(question_order: 1.1)
        fill_in_expression
      elsif verb_tags?
        @next_question = @task.questions.find_by(question_order: 1.2)
        fill_in_expression
      else
        @next_question = @task.questions.find_by(question_order: 2)
        fill_in_first_name
      end
    elsif @question.question_order == 1.1
      if verb_tags?
        @next_question = @task.questions.find_by(question_order: 1.2)
        fill_in_expression
      else
        @next_question = @task.questions.find_by(question_order: 2)
        fill_in_first_name_and_expression
      end
    elsif @question.question_order == 1.2
      @next_question = @task.questions.find_by(question_order: 2)
      fill_in_first_name_and_expression
    elsif @question.question_order == 2
      @next_question = @task.questions.find_by(question_order: 3)
      content = @next_question.content
      @next_question_content = content % {number_of_participants: @volunteer.responses.find_by(question_id: @question.id).content.to_i - 1}
    end
  end

  def fill_in_expression
    content = @next_question.content
    @next_question_content = content % {expression: generate_expression}
  end

  def fill_in_first_name
    content = @next_question.content
    @next_question_content = content % {volunteer_first_name: @volunteer.first_name}
  end

  def fill_in_first_name_and_expression
    content = @next_question.content
    @next_question_content = content % {volunteer_first_name: @volunteer.first_name, expression: generate_expression}
  end

  def generate_expression
    compliment_words = ['Great', 'Awesome', 'Perfect', 'Superb', 'Sounds good']
    bad_words = ["That's okay", "It's alright", "Not a problem", "Don't worry", "No worries", "No problem"]
    if @body == 'no'
      bad_words.sample
    else
      compliment_words.sample
    end
  end
end






