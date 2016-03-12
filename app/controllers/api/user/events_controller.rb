class Api::User::EventsController < Api::BaseController
  before_action :authenticate_api_user!

  def index
    events = Event.unarchived - current_user.events
    activated_events = current_user.events
    render_json_message(200, resource: {events: events.map(&:serialize), activated_events: activated_events.map(&:user_event_serialize)})
  end

  def show
    event = Event.find(params[:id])
    authorize! :read, event, :message => "Not authorized to retrieve this event."
    render_json_message(200, resource: {event: event.user_event_serialize})
  end

  def activate
    event_id = params[:event_id]
    event = current_user.activate_event(event_id).save!
    events = Event.unarchived - current_user.events
    activated_events = current_user.events
    render_json_message(200, message: "Event activated!", resource: {events: events.map(&:serialize), activated_events: activated_events.map(&:user_event_serialize)})
    rescue
      render_json_message(403, errors: event.errors.messages[:name])
  end

  private

end
