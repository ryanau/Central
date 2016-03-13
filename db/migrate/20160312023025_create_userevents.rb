class CreateUserevents < ActiveRecord::Migration
  def change
    create_table :userevents do |t|
      t.integer :user_id, null: false
      t.integer :event_id, null: false
      
      t.timestamps null: false
    end
  end
end
