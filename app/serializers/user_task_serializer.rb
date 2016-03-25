class UserTaskSerializer < ActiveModel::Serializer
  attributes :id, :title, :number_of_volunteers

  has_many :responses
end
