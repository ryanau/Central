# class Api::EventsController < Api::BaseController
#   # before_action :authenticate_any!, only: [:index, :show]
#   before_action :authenticate_api_admin!, only: [:create, :archive]

#   def index
#     events = Event.unarchived
#     archived_events = Event.archived
#     # render json: events, each_serializer: EventSerializer
#     render_json_message(200, resource: {events: events.map(&:serialize), archived_events: archived_events.map(&:serialize)})
#   end

#   def create
#     event = current_api_admin.events.new(event_params)
#     event.save!
#     render_json_message(201, message: "Event created!", resource: {events: Event.unarchived.map(&:serialize), archived_events: Event.archived.map(&:serialize)})
#     rescue
#       render_json_message(403, errors: event.errors.messages[:name])
#   end

#   def archive
#     event = Event.find(params[:event_id])
#     event.update(archived: true)
#     render_json_message(200, message: "Event archived.", resource: {event: event.serialize})
#     rescue
#       render_json_message(403, errors: event.errors.messages[:name])
#   end

#   def show
#     event = Event.find(params[:id])
#     render_json_message(200, resource: {event: event.serialize})
#     rescue
#       render_json_message(404, errors: ["Event not found."])
#   end

#   private

#   def event_params
#     params.permit(:name, :city)
#   end
# end
