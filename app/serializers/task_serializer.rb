class TaskSerializer < ActiveModel::Serializer
  attributes :id, :title, :number_of_volunteers, :location, :description, :start, :end, :zipcode, :created_at, :updated_at, :approved, :dispatched, :volunteer_responded

  belongs_to :user

  def volunteer_responded
    object.active_conversations.count
  end
end
