class Volunteer < ActiveRecord::Base
  has_many :responses  
  has_many :task, through: :conversation
  
  validates :phone_number, uniqueness: true
end
