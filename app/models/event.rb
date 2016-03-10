class Event < ActiveRecord::Base
  belongs_to :admin
  validates :name, presence: true
  validates :name, uniqueness: { scope: :city }

  scope :archived, -> { where(archived: true) }
  scope :unarchived, -> { where(archived: false) }

  def serialize
    ActiveModel::SerializableResource.new(self)
  end
end
