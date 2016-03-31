class Volunteer < ActiveRecord::Base
  has_many :responses  
  
  has_many :conversations
  has_many :task, through: :conversations
  
  has_many :report_volunteer_logs

  validates :phone_number, uniqueness: true
end
