class EventSerializer < ActiveModel::Serializer
  attributes :id, :name, :city, :archived, :audience

  belongs_to :admin
  # has_many :reports

  def audience
    Victim.count
  end
end