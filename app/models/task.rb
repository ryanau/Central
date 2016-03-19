class Task < ActiveRecord::Base
  belongs_to :user
  belongs_to :event, through: :user

  has_many :responses, through: :questions
  has_many :questions

  has_many :volunteers, through: :conversations
end
