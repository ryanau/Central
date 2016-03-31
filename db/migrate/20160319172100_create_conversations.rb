class CreateConversations < ActiveRecord::Migration
  def change
    create_table :conversations do |t|
      t.integer :phone_id, null: false
      t.integer :volunteer_id, null: false
      t.integer :task_id, null: false
      
      t.boolean :active, default: true

      t.timestamps null: false
    end
  end
end
