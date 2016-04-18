class Api::AccessCodesController < ApplicationController
  def check
    code = params[:code]
    if AccessCode.find_by(code: code)
      render_json_message(200)
    else
      render_json_message(500, errors: ["Invalid access code."])
    end
  end
end
