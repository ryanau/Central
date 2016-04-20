class CreateVerbTags < ActiveRecord::Migration
  def change
    create_table :verb_tags do |t|
      t.string :verb, null: false
      t.integer :task_id, null: false
      
      t.timestamps null: false
    end
  end
end
