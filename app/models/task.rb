class Task < ActiveRecord::Base
  belongs_to :user
  belongs_to :event

  has_many :responses, through: :questions
  has_many :questions

  has_many :conversations
  has_many :volunteers, through: :conversations

  belongs_to :message

  def build_task
    message_creator = MessageCreator.new(self.id)
    message_creator.build_message
    # only for now
    message_creator.approve_message
  end
end
