Rails.application.routes.draw do
  namespace :api do
    mount_devise_token_auth_for "User", at: 'auth'

    # mount_devise_token_auth_for 'Admin', at: 'admin_auth'
    # as :admin do
    #   # Define routes for Admin within this block.
    # end
  end
end
