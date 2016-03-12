class Message < ActiveRecord::Base
  belongs_to :report
  belongs_to :user

  def serialize
    ActiveModel::SerializableResource.new(self)
  end

  def approve
    self.update(approved: true)
  end
end
