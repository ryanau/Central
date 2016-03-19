class Conversation < ActiveRecord::Base
  belongs_to :volunteer
  belongs_to :phone
  belongs_to :task

  validates_uniqueness_of :volunteer_id, :scope => :phone_id
end
