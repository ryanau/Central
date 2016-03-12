class Report < ActiveRecord::Base
  belongs_to :event
  has_many :approved_messages, -> { where(messages: {approved: true})}, :class_name => "Message", :foreign_key => :report_id
  has_many :unapproved_messages, -> { where(messages: {approved: false})}, :class_name => "Message", :foreign_key => :report_id

  scope :archived, -> { where(archived: true) }
  scope :unarchived, -> { where(archived: false) }

  def serialize
    ActiveModel::SerializableResource.new(self)
  end
end
