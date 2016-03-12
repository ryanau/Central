def make_responses
  1.upto(5) do |n|
    Event.create(
      name: FFaker::Product.product,
      city: FFaker::Address.city,
      admin_id: 1
    )
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

make_responses
make_reports
make_messages