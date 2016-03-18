class EventSerializer < ActiveModel::Serializer
  attributes :id, :name, :city, :archived, :audience

  belongs_to :admin
  # has_many :reports

  def audience
    Volunteer.count
  end
end