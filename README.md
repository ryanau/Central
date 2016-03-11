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
		* Admin can approave messages
* User (organization)
	* User can read events
		* User can activate events
	* User can read reports
	* User can create, read, update, delete messages
		* User can submit messages for approval
* Victim
	* Victim can sign up through the website
	* Victim can receive report through SMS

## Getting started

To start Rails API, run `bundle install`, then `rake db:create`, then `rake db:migrate`, then `rails s`

To start React.js frontend, run `npm install`, then `npm run watch`

Open up `http://localhost:8080`

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
- [X] Create helper files for API Requests and API Constants
- [X] Configure AJAX Requests with token info in headers + set up errorhandlers for taostr notifications
- [X] Create landing page

####  V1.0: Create `Event` Model (3/9/2016)

- [X] Admin can view existing events
- [X] Admin can create events
- [X] Admin can archive events
- [X] Configure serializers to render JSON response
- [X] Set up events components
- [X] Modify navbar in landing page

####  V1.1: Create `Report` Model (3/10/2016)

- [X] Admin can view existing reports







