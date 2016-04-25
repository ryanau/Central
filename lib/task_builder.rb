module TaskBuilder
  def self.build_task(task_id)
    task = Task.find(task_id)
    task.update(check_in_code: (1000 + Random.rand(10000 - 1000)).to_s)
    message_creator = MessageCreator.new(task)
    message_creator.build_message
    if task.task_type_id == 1
      recruit_volunteer_task = RecruitVolunteerTask.new(task)
      recruit_volunteer_task.proceed
    end
  end
end