class Api::VictimsController < Api::BaseController
  def join
    victim = Victim.create!(join_params)
    render_json_message(200, message: "Joined successfully!")
    rescue
      render_json_message(500, errors: ["Error when joining."])
  end

  private

  def join_params
    params.permit(:phone_number)
  end
end
