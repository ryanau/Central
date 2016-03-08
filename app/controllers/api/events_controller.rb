class Api::EventsController < Api::BaseController
  before_action :authenticate_api_admin!, only: [:index, :create]

  def index
    events = Event.all
    render json: events, each_serializer: EventSerializer
  end

  def create
    event = current_api_admin.events.new(event_params)
    event.save!
    render_json_message(:ok, message: "Event created!", resource: Event.all.map(&:serialize))
    rescue
      render_json_message(:forbidden, errors: event.errors.messages[:name])
  end

  private

  def event_params
    params.permit(:name, :city)
  end
end
