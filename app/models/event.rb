class Event < ActiveRecord::Base
  belongs_to :admin
  
  has_many :reports

  has_many :userevents
  has_many :users, through: :userevents

  has_many :approved_messages, through: :reports
  has_many :unapproved_messages, through: :reports

  has_many :tasks, through: :users

  validates :name, presence: true
  validates :name, uniqueness: { scope: :city }

  scope :archived, -> { where(archived: true) }
  scope :unarchived, -> { where(archived: false) }

  def serialize
    ActiveModel::SerializableResource.new(self)
  end

  def user_event_serialize
    ActiveModel::SerializableResource.new(self, serializer: UserEventSerializer)
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


