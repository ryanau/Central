class ReportSerializer < ActiveModel::Serializer
  attributes :id, :title, :dispatched, :dispatching, :approved_messages, :unapproved_messages

  belongs_to :event, serializer: EventArchivedSerializer
  def approved_messages
    object.approved_messages.map(&:serialize)
  end

  def unapproved_messages
    object.unapproved_messages.map(&:serialize)
  end
end
