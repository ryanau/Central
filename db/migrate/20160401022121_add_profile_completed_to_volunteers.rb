class AddProfileCompletedToVolunteers < ActiveRecord::Migration
  def change
    add_column :volunteers, :profile_completed, :boolean
  end
end
