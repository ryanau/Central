class Response < ActiveRecord::Base
  belongs_to :question
  belongs_to :task
  belons_to :volunteer
end
