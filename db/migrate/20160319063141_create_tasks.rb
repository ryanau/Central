class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.string :title, null: false
      t.string :zipcode, null: false
      t.integer :number_of_volunteers, null: false
      t.datetime :date_time

      t.integer :task_type

      t.integer :message_id
      t.integer :user_id
      t.integer :event_id
      
      t.timestamps null: false
    end
  end
end
