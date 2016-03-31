class CreateReplycodes < ActiveRecord::Migration
  def change
    create_table :replycodes do |t|
      t.string :code, null: false

      t.integer :message_id
      
      t.timestamps null: false
    end
  end
end
