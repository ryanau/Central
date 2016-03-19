class Response < ActiveRecord::Base
  belongs_to :question
  belongs_to :task, through: :question
  belons_to :volunteer
end
