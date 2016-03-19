class CreateReportVolunteerLogs < ActiveRecord::Migration
  def change
    create_table :report_volunteer_logs do |t|
      t.integer :report_id, null: false
      t.intger :volunteer_id, null: false

      t.timestamps null: false
    end
  end
end
