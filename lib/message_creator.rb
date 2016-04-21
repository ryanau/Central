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
    # setting date and time to human readable format
    sDT = @task.start.strftime("%a, %m/%d %l:%M %p")
    eDT = @task.end.strftime("%a, %m/%d %l:%M %p")
    message_content = "#{@user.organization_name}: #{@task.title} at #{@task.location}. From #{sDT} to #{eDT}. [#{replycode.code}]"
    @message = Message.create(report_id: @undispatched_report.id, user_id: @user.id, content: message_content)
    @task.update(message_id: @message.id)
    replycode.update(message_id: @message.id)
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