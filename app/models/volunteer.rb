class Volunteer < ActiveRecord::Base
  has_many :responses  
  belongs_to :task, through: :conversation
  
  validates :phone_number, uniqueness: true
end
