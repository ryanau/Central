class Event < ActiveRecord::Base
  belongs_to :admin
  validates :name, presence: true
  validates :name, uniqueness: { scope: :city }

  def serialize
    ActiveModel::SerializableResource.new(self)
  end
end
