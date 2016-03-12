class UserMessageSerializer < ActiveModel::Serializer
  attributes :id, :content, :approved, :created_at, :updated_at

end
