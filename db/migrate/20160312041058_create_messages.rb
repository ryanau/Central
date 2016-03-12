class CreateMessages < ActiveRecord::Migration
  def change
    create_table :messages do |t|
      t.integer :report_id, null: false
      t.integer :user_id, null: false
      t.string :content, null: false

      t.boolean :approved, default: false

      t.timestamps null: false
    end
  end
end
