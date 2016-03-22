class MessageCreator
  def initialize(task)
    @task = task
    @user = @task.user
    @event = @task.event
    @undispatched_report = @event.undispatched_reports.first
    @message = {}
  end

  def build_message
    # create a message in a report for the task
    replycode = create_replycode
    message_content = "#{@task.title} by #{@user.organization_name} [#{replycode.code}]"
    @message = Message.create(report_id: @undispatched_report.id, user_id: @user.id, content: message_content)
    @task.update(message_id: @message.id)
    replycode.update(message_id: @message.id)
  end

  def approve_message
    # only for now
    @message.update(approved: true)
  end

  def create_replycode
    random_num = rand.to_s[2..5]
    replycode = Replycode.new(code: random_num)
    if replycode.save
      replycode
    else
      create_replycode
    end
  end
end