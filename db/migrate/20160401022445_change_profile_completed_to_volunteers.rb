class ChangeProfileCompletedToVolunteers < ActiveRecord::Migration
  def change
  	change_column :volunteers, :profile_completed, :boolean, :default => false
  end
end
