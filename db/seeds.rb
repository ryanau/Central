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

make_events
# make_reports
# make_messages