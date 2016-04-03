class VolunteerSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :zipcode, :phone_number, :age, :driver, :heavy_lifting
end
