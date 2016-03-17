source 'https://rubygems.org'
ruby '2.2.3'

gem 'rails', '4.2.5.1'
gem 'rails-api'
gem 'spring', :group => :development
gem 'pg'
gem 'devise_token_auth', '~> 0.1.37' # Token based authentication for Rails JSON APIs
gem 'omniauth' # required for devise_token_auth
gem 'active_model_serializers', '~> 0.10.0.rc4'
gem 'rack-cors', :require => 'rack/cors'
gem 'cancancan', '~> 1.10'
gem 'twilio-ruby', '~> 4.11.1'
gem 'sidekiq', '3.5.0'

group :development, :test do
  gem 'dotenv-rails'
  gem 'annotate'
  gem 'awesome_print'
  gem 'better_errors'
  gem 'binding_of_caller'
  gem 'byebug'
  gem 'letter_opener'
  gem 'pry-byebug'
  gem 'pry-rails'
  gem 'recipient_interceptor'
  gem 'rspec-rails'
  gem 'rubocop'
  gem 'quiet_assets'
  gem 'ffaker', '~> 2.1.0'
end

group :production do
  gem 'rails_12factor'
end