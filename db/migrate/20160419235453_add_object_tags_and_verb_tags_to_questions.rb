class AddObjectTagsAndVerbTagsToQuestions < ActiveRecord::Migration
  def change
    add_column :questions, :object_tag, :boolean, :default => false
    add_column :questions, :verb_tag, :boolean, :default => false
  end
end
