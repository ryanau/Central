# Feature: Admin can create Event (as in new disaster) and view existing Events created #

## Backend ##
1. Run `rails g model Event` in console to generate Event model. Bonus, Events controller and migration table are also generated

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

5. Run `rails c` to enter console and create fake event
	* Assuming you've already created an `Admin` account and have activated
	* We will create an event through the active model association, so rails automatically add the `admin_id` for us. Run `Admin.first.events.create(name: 'Palm Springs Flooding', city: 'Palm Springs)`
6. Generate active model serializer by running `rails g serializer event`
7. In the `event_serializer` file, add in `attributes :name, :city` so we only get these attributes without other useless information like `created_at` and `updated_at`. Below that add `belongs_to :admin` so that when we get our serialized object, we also get info about the admin
8. Now go to our `admin_serializer` file. First we want to make sure we only get back the `Admin` uid attribute (which is their email in this case). So we add `attributes :uid`. Below that, we have to add in the reciprocal relationship with `Event`. So we add `

