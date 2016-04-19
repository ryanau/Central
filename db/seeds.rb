def make_events
  disasters = ["Meatball Storm", "Candy Rain", "Champagne Volcano", "Cotton Candy Typhoon", "Chocolate Hurricane"]
  city_arr = ["SF", "LA", "SD", "NYC", "DC"]
  1.upto(5) do |n|
    city = city_arr[n-1]
    name = "#{city} #{disasters[n-1]}"
    event = Event.create(
      name: name,
      city: city,
      admin_id: 1
    )
    event.generate_first_report
  end
end

def make_reports
  1.upto(5) do |n|
    Report.create(
      title: FFaker::Lorem.phrase,
      event_id: n
    )
  end
end

def make_messages
  1.upto(1) do |n|
    Message.create(
      content: FFaker::Lorem.phrase,
      user_id: 1,
      report_id: n,
    )
  end
end

def make_tasks
  1.upto(4) do |n|
    Task.create(
      title: FFaker::Lorem.phrase,
      zipcode: "94704",
      number_of_volunteers: n,
      user_id: 1,
      event_id: 1,
      task_type_id: 1,
    )
  end
end

def make_questions
  Question.create(content: "Hi %{volunteer_first_name}! Hope you are safe and sound. This is %{organization_name} contacting you through Central. Are you interested in volunteering for our upcoming event: %{task_title}?\n\nIf you are, please reply 'YES'. If not, please reply 'NO'. Thank you!", response_type: 1, question_order: 1, task_id: 1)
  Question.create(content: "Glad to hear that %{volunteer_first_name}! How many people (including yourself) are coming to this event?\n\nPlease reply with a number.", response_type: 2, question_order: 2, task_id: 1)
  Question.create(content: "We have confirmed you have %{number_of_participants} people coming!\n\nPlease reply 'REMOVE' if you are no longer interested in coming anymore.", response_type: 4, question_order: 3, task_id: 1)
end

def seed_number
  Phone.create(number: "9734409239")
end

def seed_ryan_number
  Phone.create(number: "5102302759")
  Phone.create(number: "6692310845")
end

def seed_ryan_volunteer
  Volunteer.create(phone_number: "6265005826", first_name: "Ryan", last_name: "Au", zipcode: "94704", age: 21, driver: true, heavy_lifting: false, profile_completed: true)
end

def make_task_type
  TaskType.create(name: "Recruit Volunteers")
end

def seed_responses_conversation
  Volunteer.all.each do |volunteer|
    Conversation.create(phone_id: 1, volunteer_id: volunteer.id, task_id: 1, active: true)
    Response.create(content: "yes", question_id: 1, volunteer_id: volunteer.id)
    Response.create(content: volunteer.id, question_id: 2, volunteer_id: volunteer.id)
    Response.create(content: "remove", question_id: 3, volunteer_id: volunteer.id)
  end
end

def make_access_code
  AccessCode.create(code: "test")
end

def seed_production
  make_task_type
  make_access_code
  make_events
  Phone.create(number: "4847274200")
end

case Rails.env
when "development"
  make_events
  # make_tasks
  # seed_number
  seed_ryan_volunteer
  make_task_type
  # make_reports
  # make_messages
  make_access_code
  seed_ryan_number
  # seed_responses_conversation
  # make_questions
when "production"
  seed_production
end
