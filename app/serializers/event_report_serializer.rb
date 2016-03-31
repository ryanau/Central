# for admin/event container

class EventReportSerializer < ActiveModel::Serializer
  attributes :id, :title, :dispatched, :dispatching
end
