def make_events
  disasters = ["Meatball Storm", "Candy Rain", "Champagne Volcano", "Cotton Candy Typhoon", "Chocolate Hurricane"]
  1.upto(5) do |n|
    city = FFaker::Address.city
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

def seed_number
  Phone.create(number: "9734409239")
end

def seed_ryan_volunteer
  Volunteer.create(phone_number: "6265005826", first_name: "Ryan", last_name: "Au")
  Volunteer.create(phone_number: "6122269607", first_name: "Alec", last_name: "Spencer")
  Volunteer.create(phone_number: "4155280013", first_name: "Sassy Spandi", last_name: "Singh")
  Volunteer.create(phone_number: "5107100656", first_name: "Youwei", last_name: "Du")
  # Volunteer.create(phone_number: "5103355359", first_name: "Cynthia", last_name: "Huang")
  # Volunteer.create(phone_number: "6263487279", first_name: "Devin", last_name: "Au")
end

def make_task_type
  TaskType.create(name: "Recruit Volunteers")
end

make_events
make_tasks
seed_number
seed_ryan_volunteer
make_task_type
# make_reports
# make_messages