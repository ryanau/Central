class Message < ActiveRecord::Base
  belongs_to :report
  belongs_to :user

  has_one :replycode
  
  def serialize
    ActiveModel::SerializableResource.new(self)
  end

  def user_message_serialize
    ActiveModel::SerializableResource.new(self, serializer: UserMessageSerializer)
  end

  def approve
    self.update(approved: true)
  end
end
