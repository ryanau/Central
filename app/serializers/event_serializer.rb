class EventSerializer < ActiveModel::Serializer
  attributes :id, :name, :city, :archived, :latitude, :longitude
  
  belongs_to :admin
end