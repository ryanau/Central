class UserEventSerializer < ActiveModel::Serializer
  attributes :name, :city, :activated, :id

  # has_many :reports, serializer: UserReportSerializer

  def activated
    return true
  end
end
