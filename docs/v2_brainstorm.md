2 way communication

Scenario

#1 conversation
**Sending from main phone**
Berkeley flooding Digest 1
Reply with the short code within the [bracket] for more info

Traffic: I80 University Ramp not accessible [28663]
Weather: Heavy rain for the next 8 hours [62086]
Redcross: Volunteers needed for food distribution at Berk High shelter [39022]

if user reply for Redcross with [39022]

#2 conversation
**Sending from private phone 1**
Hi! This is the Redcross Berkeley Flooding disaster response unit. Would you like to volunteer at the Berk High shelter for food distribution today (3/15) 5-8pm?

Reply with 'yes' or 'no'.

#3 conversation
**Sending from private phone 1**
Thank you for signing up for Berk High shelter for food distribution today (3/15) 5-8pm! How many people (including you) will be coming to help?

Reply with # of attendees including yourself.

#4 conversation
**Sending from private phone 1**
Sounds good! We have you registered for 3 spots. See you today (3/15) 5-8pm at Berk High (1980 Allston Way).

If you cannot make it, please let us know by replying 'cancel' any time. Thank you!

----

couple more phone numbers for questionnaire

Message has_one Questionnaire
Message has_one Shortcode

Questionnaire has_many Questions (expecting a response)
Questionnaire has_many Conclusions (concluding message)

Question has_many Responses
Response belongs_to Question

5 types of questions: boolean yes/no, number, text, cancel, stop

MessageVictim joint table
Victim has_many Messages (victim answered with short code)
Message has_many Victims

Victim has_many Questionnaires through Messages
Questionnaires has_many Victims through Messages

ResponseVictim joint table
Victim has_many Responses
Reponse has_many Victims

Question has_many Victims through Responses



