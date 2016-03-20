class Report < ActiveRecord::Base
  belongs_to :event

  has_many :messages
  has_many :users, through: :messages

  has_many :report_volunteer_logs

  has_many :approved_messages, -> { where(messages: {approved: true})}, :class_name => "Message", :foreign_key => :report_id
  has_many :unapproved_messages, -> { where(messages: {approved: false})}, :class_name => "Message", :foreign_key => :report_id

  scope :dispatched, -> { where(dispatched: true) }
  scope :undispatched, -> { where(dispatched: false) }

  def serialize
    ActiveModel::SerializableResource.new(self)
  end

  def user_report_serialize
    ActiveModel::SerializableResource.new(self, serializer: UserReportSerializer)
  end

  def dispatch_report?
    # check if event is archived
    if !self.event.archived && ReportDispatcher.perform_async(self.id)
      true
    else
      false
    end
  end
end
