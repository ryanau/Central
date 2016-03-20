class SystemPhoneChecker
  def initialize(caller, text_body, volunteer)
    @caller = caller
    @body = text_body
    @replycode = {}
    @message = {}
    @report = {}
    @volunteer = volunteer
  end
end