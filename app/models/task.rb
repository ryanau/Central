class Task < ActiveRecord::Base
  belongs_to :user
  belongs_to :event

  has_many :responses, through: :questions
  has_many :questions

  has_many :conversations
  has_many :volunteers, through: :conversations
  has_many :active_conversations, -> { where(conversations: {active: true})}, :class_name => "Conversation", :foreign_key => :task_id
  has_many :inactive_conversations, -> { where(conversations: {active: false})}, :class_name => "Conversation", :foreign_key => :task_id

  belongs_to :message
  belongs_to :report

  belongs_to :task_type

  has_many :object_tags
  has_many :verb_tags

  def add_object_tags(object_tags)
    object_tags.each do |tag|
      self.object_tags.create(object: tag)
    end
  end

  def add_verb_tags(verb_tags)
    verb_tags.each do |tag|
      self.verb_tags.create(verb: tag)
    end
  end

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
