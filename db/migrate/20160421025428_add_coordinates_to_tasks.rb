class AddCoordinatesToTasks < ActiveRecord::Migration
  def change
    add_column :tasks, :latitude, :string
    add_column :tasks, :longitude, :string
  end
end
