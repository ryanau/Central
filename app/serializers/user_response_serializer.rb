class UserResponseSerializer < ActiveModel::Serializer
	attributes :id, :content, :created_at

	belongs_to :volunteer, serializer: VolunteerSerializer
end
