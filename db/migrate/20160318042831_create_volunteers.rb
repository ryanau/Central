class CreateVolunteers < ActiveRecord::Migration
  def change
    create_table :volunteers do |t|
      t.string :phone_number, null: false
      t.string :first_name
      t.string :last_name
      t.string :zipcode

      t.timestamps null: false
    end
  end
end
