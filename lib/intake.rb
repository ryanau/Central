class Intake
	def initialize(caller_phone, text_body)
		@caller_phone = caller_phone
		@body = text_body
		@volunteer = Volunteer.find_by(phone_number: caller_phone)
		if !@volunteer
			@volunteer = Volunteer.create!(phone_number: caller_phone)
			IntakeState.create!(volunteer_id: @volunteer.id, last_intake_question_id: 0)
		end
		@intake_state = IntakeState.find_by(volunteer_id: @volunteer.id)
	end

	def proceed
		process_response
		dispatch_question
	end

	def process_response #sanitize input
		case @intake_state.last_intake_question_id
		when 1
			@volunteer.update!(first_name: @body.capitalize)
		when 2
			@volunteer.update!(last_name: @body.capitalize)
		when 3
			@volunteer.update!(age: @body.to_i)
		when 4
			agree_checker ? answer = true : answer = false
			@volunteer.update!(heavy_lifting: answer)
		when 5
			agree_checker ? answer = true : answer = false
			@volunteer.update!(driver: answer)
		when 6
			@volunteer.update!(zipcode: @body, profile_completed: true)
		end
	end

	def dispatch_question
		case @intake_state.last_intake_question_id
		when 0
			message = "Thank you for signing up with Central! We're going to begin by asking you a series of questions to help better match you with volunteering opportunities. To begin, what is your first name?"
		when 1
			message = "Got it, #{@volunteer.first_name}. How about the last name?"
		when 2
			message = "Ok, thanks. How old are you?"
		when 3
			message = "Almost done! For some opportunities, you may be moving heavy objects. Are you able to lift a 25lb/11kg box overhead? Reply YES or NO"
		when 4
			message = "Are you a licensed driver with a working car or other vehicle? Reply YES or NO"
		when 5
			message = "All right, last question. What is the postal code of your current location?"
		when 6
			message = "That completes your registration with Central! We are matching you with the right volunteering opportunities. In the mean time, please sit back and relax!.\n\nThis number will no longer respond to messages, you may delete this thread."
		else
			return
		end
		SmsOutbound.send_from_intake_phone(@volunteer.phone_number, message)
		@intake_state.update!(last_intake_question_id: @intake_state.last_intake_question_id + 1)
	end

	def add_first_name_to_database(volunteer, first_name)
		volunteer.update!(first_name: first_name)
	end

	def add_last_name_to_database(volunteer, last_name)
		volunteer.update!(last_name: last_name)
	end

  def agree_checker
    if @body == 'yes' || @body == 'yeah' || @body == 'yea'
      true
    else
      false
    end
  end
end