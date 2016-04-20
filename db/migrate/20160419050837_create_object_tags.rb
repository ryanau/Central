class CreateObjectTags < ActiveRecord::Migration
  def change
    create_table :object_tags do |t|
      t.string :object, null: false
      t.integer :task_id, null: false

      t.timestamps null: false
    end
  end
end
