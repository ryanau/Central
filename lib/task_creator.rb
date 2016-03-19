class MessageCreator
  def initialize(task_id)
    @task = Task.find(task_id)
    @user = @task.user
    @event = @task.event
    @undispatched_report = @event.undispatched_reports.first
  end

  def self.build_message
    replycode = create_replycode
    message_content = "#{@task.title} by #{@user.uid} [#{replycode.code}]"
    message = Message.create(report_id: @undispatched_report.id, user_id: @user.id, content: message_content)
    replycode.update(message_id: message.id)
  end

  private

  def self.create_replycode
    random_num = FFaker::Number.number(4)
    replycode = Replycode.new(code: random_num)
    if replycode.save
      replycode
    else
      create_replycode
    end
  end
end