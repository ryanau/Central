class Api::EventsController < Api::BaseController
  # before_action :authenticate_api_admin!, only: [:index]
  def index
    events = Event.all

    render json: events, each_serializer: EventSerializer
  end
end
