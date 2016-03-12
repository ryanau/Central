class Api::User::ReportsController < Api::BaseController
  before_action :authenticate_api_user!

  def index
    reports = Event.find(params[:event_id]).reports.undispatched
    dispatched_reports = Event.find(params[:event_id]).reports.dispatched
    render_json_message(200, resource: {reports: reports.map(&:serialize), dispatched_reports: dispatched_reports.map(&:serialize)})
  end

  def show
    report = Report.find(params[:id])
    render_json_message(200, resource: {report: report.user_report_serialize})
  end

end
