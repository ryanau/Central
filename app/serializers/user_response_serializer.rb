class UserResponseSerializer < ActiveModel::Serializer
	attributes :id, :content, :created_at, :object_tags, :verb_tags

	belongs_to :volunteer, serializer: VolunteerSerializer

  def objects
    if !object.question.task.object_tags.empty?
      task = object.question.task
      object_tags = task.object_tags
      object_tags_key = object_tags.pluck(:object)
    end
  end

  def verbs
    if !object.question.task.verb_tags.empty?
      task = object.question.task
      verb_tags = task.verb_tags
      verb_tags_key = verb_tags.pluck(:object)
    end
  end

  def object_tags
    if !object.question.task.object_tags.empty?
      object_tags_answers = {}
      volunteer = object.volunteer
      task = object.question.task
      object_tags = task.object_tags
      object_tags_key = object_tags.pluck(:object)
      object_tag_questions_ids = Question.where(task_id: task.id, object_tag: true).pluck(:id)
      object_tag_responses = volunteer.responses.where(question_id: object_tag_questions_ids)
      if object_tag_responses.first.content == 'no'
        object_tags_key.each do |key|
          object_tags_answers[key] = "No"
        end
      else
        object_tags_key.each do |key|
          if object_tag_responses.find_by(content: key)
            object_tags_answers[key] = "Yes"
          else
            object_tags_answers[key] = "No"
            end
        end
      end
      p object_tags_answers
    end
  end

  def verb_tags
    if !object.question.task.verb_tags.empty?
      verb_tags_answers = {}
      volunteer = object.volunteer
      task = object.question.task
      verb_tags = task.verb_tags
      verb_tags_key = verb_tags.pluck(:verb)
      verb_tag_questions_ids = Question.where(task_id: task.id, verb_tag: true).pluck(:id)
      verb_tag_responses = volunteer.responses.where(question_id: verb_tag_questions_ids)
      if verb_tag_responses.first.content == 'no'
        verb_tags_key.each do |key|
          verb_tags_answers[key] = "No"
        end
      else
        verb_tags_key.each do |key|
          if verb_tag_responses.find_by(content: key)
            verb_tags_answers[key] = "Yes"
          else
            verb_tags_answers[key] = "No"
            end
        end
      end
      p verb_tags_answers
    end
  end
end
