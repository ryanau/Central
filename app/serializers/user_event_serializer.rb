class UserEventSerializer < ActiveModel::Serializer
  attributes :id, :name, :city, :activated, :archived, :latitude, :longitude

  def activated
    return true
  end
end
