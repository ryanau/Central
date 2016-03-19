class Api::Admin::EventsController < Api::BaseController
  before_action :authenticate_api_admin!
  
  def index
    # authorize! :read, events, :message => "Not authorized to read this post."
    events = Event.unarchived_events_newest
    archived_events = Event.archived_events_newest
    render_json_message(200, resource: {events: events.map(&:serialize), archived_events: archived_events.map(&:serialize)})
  end

  def create
    event = Event.create!(create_params)
    event.generate_first_report
    events = Event.unarchived_events_newest
    archived_events = Event.archived_events_newest
    render_json_message(201, message: "Event created!", resource: {events: events.map(&:serialize), archived_events: archived_events.map(&:serialize)})
    rescue
      render_json_message(403, errors: event.errors.messages[:name])
  end

  def archive
    event = Event.find(params[:event_id])
    event.update(archived: true)
    render_json_message(200, message: "Event archived.", resource: {event: event.serialize})
    rescue
      render_json_message(404, errors: event.errors.messages[:name])
  end

  def show
    event = Event.find(params[:id])
    render_json_message(200, resource: {event: event.serialize})
    rescue
      render_json_message(404, errors: ["Event not found."])
  end

  private

  def create_params
    params.require(:event).permit(:name, :city).merge(admin_id: current_api_admin.id)
  end
end
