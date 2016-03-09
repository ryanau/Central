# Central
IEOR 185 Project

## MVP

Central is a web application built using Ruby on Rails as an API and React.js implemented with Flux pattern. It also incorporates Twilio SMS services as the main way form of communication with our users.

Target Audience: User (Rescue Organization) & Victim (Victims during disasters)

#####  V1

- [ ] 

## Getting started

To start Rails API, run `bundle install`, then `rake db:create`, then `rake db:migrate`, then `rails s`

To start React.js frontend, run `npm install`, then `npm run watch`

## Implementation Timeline

### V1

**Objective:** Central enables one-way communication from Organizations to Victims through Twilio SMS API

**Features**
	* Admin can initialize new events (disasters)
		* Admin can CRUD events
		* Admin can approve messages from organizations
		* Admin can dispatch digest manually
	* User (organization) can create messages
		* User can CRUB messages
		* User can see coverage rate
	* Victim can receive digest through SMS
		* Victim can sign up through website

####  Phase 0.0: Rails Skeleton Setup + React.js Skeleton with React Router + Flux with Alt.js + Webpack Configuration (3/5/2016)

- [X] Set up Rails as an API
- [X] Configure basic Ruby Gems needed
- [X] Create `webpack.config` + `package.json` for React frontend
- [X] Set up Flux structure using Alt.js
- [X] Configure settings for React Router

####  Phase 0.1: Setup user authentication with Devise Auth Token + Create auth page for user/admin (3/6/2016)

- [X] Configure Devise Auth Token in Rails API
- [X] Create `User` and `Admin` model
- [X] User/Admin sign up/sign in page
- [X] Account confirmation email using Letter Opener Gem in development
- [X] Create helper files for API Requests and API Constants
- [X] Configure AJAX Requests with token info in headers + set up errorhandlers for taostr notifications
- [X] Create landing page

####  Phase 1.0: Create `Event` Model (3/8/2016)

- [X] Admin can view existing events
- [X] Admin can create events
- [X] Configure serializers to render JSON response
- [X] Set up events components
- [X] Modify navbar in landing page






