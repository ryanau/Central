class User < ActiveRecord::Base
  # Include default devise modules.
  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :trackable, :validatable,
          :confirmable, :omniauthable
  include DeviseTokenAuth::Concerns::User

  def serialize
    ActiveModel::SerializableResource.new(self)
  end

  def identity_serialize
    ActiveModel::SerializableResource.new(self, serializer: UserIdentitySerializer)
  end
end
