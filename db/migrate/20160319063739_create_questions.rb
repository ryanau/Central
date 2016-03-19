class CreateQuestions < ActiveRecord::Migration
  def change
    create_table :questions do |t|
      t.string :content, null: false
      t.integer :response_type, null: false

      t.integer :task_id

      t.timestamps null: false
    end
  end
end
