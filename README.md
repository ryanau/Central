# Central
Project for UC Berkeley IEOR 185 Sp'16: Challenge Lab (Social Entrepreneurship); Sponsored by Twilio.org

Central is a platform that seeks to increase the efficiency of post-disaster responses by seamlessly connecting local unaffiliated volunteers in disaster-impacted areas with organizations providing emergency response services therefore facilitating a response and reconstruction process that engages and involves local communities, local skills and local knowledge and the overall creation of a more efficient and less wasteful response system.

**Members**

- Project Manager: Ryan Au
- Head of Engineering: Alec Spencer
- Designer: Youwei Du
- Developer: Akari Asai
- Marketing Manager: Spandi Singh
- Partnerhsip Manager: Ed Kim

## Minimum Viable Product

Central is a web application built using Ruby on Rails as an API and React.js implemented with Flux pattern. It also incorporates Twilio SMS services as the main way form of communication with our users.

Target Audience: User (Rescue Organization) & Victim (Victims during disasters)

### V1
**Objective:** Central enables one-way communication from Organizations to Victims through Twilio SMS API

**Features**
* Admin
	* Admin can create, read events (disaster)
		* Admin can archive events
	* Admin can read reports (digest)
		* Admin can dispatch reports manually
	* Admin can read messages (message in a digest)
		* Admin can approve messages
* User (organization)
	* User can read events
		* User can activate events
	* User can read reports
	* User can create, read, update, delete messages
		* User can submit messages for approval
* Victim
	* Victim can sign up through the website
	* Victim can receive report through SMS

### V2
**Objective:** Central enables two-way communication between Organizations and Victims through a Questionnaire-type SMS conversation, so Organizations can gather Responses from the Victims

**Features**
* Admin
	* Admin can read Questionnaire created by User
* User (organization)
	* User can create, read Questionnaire
		* User can create, read, update, delete Questions
		* User can specify Question types: (expecting a certain kind of response)
			* Boolean Yes/No
			* Numeric
			* Strings
			* Cancel command
			* Stop command
		* User can read Responses from Victims for each Question
* Victim
	* Victim can reply with shortcode for follow up information of a Message in the Report
	* Vicitm can reply with Responses for a Question in the Questionnaire

## Getting started

To start Rails API, run `bundle install` to install the gems needed, then `rake db:create`, then `rake db:migrate` then seed data with `rake db:seed`, then `rails s`

To start React.js frontend, run `npm install`, then `npm run watch`. Note the browser will auto-refresh when changes are made in the `/client` folder

To start Redis server for Sidekiq, run `redis-server`

To start Sidekiq for background processing (sms outbound messages), run `bundle exec sidekiq`

If you want to experience the SMS capability through Twilio, add `.env` file in the root with your Twilio credentials.
<pre><code>
	TWILIO_PHONE=
	TWILIO_ACCOUNT_SID=
	TWILIO_AUTH_TOKEN=
</code></pre>

Open up `http://localhost:8080` to access the app.

## Implementation Timeline

####  V0.0: Rails Skeleton Setup + React.js Skeleton with React Router + Flux with Alt.js + Webpack Configuration (3/5/2016)

- [X] Set up Rails as an API
- [X] Configure basic Ruby Gems needed
- [X] Create `webpack.config` + `package.json` for React frontend
- [X] Set up Flux structure using Alt.js
- [X] Configure settings for React Router

####  V0.1: Setup user authentication with Devise Auth Token + Create auth page for user/admin (3/6/2016)

- [X] Configure Devise Auth Token in Rails API
- [X] Create `User` and `Admin` model
- [X] User/Admin sign up/sign in page
- [X] Account confirmation email using Letter Opener Gem in development
- [X] Create helper files for API Requests and API Constants (api endpoints)
- [X] Configure AJAX Requests with token info in headers + set up errorhandlers for taostr notifications
- [X] Create landing page

####  V1.0: Create `Event` Model (3/9/2016)

- [X] Admin can view existing events
- [X] Admin can create events
- [X] Admin can archive events
- [X] Configure serializers to render JSON response
- [X] Set up events components
- [X] Modify navbar in landing page

####  V1.1: Create `Report` and `Message` Model (3/12/2016)

- [X] Admin can view existing reports (digests)
- [X] Admin can approve messages in a report
- [X]	User can compose one new message in report
- [X] User can edit message, which requires re-approval from Admin
- [X] Namespace components into Admin and User

####  V1.2: Admin can dispatch `Report` (3/12/2016)

- [X] Set up Twilio gem and Sidekiq for background process
- [X] Admin can dispatch digest with approved messages
- [X] Report is sent to registered `Victim` through SMS
- [X]	Add auto generate first digest
- [X] Add auto generate subsequent digest after the previous one is sent
- [X] Add transition phase on frontend while digest is being sent through Twilio

####  V1.3: Add `Victim` Model (3/12/2016)

- [X] Anyone can sign up on the website through landing page
- [X] Add unique validation for victim/phone number

####  V1.4: Configure to deploy on Heroku (3/13/2016)

- [X] Configure multi buildpacks
- [X] Configure webpack









