# Schedule-Buzzers
an app to keep you scheduled


for calendar events: https://github.com/wmcmahan/react-native-calendar-events#recurrence-rule

for google calendar control : https://www.npmjs.com/package/react-google-calendar-api

to add calender and google sign in:

sign in: https://firebase.google.com/docs/auth/web/google-signin?utm_campaign=Firebase_featureoverview_education_auth_en_07-26-16&utm_source=Firebase&utm_medium=yt-desc

google calendar api: https://developers.google.com/calendar/overview

To be done:
1) tabs for schedule and assignments display page: to allow diplay in the form of table and sectionlist - Done
2) add update button in schedule and assignment display page. - Done
3) check for same timing and assignment name to see if it already exists. 
4) food places, convert excel to database in firebase - done
5) notifications
6) Fix the UI - blue space below profile page and some colour combinations ,  White space below the schedule page to be fixed, Changing the table colour in assignment and schedule page - done
7) See all button in the food page
8) Bus part 
9) Crashing on certain buttons- done
10) calendar event is stored accorging to GMT, then device's calendar adds 8 hrs to make it Spore time. need to subtract 8 hrs while adding to calendar - done!!

Proposed Level of Achievement: Gemini

Aim

We hope to help people schedule their lives at NUS. We hope to provide an app that is capable of performing multiple functions such as providing reminders for classes, giving suggestions on the buses to board, the most important - keeping a track of all the assignment deadlines and last but not the least, satisfy your hunger craving in the midst of a busy day by providing you with a list of the restaurants in the area.

Features to be completed by the mid of June:

Database in firebase that stores all user information

Use react-native to create the home page and sign in/sign up page and use firebase for user authentication

Create a main screen with navigation options

Work on the add schedule screen, linking the information input by the user to the database in firebase

Work on the add assignment screen, linking the information input by the user to the database in firebase

Add a profile page that displays user information, possibly with a profile picture

Link the account settings page to firebase to allow user to modify personal information

Make a database of all NUS shuttle bus routes

Implement a code that shows possible busses that can be taken given the destination of the user.

Create a terms and condition page and a general information page

Features to be completed by the mid of July:

Work on code to provide notifications to the user reminding the user about classes and/or assignments

Create a database of all food places in NUS

Implement a code that shows food places around a specific location

Work on making the app more user friendly

Work on features specific to iOS and Android OS.

Possible AddOns

If our plan of development of the application goes as per the schedule, we plan to implement a GPS Tracking System within the app in order to be used in the “Find Food” part of our project. We will use this tracker to track the current location of the user and display this location as the default location around which the user wants to find food options. The user can also change this location depending on his/her needs.

This GPS Tracker will also be used to track the location of the user before giving notifications about the buses he/she can take for class, thus filtering out the results to the most relevant ones.
