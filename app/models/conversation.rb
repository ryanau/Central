# create_table "conversations", force: :cascade do |t|
#   t.integer  "phone_id",                    null: false
#   t.integer  "volunteer_id",                null: false
#   t.integer  "task_id",                     null: false
#   t.boolean  "active",       default: true
#   t.datetime "created_at",                  null: false
#   t.datetime "updated_at",                  null: false
# end

class Conversation < ActiveRecord::Base
  belongs_to :volunteer
  belongs_to :phone
  belongs_to :task

  validates_uniqueness_of :volunteer_id, :scope => :phone_id
end
