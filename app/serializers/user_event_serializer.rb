class UserEventSerializer < ActiveModel::Serializer
  attributes :name, :city, :activated, :id

  def activated
    return true
  end
end
