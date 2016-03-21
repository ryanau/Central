class TaskType < ActiveRecord::Base
  has_one :task
  
  def serialize
    ActiveModel::SerializableResource.new(self)
  end
end
