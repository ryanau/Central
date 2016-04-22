def make_events
  disasters = ["Meatball Storm", "Candy Rain", "Champagne Volcano", "Cotton Candy Typhoon", "Chocolate Hurricane"]
  city_arr = ["SF", "LA", "SD", "NYC", "DC"]
  coord = [["37.7749", "-122.4194"], ["34.03", "-118.15"], ["32.7157", "-117.1611"], ["40.7128", "-74.0059"], ["38.9072", "-77.0369"]]
  1.upto(5) do |n|
    city = city_arr[n-1]
    name = "#{city} #{disasters[n-1]}"
    event = Event.create(
      name: name,
      city: city,
      admin_id: 1,
      latitude: coord[n-1][0],
      longitude: coord[n-1][1],
    )
    event.generate_first_report
  end
end

def update_report_to_dispatched
  Report.first.update(dispatched: true, dispatching: false)
  Report.create(event_id: 1, title: "SF Meatball Storm Digest 2")
end

def make_users
  user = User.create(email: "user@user.com", password: "12345678", password_confirmation: "12345678")
  user.update(confirmed_at: DateTime.now, organization_name: "Red Cross")
  user1 = User.create(email: "user1@user.com", password: "12345678", password_confirmation: "12345678")
  user1.update(confirmed_at: DateTime.now, organization_name: "Habitat for Humanity")
  user2 = User.create(email: "user2@user.com", password: "12345678", password_confirmation: "12345678")
  user2.update(confirmed_at: DateTime.now, organization_name: "Cal Build Up")
end

def make_messages
  message_content = "Demo"
  Message.create(report_id: 1, user_id: 1, content: message_content, approved: true)
  Message.create(report_id: 2, user_id: 1, content: message_content, approved: true)
end

def make_tasks
  task = Task.create(
    title: "Clean up debris",
    zipcode: "94704",
    number_of_volunteers: 20,
    user_id: 1,
    event_id: 1,
    task_type_id: 1,
    location: "Berkeley High School",
    description: "Clear fallen trees around the school",
    latitude: "37.8761",
    longitude: "-122.2727",
    start: DateTime.now,
    end: DateTime.now.to_time + 3600,
    approved: true,
    dispatched: true, 
  )
  task.object_tags.create(object: "shovel")
  task.object_tags.create(object: "bucket")
  task.verb_tags.create(verb: "operate truck")

  Task.create(
    title: "Dinner distribution",
    zipcode: "94601",
    number_of_volunteers: 10,
    user_id: 2,
    event_id: 1,
    task_type_id: 1,
    location: "Oakland City Hall",
    description: "Give out dinners to those in need",
    latitude: "37.8044",
    longitude: "-122.2711",
    start: DateTime.now,
    end: DateTime.now.to_time + 3600,
  )
  Task.create(
    title: "Build levee",
    zipcode: "94101",
    number_of_volunteers: 60,
    user_id: 3,
    event_id: 1,
    task_type_id: 1,
    location: "SF Ferry Building at Embarcadero",
    description: "Prevent further flooding into the building",
    latitude: "37.7956",
    longitude: "-122.3933",
    start: DateTime.now,
    end: DateTime.now.to_time + 3600,
  )
  Task.create(
    title: "Set up homeless shelters",
    zipcode: "94101",
    number_of_volunteers: 40,
    user_id: 3,
    event_id: 1,
    task_type_id: 1,
    location: "Golden Gate Park",
    description: "Set up tents for people in need",
    latitude: "37.7694",
    longitude: "-122.4862",
    start: DateTime.now,
    end: DateTime.now.to_time + 3600,
  )
end

def make_questions
  @task = Task.first
  sDT = @task.start.strftime("%a, %m/%d %l:%M %p")
  eDT = @task.end.strftime("%a, %m/%d %l:%M %p")
  content = "Hi %{volunteer_first_name}! Hope you are safe and sound. This is %{organization_name} contacting you through Central. You've signed up for our upcoming volunteering opportunity:\n\n#{@task.title} at #{@task.location}. From #{sDT} to #{eDT}. Details: #{@task.description}.\n\nPlease confirm that you are coming by replying 'YES'. If not, please reply 'NO'. Thank you!"
  Question.create(content: content, response_type: 1, task_id: @task.id, question_order: 1)

  objects = ""
  @task.object_tags.each do |tag|
    objects << "#{tag.object.capitalize}\n"
  end
  content = "%{expression}. To better utilize our resources, we would like to know if you can bring the following items:\n\n#{objects}\nPlease reply with the items that you can bring *separated by a comma*. If not, please reply 'NO'."
  Question.create(content: content, response_type: 5, task_id: @task.id, question_order: 1.1, object_tag: true)

  verbs = ""
  @task.verb_tags.each do |tag|
    verbs << "#{tag.verb.capitalize}\n"
  end
  content = "%{expression}. Additionally, we would like to check if you can perform the following actions:\n\n#{verbs}\nPlease reply with the actions that you are confident in performing *separated by a comma*. If not, please reply 'NO'."
  Question.create(content: content, response_type: 6, task_id: @task.id, question_order: 1.2, verb_tag: true)

  content = "%{expression}. Last question. How many people (including yourself) are coming to this event?\n\nPlease reply with a number."
  Question.create(content: content, response_type: 2, task_id: @task.id, question_order: 2)

  content = "Great! We have you confirmed for:\n\n#{@task.title} at #{@task.location} from #{sDT} to #{eDT}, along with %{number_of_participants} others.\n\nPlease reply with 'REMOVE' anytime if you're no longer able to help out."
  Question.create(content: content, response_type: 4, task_id: @task.id, question_order: 3)
