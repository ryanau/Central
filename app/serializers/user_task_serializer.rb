class UserTaskSerializer < ActiveModel::Serializer
  attributes :id, :title, :number_of_volunteers, :number_of_attendees_responses, :report_reached, :volunteer_responded, :volunteer_removed, :total_coming

  def number_of_attendees_responses
    still_in_volunteer_ids = object.active_conversations.pluck(:volunteer_id)
    object.questions.find_by(question_order: 2).responses.where(volunteer_id: still_in_volunteer_ids).map(&:user_response_serialize)
  end

  def report_reached
    ReportVolunteerLog.count
  end

  def volunteer_responded
    object.active_conversations.count
  end

  def volunteer_removed
    object.inactive_conversations.count
  end

  def total_coming
    still_in_volunteer_ids = object.active_conversations.pluck(:volunteer_id)
    total = 0
    object.questions.find_by(question_order: 2).responses.where(volunteer_id: still_in_volunteer_ids).each do |response|
      total += response.content.to_i
    end
    total
  end
end
