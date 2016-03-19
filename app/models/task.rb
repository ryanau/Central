class Task < ActiveRecord::Base
  belongs_to :user
  belongs_to :event

  has_many :responses, through: :questions
  has_many :questions

  has_many :volunteers, through: :conversations

  def build_task
    task = MessageCreator.new(self.id)
    task.build_message
  end
end
