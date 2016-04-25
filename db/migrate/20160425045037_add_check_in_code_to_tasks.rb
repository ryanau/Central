class AddCheckInCodeToTasks < ActiveRecord::Migration
  def change
    add_column :tasks, :check_in_code, :string
  end
end
