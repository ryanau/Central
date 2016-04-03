class UserTaskSerializer < ActiveModel::Serializer
  attributes :id, :title, :number_of_volunteers, :number_of_attendees_responses

  # has_many :responses

  def number_of_attendees_responses
    still_in_volunteer_ids = object.active_conversations.pluck(:volunteer_id)
    object.questions.find_by(question_order: 2).responses.where(volunteer_id: still_in_volunteer_ids).map(&:user_response_serialize)
  end
end
