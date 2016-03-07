class EventSerializer < ActiveModel::Serializer
  attributes :name, :city

  belongs_to :admin
end