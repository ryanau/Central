V2 Objective: enables 2-way communications

## Features

* Admin
	* Admin can read Questionnaire created by User
		* Admin can approve Questionnaire
* User
	* User can create a specific type of Questionnaire predetermined by Admin
		* User can create "Recruit Volunteers" Questionnaire
		* User can fill out information needed for the specific Questionnaire


## Scenario

###Conversation No. 1
**Sending from main phone**
Berkeley flooding Digest 1
Reply with the short code within the [bracket] for more info

Traffic: I80 University Ramp not accessible [28663]
Weather: Heavy rain for the next 8 hours [62086]
Redcross: Volunteers needed for food distribution at Berk High shelter [39022]

if user reply for Redcross with [39022]

###Conversation No. 2
**Sending from private phone 1**
Hi! This is the Redcross Berkeley Flooding disaster response unit. Would you like to volunteer at the Berk High shelter for food distribution today (3/15) 5-8pm?

Reply with 'yes' or 'no'.

###Conversation No. 3
**Sending from private phone 1**
Thank you for signing up for Berk High shelter for food distribution today (3/15) 5-8pm! How many people (including you) will be coming to help?

Reply with # of attendees including yourself.

###Conversation No. 4
**Sending from private phone 1**
Sounds good! We have you registered for 3 spots. See you today (3/15) 5-8pm at Berk High (1980 Allston Way).

If you cannot make it, please let us know by replying 'cancel' any time. Thank you!

## Schema

User has_many Questionnaires
Event has_many Questionnaires through Users
Questionnaire belongs_to Event through Users

Questionnaire has_many Questions
Question belongs_to Questionnaire

Question has_many Responses
Response belongs_to Question 

4 types of Responses a Question is expecting (needed to correctly interpret the responses)
	* boolean yes/no
	* number
	* text
	* cancel

Questionnaire has_many Responses through Questions
Respone belongs_to Questionnaire through Questions

Questionnaire belongs_to Message
Message has_one Questionnaire

Message has_one Replycode
Replycode belongs_to Message

VolunteerResponse joint table
Volunteer has_many Responses
Respones has_many Volunteers











