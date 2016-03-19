class MainPhoneChecker
  def initialize(caller, text_body)
    @caller = caller
    @body = text_body
    @replycode = {}
  end

  def proceed
    if check_replycode
      
    end
  end

  private

  def check_replycode
    @replycode = Replycode.find_by(code: @body)
  end
end