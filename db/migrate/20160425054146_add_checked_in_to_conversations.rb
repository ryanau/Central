class AddCheckedInToConversations < ActiveRecord::Migration
  def change
    add_column :conversations, :checked_in, :boolean, :default => false
  end
end
