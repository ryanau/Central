class EventSerializer < ActiveModel::Serializer
  attributes :id, :name, :city, :archived
  
  belongs_to :admin
end