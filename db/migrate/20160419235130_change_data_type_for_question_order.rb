class ChangeDataTypeForQuestionOrder < ActiveRecord::Migration
  def change
    change_column :questions, :question_order, :float
  end
end
