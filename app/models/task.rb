class Task < ActiveRecord::Base
  belongs_to :user
  belongs_to :event

  has_many :responses, through: :questions
  has_many :questions

  has_many :conversations
  has_many :volunteers, through: :conversations

  belongs_to :message
  belongs_to :report

  belongs_to :task_type

  def build_task
    # pass in task id
    TaskBuilderWorker.perform_async(self.id)
  end

  def serialize
    ActiveModel::SerializableResource.new(self)
  end

  def user_task_serialize
    ActiveModel::SerializableResource.new(self, serializer: UserTaskSerializer)
  end

  def approve
    self.update(approved: true)
    self.message.update(approved: true)
  end
end
