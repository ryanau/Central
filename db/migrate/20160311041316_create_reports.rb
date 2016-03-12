class CreateReports < ActiveRecord::Migration
  def change
    create_table :reports do |t|
      t.integer :event_id, null: false
      t.string :title, null: false

      t.boolean :dispatched, default: false

      t.timestamps null: false
    end
  end
end
