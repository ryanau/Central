class Admin < ActiveRecord::Base
  # Include default devise modules.
  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :trackable, :validatable,
          :confirmable, :omniauthable
  include DeviseTokenAuth::Concerns::User

  has_many :events
  has_many :archived_events, -> { where(events: {archived: true}) }, :class_name => "Event", :foreign_key => :admin_id


  def serialize
    ActiveModel::SerializableResource.new(self)
  end
end
