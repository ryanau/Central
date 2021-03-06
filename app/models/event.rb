# create_table "events", force: :cascade do |t|
#   t.integer  "admin_id",                   null: false
#   t.string   "city",                       null: false
#   t.string   "name",                       null: false
#   t.boolean  "archived",   default: false
#   t.datetime "created_at",                 null: false
#   t.datetime "updated_at",                 null: false
# end

class Event < ActiveRecord::Base
  belongs_to :admin
  
  has_many :reports
  has_many :undispatched_reports, -> { where(reports: {dispatched: false})}, :class_name => "Report", :foreign_key => :event_id
  has_many :dispatched_reports, -> { where(reports: {dispatched: true})}, :class_name => "Report", :foreign_key => :event_id

  has_many :userevents
  has_many :users, through: :userevents

  has_many :approved_messages, through: :reports
  has_many :unapproved_messages, through: :reports

  has_many :approved_tasks, -> { where(tasks: {approved: true, dispatched: false})}, :class_name => "Task", :foreign_key => :event_id
  has_many :unapproved_tasks, -> { where(tasks: {approved: false, dispatched: false})}, :class_name => "Task", :foreign_key => :event_id
  has_many :dispatched_tasks, -> { where(tasks: {approved: true, dispatched: true})}, :class_name => "Task", :foreign_key => :event_id

  validates :name, presence: true
  validates :name, uniqueness: { scope: :city }

  scope :archived, -> { where(archived: true) }
  scope :unarchived, -> { where(archived: false) }

  def serialize
    ActiveModel::SerializableResource.new(self)
  end

  def user_event_serialize(params = {})
    ActiveModel::SerializableResource.new(self, serializer: UserEventSerializer, user_id: params.fetch(:user_id, nil))
  end

  def event_task_serialize
    ActiveModel::SerializableResource.new(self, serializer: EventTaskSerializer)
  end

  def generate_first_report
    self.reports.create(title: "#{self.name} Digest 1")
  end

  def generate_next_report
    next_digest = self.reports.count + 1
    self.reports.create(title: "#{self.name} Digest #{next_digest}")
  end

  def self.unarchived_events_newest
    Event.unarchived.order(created_at: :DESC)
  end

  def self.archived_events_newest
    Event.archived.order(created_at: :DESC)
  end

  # def self in method when using it Event
  # self within the method is individual
end


