class Question < ActiveRecord::Base
  belongs_to :task
  has_many :responses

  # Respone types:
  # [1] boolean yes/no
  # [2] number
  # [3] text/string
  # [4] remove
end
