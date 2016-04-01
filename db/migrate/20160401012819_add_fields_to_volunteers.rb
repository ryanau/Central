class AddFieldsToVolunteers < ActiveRecord::Migration
  def change
    add_column :volunteers, :age, :integer
    add_column :volunteers, :driver, :boolean
    add_column :volunteers, :heavy_lifting, :boolean
  end
end
