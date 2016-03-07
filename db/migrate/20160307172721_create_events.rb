class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.integer :admin_id
      t.string :city
      t.string :name
      
      t.timestamps null: false
    end
  end
end
