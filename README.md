# OmegU
This repo is for the dashboard/profile/login/landing portion of OmegU. It is automatically deployed on Heroku.

[Devpost Page](https://devpost.com/software/omegu)

[Demo Video](https://youtu.be/vcYK6IWm_Mg)

## Inspiration

As a group of incoming first-year university students, we are excited to meet new people on campus this fall. But surely with the pandemic at full heat, online classes make this impossible. Our first year experience is to be ruined... unless… unless we’re able to innovate. This is why we decided to build OmegU, a social media platform that enables first-year students to meet their classmates and build lasting relationships regardless of global situation.

## What it does

After creating an account with your registered university email (non-university emails are not accepted), you can select your academic program, faculty, and input your interests on the OmegU dashboard. We can then connect you with students from your home school that share similar qualities with you. Once connected, you can video chat and text the other person through the OmegU platform. If you feel uncomfortable with video chat, you can always turn off your video or mute yourself. Our web app tells you if you and the other person are in the same academic program along with any common interests you might share. OmegU also provides icebreakers to give daunting interactions smooth beginnings. Once you’ve finished chatting with your new friend, you can return to the dashboard and start again, allowing you to meet more amazing students in difficult times!

## How we built it

The login and registration is built with passport.js on an express.js server connected to MongoDB. User authentication is made secure with bcrypt.js. Once the user is logged in, they can update their interests using the Fetch API and updated to MongoDB. The video chat is built using WebRTC and the text chat is built using Socket.io. The chat runs on a node.js server, along with express.js. Most of the frontend is built using EJS and Bootstrap.

## Challenges we ran into

When building the application, we initially built the login and registration components on their own server. On a separate server, we built the video call and text chat components. This led into some complications down the line as we tried to integrate the two portions to run on a single server. 

Additionally, we ran into troubles combining each individual's work into the central github repository. Within the first few hours on the first day, the repository had to be restarted several times in order to fix unintentional changes and issues which came up. However, we quickly adapted and there were no more issues for the rest of the project.

## Accomplishments that we're proud of
* Forming a remote team with incoming first-year students at our university
* Identifying a problem as a result of the current situation and designing a real-life solution
* Effectively performing requirement analysis, testing, documentation, and version controls
* Completed development of software modules individually and integrated modules successfully
* Delivered a functioning solution, learning new programming skills and languages along the way

All of these accomplishments and milestones made us very proud as a team, as we are progressing towards the production of an application which could genuinely help many students around the world.

## What we learned

We learned a lot throughout this project. Going into the project, we were not sure about how we would build the application. As we progressed through the stages of the project, we learned about both back and front end development, secure information storage, and application deployment. We also gained valuable experience working with the MEN (MERN minus React) stack, and other technologies such as Passport.js, WebRTC, and Socket.io. We also improved our version control skills as the project went along, and gained first-hand experience of software development life cycles as we built the app.

## What's next for OmegU

After the completion of this hacktahon, we plan to implement a confirmation feature where an email is sent to the email a user registers with, in order to confirm that it is their email. We are planning on working towards polishing the UI, before marketing the web application for student use.





