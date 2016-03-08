class EventSerializer < ActiveModel::Serializer
  attributes :id, :name, :city

  belongs_to :admin
end