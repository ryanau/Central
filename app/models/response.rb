class Response < ActiveRecord::Base
  belongs_to :question
  belongs_to :task
  belongs_to :volunteer

  def user_response_serialize
    ActiveModel::SerializableResource.new(self, serializer: UserResponseSerializer)
  end
end
