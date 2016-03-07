class AdminSerializer < ActiveModel::Serializer
  attributes :uid

  has_many :events
end
