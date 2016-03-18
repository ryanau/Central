class Api::VolunteersController < Api::BaseController
  def join
    volunteer = Volunteer.create!(join_params)
    render_json_message(200, message: "Joined successfully!")
    rescue
      render_json_message(500, errors: ["Error when joining."])
  end

  private

  def join_params
    params.permit(:phone_number)
  end
end
