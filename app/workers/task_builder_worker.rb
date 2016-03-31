class TaskBuilderWorker
  include Sidekiq::Worker
  sidekiq_options :retry => 3
  def perform(task_id)
    TaskBuilder.build_task(task_id)
  end
end