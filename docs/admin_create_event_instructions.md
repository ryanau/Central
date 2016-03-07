# Feature: Admin can view existing Events created #

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
	<pre><code>
		[{"name":"Palm Springs Flooding","city":"Palm Springs","admin":{"uid":"admin@admin.com"}}]
	</code></pre>	

## Frontend ##

1. All code for the frontend resides in `/client` folder (client side code)

2. Create a new folder `admin/events` to keep things neat. Then create a new file called `EventsContainer.js` in the folder. In the file add the following. This is the minimum of what a React component need, which is the `render()` function so there's content to be presented
	<pre><code>
		import React from 'react';
		
		class EventsContainer extends React.Component {
			render() {
				return (
					<div>
						<h4>Events Container</h4>
					</div>
				)
			}
		};

		export default EventsContainer;
	</code></pre>

3. Now go to the `routes.js` file, this is the routing for our frontend, similar to the `routes.rb` file in our Rails backend. Add the line `import EventsContainer from 'components/admin/events/EventsContainer';` and `<Route path='events' component={EventsContainer}/>` so it looks like this
	<pre><code>
		import React from 'react';
		import { Route } from 'react-router';

		import Landing from 'components/Landing';
		import Auth from 'components/session/Auth';
		import AdminAuth from 'components/session/AdminAuth';
		import AccountActivation from 'components/session/AccountActivation';
		import EventsContainer from 'components/admin/events/EventsContainer';

		const routes = (
		  <Route path='/' component={Landing}>
		  	<Route path='auth' component={Auth}/>
		  	<Route path='admin_auth' component={AdminAuth}/>
		  	<Route path='account_activation' component={AccountActivation}/>
		  	<Route path='events' component={EventsContainer}/>
		  </Route>
		);

		export default routes;
	</code></pre>
	
4. So we've added the `EventsContainer` React component and configure our route via `ReactRouter`. Headover to your browser with the url `http://localhost:8080/events` and you'll see the sentence: Events Container, so now we know the React component we just created indeed works

5. Now we have to work on fetching data from our Rails API (backend). We do this by adding a AJAX request to fetch the data from our `localhost:3000/api/events` API endpoint we previously set up, update the state in the `EventsContainer` component, and render the JSON response in the component. We'll be using an architecture called Flux pattern, which we're going to implement via `Alt.js`, a library we installed if you look at our `package.json` file. Similar to Ruby gems

6. This part is a lot of magic. To separate the unidirectional data flow `React.js` proposes, the flux architecture is implemented via 3 types of file, `Store`, `Action` and `Component`
	* `Store` stores the state (data) our `Component` needs
	* `Action` is where the AJAX requests happen
	* `Component` is what the users will see through the webpage with data fetched through `Action`

	The data flow looks like this:
	`Component` calls a fetchData function through `Action` -> `Store` updates its state with the data received -> `Component` re-renders when its state gets updated (since it will be connected to the `Store`)

7. Actions We've already created the component part with the `EventsContainer.js` file. Now create a `eventActions.js` file in `/actions` folder and create a `eventsStore.js` file in `/stores`. Along with the `components/admin/events/EventsContainer.js` file, these are the THREE files we will be interacting with for now. Also, we will be importing our url for our ajax request through the `api_constants.js` file and our pre-set AJAX request through the `api_requests.js` file

8. Let's first set up the url we need in `api_constants.js` file. The `get events()` collection url points to our Rails API endpoint
	<pre><code>
		class Api_Constants {
			constructor() {
				this.origin = 'http://localhost:3000/api/'
			}
			get session() {
				return {
					sign_up: this.origin + 'auth',
					sign_in: this.origin + 'auth/sign_in',
					sign_out: this.origin + 'auth/sign_out',
					admin_sign_up: this.origin + 'admin_auth',
					admin_sign_in: this.origin + 'admin_auth/sign_in',
					admin_sign_out: this.origin + 'admin_auth/sign_out',
					identity: this.origin + 'session/identity',
				}
			}
			get events() {
				return {
					collection: this.origin + 'events'
				}
			}
		}

		const ApiConstants = new Api_Constants();
		export default ApiConstants
	</code></pre>

9. Now we need to set up our AJAX request inour `eventsAction.js` file. In the `constructor()` function, we `generateActions('storeEvents')` which our `eventsStore` will be listening later in order to be notified that the AJAX request is complete and will update its state
	<pre><code>
		import alt from 'control';
		import ApiConstants from 'api_constants';
		import ApiRequests from 'api_requests';

		class EventsActions {
			constructor() {
				this.generateActions(
					'storeEvents'
				)
			}
			fetchEvents() {
				const resolve = (res) => {
					this.actions.storeEvents(res);
				}
				ApiRequests.get(ApiConstants.events.collection, null, resolve)
			}
		}

		export default alt.createActions(EventsActions);
	</code></pre>

10. Now we need to set up our `EventsStore.js`. The












