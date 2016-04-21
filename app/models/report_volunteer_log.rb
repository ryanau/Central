class ReportVolunteerLog < ActiveRecord::Base
  belongs_to :volunteer
  belongs_to :report  
end
