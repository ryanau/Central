class ReportDispatcher
  include Sidekiq::Worker
  sidekiq_options :retry => false
  def perform(report_id)
    ReportDispatchBuilder.build_report(report_id)
  end
end