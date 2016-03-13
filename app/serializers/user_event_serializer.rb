class UserEventSerializer < ActiveModel::Serializer
  attributes :name, :city, :activated, :id, :archived

  def activated
    return true
  end
end
