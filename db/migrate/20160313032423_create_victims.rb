class CreateVictims < ActiveRecord::Migration
  def change
    create_table :victims do |t|
      t.string :phone_number, null: false
      
      t.timestamps null: false
    end
  end
end
