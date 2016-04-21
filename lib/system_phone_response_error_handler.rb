class SystemPhoneResponseErrorHandler
  def initialize(question, system_phone, volunteer, object_tags, verb_tags)
    @question = question
    @system_phone = system_phone
    @volunteer = volunteer
    @object_tags = object_tags
    @verb_tags = verb_tags
  end

  def proceed
    handle_error
  end

  private

  def handle_error
    if @question.response_type == 1
      filler = "'YES' or 'NO'"
    elsif @question.response_type == 2
      filler = "a number"
    elsif @question.response_type == 3
      filler = "a word"
    elsif @question.response_type == 4
      filler = "'REMOVE' if you no longer want to volunteer for this event"
    elsif @question.response_type == 5
      # object tags
      objects = ""
      @object_tags.each do |tag|
        objects << "#{tag.capitalize}\n"
      end
      filler = "the following items that you can bring *separated by a commma*:\n\n#{objects}\nPlease reply 'NO' if you cannot bring any of the item listed."
    elsif @question.response_type == 6
      verbs = ""
      @verb_tags.each do |tag|
        verbs << "#{tag.capitalize}\n"
      end
      filler = "the following actions that you're confident in performing *separated by a commma*:\n\n#{verbs}\nPlease reply 'NO' if you aren't confident in performing any of the actions listed."
    end
    content = "Sorry we did not catch that. Please reply with #{filler}."
    SmsOutbound.send_from_system_phone(@system_phone.number, @volunteer.phone_number, content)
  end
end