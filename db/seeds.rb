def make_responses
  1.upto(5) do |n|
    Event.create(
      name: FFaker::Product.product,
      city: FFaker::Address.city,
      admin_id: 1
    )
  end
end

make_responses