module TaskBuilder
  def self.build_task(task_id)
    p '8' * 40
    p 'building task'
    task = Task.find(task_id)
    message_creator = MessageCreator.new(task)
    message_creator.build_message
    if task.task_type_id == 1
      recruit_volunteer_task = RecruitVolunteerTask.new(task)
      recruit_volunteer_task.proceed
    end
  end
end