Rails.application.routes.draw do
  namespace :api do
    mount_devise_token_auth_for "User", at: 'auth'

    mount_devise_token_auth_for 'Admin', at: 'admin_auth'
    as :admin do
      # Define routes for Admin within this block.
    end

    get 'session/identity', to: 'session#identity'
    get 'session/account', to: 'session#account'
    put 'session/update_organization_name', to: 'session#update_organization_name'

    post 'volunteers/join'

    post 'sms_inbound', :to => 'sms#inbound'

    get 'access_codes/check', to: 'access_codes#check'

    namespace :admin do
      resources :events, only: [:index, :create, :show] do
        get 'archive'
      end
      resources :reports, only: [:index, :update, :show] do
        get 'dispatch_report'
        collection do
          get 'dispatch_next'
        end
      end
      resources :messages, only: [] do
        get 'approve'
      end
      resources :tasks, only: [] do
        get 'approve'
      end
    end

    namespace :user do
      resources :events, only: [:index, :show] do
        get 'activate'
      end
      resources :reports, only: [:index, :show]
      resources :messages, only: [:index, :update, :create, :destroy]
      resources :tasks, only: [:index, :create, :show]
      resources :task_types, only: [:index]

    end
  end

  match '*all', to: 'client_app#index', via: [:get]
end
