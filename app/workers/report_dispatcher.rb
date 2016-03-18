class ReportDispatcher
  include Sidekiq::Worker
  sidekiq_options :retry => 3
  def perform(report_id)
    ReportDispatchBuilder.build_report(report_id)
  end
end