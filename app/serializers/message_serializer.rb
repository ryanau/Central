class MessageSerializer < ActiveModel::Serializer
  attributes :id, :content, :approved, :created_at, :updated_at
  
  belongs_to :user
end
