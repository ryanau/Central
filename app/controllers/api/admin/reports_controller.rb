class Api::Admin::ReportsController < Api::BaseController
  before_action :authenticate_api_admin!

  def index
    reports = Event.find(params[:event_id]).reports.undispatched
    dispatched_reports = Event.find(params[:event_id]).reports.dispatched
    render_json_message(200, resource: {reports: reports.map(&:serialize), dispatched_reports: dispatched_reports.map(&:serialize)})
  end

  def show
    # report = Report.find(params[:id])
    event = Event.find(params[:event_id])
    report = event.reports.find(params[:id])
    render_json_message(200, resource: {report: report.serialize})
    rescue
      render_json_message(404, errors: ["Digest not found."])
  end

end