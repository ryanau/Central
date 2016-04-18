class RecruitVolunteerTaskResponse
  attr_reader :initial_question_content, :next_question_content
  def initialize(volunteer, task, question)
    @volunteer = volunteer
    @task = task
    @user = @task.user
    @question = question
    @next_question = {}
    @initial_question_content = {}
    @next_question_content = {}
    # @system_phone = available_phone
  end

  def format_initial_question
    content = @task.questions.first.content
    @initial_question_content = content % {volunteer_first_name: @volunteer.first_name, organization_name: @task.user.organization_name, task_title: @task.title}
    # move to main_phone_checker
    # dispatch_question(content)
  end

  def format_question
    identify_questions
  end

  private

  def identify_questions
    if @question.question_order == 1
      @next_question = @task.questions.find_by(question_order: 2)
      content = @next_question.content
      @next_question_content = content % {volunteer_first_name: @volunteer.first_name}
    elsif @question.question_order == 2
      @next_question = @task.questions.find_by(question_order: 3)
      content = @next_question.content
      @next_question_content = content % {number_of_participants: @volunteer.responses.find_by(question_id: @question.id).content.to_i - 1}
    end

  end


  # private

  # def dispatch_question(content)
  #   SmsOutbound.send_from_system_phone(@system_phone.number, @volunteer.phone_number, content)
  # end
end






