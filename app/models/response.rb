class Response < ActiveRecord::Base
  belongs_to :task, through: :question
end
