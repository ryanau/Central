Rails.application.routes.draw do
  namespace :api do
    mount_devise_token_auth_for "User", at: 'auth'

    mount_devise_token_auth_for 'Admin', at: 'admin_auth'
    as :admin do
      # Define routes for Admin within this block.
    end

    get 'session/identity', to: 'session#identity'

    namespace :admin do
      resources :events, only: [:index, :create, :show] do
        get 'archive'
      end
      
      resources :reports, only: [:index, :show]
    end

    namespace :user do
      resources :events, only: [:index, :show] do
        get 'activate'
      end
    end
  end
end
