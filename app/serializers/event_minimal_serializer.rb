class EventMinimalSerializer < ActiveModel::Serializer
  attributes :id, :name, :city, :activated, :archived

  def activated
    return true
  end
end
