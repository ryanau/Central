class CreateDemoVolunteers < ActiveRecord::Migration
  def change
    create_table :demo_volunteers do |t|
      t.string :first_name
      t.string :last_name
      t.string :phone_number
      t.string :non_profit
      t.integer :last_intake_question_id
      
      t.timestamps null: false
    end
  end
end
