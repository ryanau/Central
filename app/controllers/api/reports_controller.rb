class Api::ReportsController < Api::BaseController
  before_action :authenticate_any!, only: [:index, :show]

  def index
    reports = Event.find(params[:event_id]).reports.unarchived
    archived_reports = Event.find(params[:event_id]).reports.archived
    render_json_message(200, resource: {reports: reports.map(&:serialize), archived_reports: archived_reports.map(&:serialize)})
  end

  def show
    report = Report.find(params[:id])
    render_json_message(200, resource: {report: report.serialize})
  end

end
