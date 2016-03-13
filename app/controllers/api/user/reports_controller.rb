class Api::User::ReportsController < Api::BaseController
  before_action :authenticate_api_user!

  def index
    reports = Event.find(params[:event_id]).reports.undispatched
    dispatched_reports = Event.find(params[:event_id]).reports.dispatched
    render_json_message(200, resource: {reports: reports.map(&:serialize), dispatched_reports: dispatched_reports.map(&:serialize)})
  end

  def show
    event = Event.find(params[:event_id])
    report = event.reports.find(params[:id])
    # authorize! :read, report, :message => "Not authorized to retrieve this report."
    render_json_message(200, resource: {report: report.user_report_serialize})
    rescue
      render_json_message(404, errors: ["Digest not found."])
  end

end
