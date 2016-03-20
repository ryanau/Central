class Response < ActiveRecord::Base
  belongs_to :question
  belongs_to :task
  belongs_to :volunteer
end
