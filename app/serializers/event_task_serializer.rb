class EventTaskSerializer < ActiveModel::Serializer
  attributes :id, :name, :city, :archived, :audience, :approved_tasks, :unapproved_tasks, :dispatched_tasks
  
  def audience
    Volunteer.count
  end

  def approved_tasks
    object.approved_tasks.map(&:serialize)
  end

  def unapproved_tasks
    object.unapproved_tasks.map(&:serialize)
  end

  def dispatched_tasks
    object.dispatched_tasks.map(&:serialize)
  end
end
