class UserTaskSerializer < ActiveModel::Serializer
  attributes :id, :title, :number_of_volunteers, :number_of_attendees_responses

  # has_many :responses

  def number_of_attendees_responses
    object.questions.find_by(question_order: 2).responses.map(&:user_response_serialize)
  end



end
