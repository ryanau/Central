class CreateResponses < ActiveRecord::Migration
  def change
    create_table :responses do |t|
      t.string :content, null: false

      t.integer :question_id, null: false
      t.integer :volunteer_id, null: false

      t.timestamps null: false
    end
  end
end
