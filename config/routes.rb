Rails.application.routes.draw do
  namespace :api do
    mount_devise_token_auth_for "User", at: 'auth'

    mount_devise_token_auth_for 'Admin', at: 'admin_auth'
    as :admin do
      # Define routes for Admin within this block.
    end

    get 'session/identity', to: 'session#identity'

    post 'volunteers/join'

    post 'sms_inbound', :to => 'sms#inbound'

    namespace :admin do
      resources :events, only: [:index, :create, :show] do
        get 'archive'
      end
      resources :reports, only: [:index, :update, :show] do
        get 'dispatch_report'
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

      get 'tasks/demo_get', to: 'tasks#demo_get'
    end
  end

  match '*all', to: 'client_app#index', via: [:get]
end
