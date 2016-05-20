class Demo
  def initialize(caller_phone, text_body)
    @caller_phone = caller_phone
    @body = text_body
    @volunteer = DemoVolunteer.find_by(phone_number: caller_phone)
    if !@volunteer
      @volunteer = DemoVolunteer.create!(phone_number: caller_phone, last_intake_question_id: 0)
    end
  end

  def proceed
    process_response
    dispatch_question
  end

  def process_response #sanitize input
    case @volunteer.last_intake_question_id
    when 1
      @volunteer.update!(first_name: @body.capitalize)
    when 2
      @volunteer.update!(last_name: @body.capitalize)
    when 3
      @volunteer.update!(non_profit: @body.capitalize)
    end
  end

  def dispatch_question
    case @volunteer.last_intake_question_id
    when 0
      message = "Thank you for your interest in coding a better world with Twilio.org! Sometimes nonprofits seek out developers on a project-by-project basis to build Twilio apps.\n\nIf you're interested in learning more, please text us your first name."
    when 1
      message = "Got it, #{@volunteer.first_name}. How about your last name?"
    when 2
      message = "Do you have a cause or a nonprofit that you care about? If so, tell us. Otherwise, please reply with 'NO'."
    when 3
      message = "In the next 10 days, we'll reach out with additional information about matching you with the right project and cause. Thank you #{@volunteer.first_name}! We're excited to see what you build!\n\nThis survey is powered by Central - the volunteer matching platform for local disasters: http://bit.ly/255WCUS"
    else
      return
    end
    SmsOutbound.send_from_demo_phone(@volunteer.phone_number, message)
    @volunteer.update!(last_intake_question_id: @volunteer.last_intake_question_id + 1)
  end

  def agree_checker
    if @body == 'yes' || @body == 'yeah' || @body == 'yea'
      true
    else
      false
    end
  end
end