# create_table "admins", force: :cascade do |t|
#   t.string   "provider",               default: "email", null: false
#   t.string   "uid",                    default: "",      null: false
#   t.string   "encrypted_password",     default: "",      null: false
#   t.string   "reset_password_token"
#   t.datetime "reset_password_sent_at"
#   t.datetime "remember_created_at"
#   t.integer  "sign_in_count",          default: 0,       null: false
#   t.datetime "current_sign_in_at"
#   t.datetime "last_sign_in_at"
#   t.string   "current_sign_in_ip"
#   t.string   "last_sign_in_ip"
#   t.string   "confirmation_token"
#   t.datetime "confirmed_at"
#   t.datetime "confirmation_sent_at"
#   t.string   "unconfirmed_email"
#   t.string   "name"
#   t.string   "nickname"
#   t.string   "image"
#   t.string   "email"
#   t.json     "tokens"
#   t.datetime "created_at"
#   t.datetime "updated_at"
# end

# add_index "admins", ["email"], name: "index_admins_on_email", using: :btree
# add_index "admins", ["reset_password_token"], name: "index_admins_on_reset_password_token", unique: true, using: :btree
# add_index "admins", ["uid", "provider"], name: "index_admins_on_uid_and_provider", unique: true, using: :btree

class Admin < ActiveRecord::Base
  # Include default devise modules.
  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :trackable, :validatable,
          :confirmable, :omniauthable
  include DeviseTokenAuth::Concerns::User

  has_many :events
  has_many :archived_events, -> { where(events: {archived: true}) }, :class_name => "Event", :foreign_key => :admin_id


  def serialize
    ActiveModel::SerializableResource.new(self)
  end

  def identity_serialize
    ActiveModel::SerializableResource.new(self, serializer: UserIdentitySerializer)
  end
end
