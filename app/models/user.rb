class User < ActiveRecord::Base
  # Include default devise modules.
  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :trackable, :validatable,
          :confirmable, :omniauthable
  include DeviseTokenAuth::Concerns::User

  has_many :userevents
  has_many :events, through: :userevents
  
  has_many :reports, through: :events

  has_many :approved_messages, through: :reports
  has_many :unapproved_messages, through: :reports

  def serialize
    ActiveModel::SerializableResource.new(self)
  end

  def identity_serialize
    ActiveModel::SerializableResource.new(self, serializer: UserIdentitySerializer)
  end

  def activate_event(event_id)
    self.userevents.new(event_id: event_id)
  end
end
