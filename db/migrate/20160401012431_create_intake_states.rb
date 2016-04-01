class CreateIntakeStates < ActiveRecord::Migration
  def change
    create_table :intake_states do |t|
    	t.integer :volunteer_id
    	t.integer :last_intake_question_id
      t.timestamps null: false
    end
  end
end
