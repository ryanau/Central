class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.integer :admin_id, null: false
      t.string :city, null: false
      t.string :name, null: false

      t.boolean :archived, default: false
      
      t.timestamps null: false
    end
  end
end
