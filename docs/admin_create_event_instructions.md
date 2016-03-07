# Feature: Admin can create Event (as in new disaster) and view existing Events created #

## Backend ##
1. Run `rails g model Event` in terminal to generate Event model. Bonus, Events migration table is also generated

2. Edit migration table to fill out content we need
	<pre><code>
		class CreateEvents < ActiveRecord::Migration
		  def change
		    create_table :events do |t|
		      t.integer :admin_id
		      t.string :city
		      t.string :name
		      
		      t.timestamps null: false
		    end
		  end
		end
	</code></pre>

3. Update models
	* `Admin` model `has_many :events`
		<pre><code>
			class Admin < ActiveRecord::Base
			  # Include default devise modules.
			  devise :database_authenticatable, :registerable,
			          :recoverable, :rememberable, :trackable, :validatable,
			          :confirmable, :omniauthable
			  include DeviseTokenAuth::Concerns::User

			  has_many :events
			end
		</code></pre>
	* `Event` model `belongs_to :admin`
		<pre><code>
			class Event < ActiveRecord::Base
			  belongs_to :admin
			end
		</code></pre>	

4. Run `rake db:migrate` to update our database with the new schema

5. Run `rails c` to enter console mode to talk to our database and create fake event
	* Assuming you've already created an `Admin` account and have activated
	* We will create an event through the active model association, so rails automatically add the `admin_id` for us. Run `Admin.first.events.create(name: 'Palm Springs Flooding', city: 'Palm Springs')`

6. Generate active model serializer by running in terminal `rails g serializer event`

7. In the `event_serializer` file, update the file `attributes :name, :city` so we only get these attributes without other useless information like `created_at` and `updated_at`. We also set up the relationship in our active model serializer
	<pre><code>
		class EventSerializer < ActiveModel::Serializer
		  attributes :name, :city

		  belongs_to :admin
		end
	</code></pre>	

8. Now go to our `admin_serializer` file. First we want to make sure we only get back the `Admin` uid attribute (which is their email in this case). So we add `attributes :uid`. Below that, we have to add in the reciprocal relationship with `Event`. So we have
	<pre><code>
		class AdminSerializer < ActiveModel::Serializer
		  attributes :uid

		  has_many :events
		end
	</code></pre>	

9. Now have the model, migration and serializer set up. Let's move to the controller. First, go to `routes.rb` to add in our routes `    resources :events, only: [:index, :create]` so we get the index route to see all the events, and the create route to create a new one, following RESTful routes

10. Create the controller by running in the terminal `rails g controller api/events`. We're namespacing it with `api` for good practice, since we're accessing it as an api. Remember it's plural not singular when you're generating the controller. You'll also have to change where the `Api::EventsController` is inherited from. In our case, it's `Api::BaseController` instead of `ApplicationController` so it should look like this. We serialize the `events` object and render is in json format for our api access. The authentication method will be needed when we specify that only the admin can access it from the frontend
	<pre><code>
		class Api::EventsController < Api::BaseController
			# before_action :authenticate_api_admin!, only: [:index]
			def index
			  events = Event.all
			  
			  render json: events, each_serializer: EventSerializer
			end
		end
	</code></pre>	

11. Now add over to your browser and go to the url `http://localhost:3000/api/users` and we can see our json response formatted neatly with just the `name` and `city` attributes, along with our admin object with the attribute `uid`
	* The response should look like this
	<!-- <pre><code> -->
		[{"name":"Palm Springs Flooding","city":"Palm Springs","admin":{"uid":"admin@admin.com"}}]
	</code></pre>	