end

def make_responses
  Volunteer.where(id: [1,3,6]).each do |volunteer|
    Response.create(content: "yes", question_id: 1,volunteer_id: volunteer.id)
    Response.create(content: "shovel", question_id: 2,volunteer_id: volunteer.id)
    Response.create(content: "no", question_id: 3,volunteer_id: volunteer.id)
    Response.create(content: "3", question_id: 4,volunteer_id: volunteer.id)
  end
  Volunteer.where(id: [2]).each do |volunteer|
    Response.create(content: "yes", question_id: 1,volunteer_id: volunteer.id)
    Response.create(content: "shovel", question_id: 2,volunteer_id: volunteer.id)
    Response.create(content: "bucket", question_id: 2,volunteer_id: volunteer.id)
    Response.create(content: "operate truck", question_id: 3,volunteer_id: volunteer.id)
    Response.create(content: "4", question_id: 4,volunteer_id: volunteer.id)
  end
  Volunteer.where(id: [4,5]).each do |volunteer|
    Response.create(content: "yes", question_id: 1,volunteer_id: volunteer.id)
    Response.create(content: "no", question_id: 2,volunteer_id: volunteer.id)
    Response.create(content: "operate truck", question_id: 3,volunteer_id: volunteer.id)
    Response.create(content: "1", question_id: 4,volunteer_id: volunteer.id)
  end
end

def seed_number
  Phone.create(number: "9734409239")
end

def seed_ryan_number
  Phone.create(number: "5102302759")
  Phone.create(number: "6692310845")
end

def make_volunteers
  Volunteer.create(phone_number: "6265005826", first_name: "Ryan", last_name: "Au", zipcode: "94704", age: 21, driver: true, heavy_lifting: false, profile_completed: true)
  Volunteer.create(phone_number: "0000000000", first_name: "Nicholas", last_name: "Dirk", zipcode: "94704", age: 55, driver: false, heavy_lifting: false, profile_completed: false)
  Volunteer.create(phone_number: "0000000001", first_name: "Donald", last_name: "Trump", zipcode: "94704", age: 69, driver: true, heavy_lifting: true, profile_completed: false)
  Volunteer.create(phone_number: "0000000002", first_name: "Taylor", last_name: "Swift", zipcode: "94704", age: 22, driver: false, heavy_lifting: false, profile_completed: false)
  Volunteer.create(phone_number: "0000000003", first_name: "Mickey", last_name: "Mouse", zipcode: "94704", age: 5, driver: true, heavy_lifting: false, profile_completed: false)
  Volunteer.create(phone_number: "0000000004", first_name: "Super", last_name: "Man", zipcode: "94704", age: 30, driver: true, heavy_lifting: false, profile_completed: false)
end

def make_report_volunteer_logs
  Volunteer.all.each do |volunteer|
    ReportVolunteerLog.create(volunteer_id: volunteer.id, report_id: 1)
  end
end

def make_conversations
  Volunteer.all.each do |volunteer|
    Conversation.create(
      phone_id: Phone.first.id,
      volunteer_id: volunteer.id,
      task_id: 1,
    )
  end
end

def make_user_event
  Userevent.create(user_id: 1, event_id: 1)
end

def make_task_type
  TaskType.create(name: "Recruit Volunteers")
end

def make_access_code
  AccessCode.create(code: "test")
end

def seed_production
  make_access_code
  make_task_type
  Phone.create(number: "4847274200")
  Phone.create(number: "4849334974")
  
  make_users
  make_events

  make_admin
  
  make_volunteers
  make_tasks
  make_report_volunteer_logs
  make_conversations
  make_questions
  make_responses
  make_user_event
  make_messages
  update_report_to_dispatched
end

def make_admin
  admin = Admin.create(email: "admin@admin.com", password: "12345678", password_confirmation: "12345678")
  admin.update(confirmed_at: DateTime.now)
end

case Rails.env
when "development"
  make_access_code
  make_task_type
  seed_ryan_number
  
  make_users
  make_events

  make_admin
  
  make_volunteers
  make_tasks
  make_report_volunteer_logs
  make_conversations
  make_questions
  make_responses
  make_user_event
  make_messages
  update_report_to_dispatched
when "production"
  seed_production
end
