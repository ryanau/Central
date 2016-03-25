class TaskSerializer < ActiveModel::Serializer
  attributes :id, :title, :number_of_volunteers, :created_at, :updated_at

  belongs_to :user
end
