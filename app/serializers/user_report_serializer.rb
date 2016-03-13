class UserReportSerializer < ActiveModel::Serializer
  attributes :title, :id, :dispatched, :dispatching

  belongs_to :event, serializer: UserEventSerializer
end
