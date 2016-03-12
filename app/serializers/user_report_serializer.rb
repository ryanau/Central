class UserReportSerializer < ActiveModel::Serializer
  attributes :title, :id

  # def user_approved_messages
  #   object.approved_messages.map(&:serialize)
  # end

  # def user_unapproved_messages
  #   object.unapproved_messages.map(&:serialize)
  # end
end
