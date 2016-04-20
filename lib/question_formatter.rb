class QuestionFormatter
  attr_reader :next_question_content
  def initialize(task, question, volunteer, text_body)
    @task = task
    @question = question
    @volunteer = volunteer
    @body = text_body
    @next_question_content = {}
  end

  def proceed
    # return next question
    identity_task_type
  end

  private

  def identity_task_type
    if @task.task_type_id == 1
      task_response = RecruitVolunteerTaskResponse.new(@volunteer, @task, @question, @body)
      task_response.format_question
      @next_question_content = task_response.next_question_content
    end
  end
end