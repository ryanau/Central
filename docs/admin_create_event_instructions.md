# Feature: Admin can create Event (as in new disaster) and view existing Events created #

## Backend ##
1. Run `rails g model Event` to generate Event model. Bonus, Events controller and migration table are also generated
2. Edit migration table to fill out content we need
	* Add in `admin_id`, `name` and `city` field for now
3. Update models
	* `Admin` model `has_many :events`
	* `Event` model `belongs_to :admin`
4. Run `rake db:migrate` to update our ddatabase with the new schema
5. Run `rails c` to enter console and create fake event
	* Assuming you've already created an `Admin` account and have activated
	* We will create an event through the active model association, so rails automatically add the `admin_id` for us. Run `Admin.first.events.create(name: 'Palm Springs Flooding', city: 'Palm Springs)`
6. Generate active model serializer by running `rails g serializer event`
7. In the `event_serializer` file, add in `attributes :name, :city, :

