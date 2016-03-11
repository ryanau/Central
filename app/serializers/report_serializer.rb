class ReportSerializer < ActiveModel::Serializer
  attributes :title, :id

  # belongs_to :event
end
