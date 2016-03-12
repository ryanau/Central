class ReportSerializer < ActiveModel::Serializer
  attributes :title, :id, :approved_messages, :unapproved_messages

  # belongs_to :event
  def approved_messages
    object.approved_messages.map(&:serialize)
  end

  def unapproved_messages
    object.unapproved_messages.map(&:serialize)
  end
end
