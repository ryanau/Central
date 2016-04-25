class Api::Admin::ReportsController < Api::BaseController
  before_action :authenticate_api_admin!

  def index
    reports = Event.find(params[:event_id]).reports.undispatched
    dispatched_reports = Event.find(params[:event_id]).reports.dispatched
    render_json_message(200, resource: {reports: reports.map(&:event_report_serialize), dispatched_reports: dispatched_reports.map(&:event_report_serialize)})
  end

  def show
    event = Event.find(params[:event_id])
    report = event.reports.find(params[:id])
    render_json_message(200, resource: {report: report.serialize})
    rescue
      render_json_message(404, errors: ["Digest not found."])
  end

  def update
    report = Report.find(params[:id])
    report.update!(title: params[:title])
    render_json_message(200, resource: {report: report.serialize})
    rescue
      render_json_message(400, errors: ["Update unsuccessful."])
  end

  def dispatch_next
    event = Event.find(params[:event_id])
    report = event.undispatched_reports.first
    if report.dispatch_report?
      report.update(dispatching: true)
      render_json_message(200, message: "Digest dispatching...", resource: {event: event.event_task_serialize})
    else
      render_json_message(500, message: "Error when dispatching.")
    end
  end
end
