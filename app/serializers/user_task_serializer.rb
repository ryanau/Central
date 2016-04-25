class UserTaskSerializer < ActiveModel::Serializer
  attributes :id, :title, :number_of_volunteers, :location, :zipcode, :description, :start, :end, :created_at, :number_of_attendees_responses, :report_reached, :volunteer_responded, :volunteer_removed, :volunteer_checked_in, :checked_in_volunteers, :total_coming, :objects, :verbs

  belongs_to :event, serializer: EventMinimalSerializer

  def number_of_attendees_responses
    still_in_volunteer_ids = object.active_conversations.pluck(:volunteer_id)
    object.questions.find_by(question_order: 2).responses.where(volunteer_id: still_in_volunteer_ids).map(&:user_response_serialize)
    rescue
      []
  end

  def report_reached
    if arr = object.message.report.report_volunteer_logs
      arr.count
    end
    rescue
    0
  end

  def volunteer_responded
    object.active_conversations.count
  end

  def volunteer_removed
    object.inactive_conversations.count
  end

  def volunteer_checked_in
    object.checked_in_conversations.count
  end

  def checked_in_volunteers
    still_in_volunteer_ids = object.checked_in_conversations.pluck(:volunteer_id)
    Volunteer.where(id: still_in_volunteer_ids).map(&:serialize)
  end

  def total_coming
    still_in_volunteer_ids = object.active_conversations.pluck(:volunteer_id)
    total = 0
    object.questions.find_by(question_order: 2).responses.where(volunteer_id: still_in_volunteer_ids).each do |response|
      total += response.content.to_i
    end
    total
    rescue
      0
  end

  def objects
    if !object.object_tags.empty?
      object_tags = object.object_tags
      object_tags_key = object_tags.pluck(:object)
    end
  end

  def verbs
    if !object.verb_tags.empty?
      verb_tags = object.verb_tags
      verb_tags_key = verb_tags.pluck(:verb)
    end
  end

end
