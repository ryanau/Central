class Api::User::EventsController < Api::BaseController
  before_action :authenticate_api_user!

  def index
    events = Event.unarchived.order(created_at: :DESC) - current_user.events.order(created_at: :DESC)
    activated_events = current_user.events.where(archived: false).order(created_at: :DESC)
    archived_activated_events = current_user.events.where(archived: true).order(created_at: :DESC)
    render_json_message(200, resource: {events: events.map(&:serialize), activated_events: activated_events.map(&:user_event_serialize), archived_activated_events: archived_activated_events.map(&:user_event_serialize)})
  end

  def show
    event = Event.find(params[:id])
    authorize! :read, event
    render_json_message(200, resource: {event: event.user_event_serialize})
    rescue
      render_json_message(404, errors: ["Event not found."])
  end

  def activate
    event_id = params[:event_id]
    event = current_user.activate_event(event_id).save!
    events = Event.unarchived - current_user.events
    activated_events = current_user.events.where(archived: false)
    archived_activated_events = current_user.events.where(archived: true)
    render_json_message(200, message: "Event activated!", resource: {events: events.map(&:serialize), activated_events: activated_events.map(&:user_event_serialize), archived_activated_events: archived_activated_events.map(&:user_event_serialize)})
    rescue
      render_json_message(403, errors: event.errors.messages[:name])
  end

  private

end
