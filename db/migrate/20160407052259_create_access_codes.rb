class CreateAccessCodes < ActiveRecord::Migration
  def change
    create_table :access_codes do |t|
      t.string :code, null: false
      t.string :type
      
      t.timestamps null: false
    end
  end
end
