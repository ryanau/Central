class AddColumnsToTasks < ActiveRecord::Migration
  def change
    add_column :tasks, :location, :string
    add_column :tasks, :start, :datetime
    add_column :tasks, :end, :datetime
    add_column :tasks, :description, :string
  end
end
