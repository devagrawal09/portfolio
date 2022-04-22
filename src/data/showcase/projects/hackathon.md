In terms of technical challenge, diversity, and educational value, this has been my biggest project so far.

The "Hackathon Suite" is a suite of applications and services that are designed to aid our hackathon organizing teams with various aspects of the hackathon. I joined this project in late 2019, at which point this project had a very small scope. I took charge of this project and the team in 2020, just as we were forced to go virtual. The need for more virtual assistance, along with my endeavors to automate as much as possible, increased the scope of this project drastically.

This project is composed of:

- The main website with all the hackathon information and a registration form. Statically generated using Jekyll.
- An administrative panel to manage registrations and send pre-designed emails. Built with Angular and RxJS.
- A judging panel for organizers to manage submissions, judges, prize categories and assignments, and for judges to view and rank submissions assigned to them. Build with Angular and RxJS.
- A tinder-like matching app for hackers to find potential teammates. Uses a scoring system based on hackers' skills. Built with React.
- A discord bot to check-in attendees and provide appropriate level of access to the discord server. Uses Discord.js.
- An alert service that accepts webhooks from various cloud services and delivers notifications to a Microsoft Teams channel. Built for AWS Lambda.
- A stats dashboard to show a bunch of visualizations for live data and historical trends. Built using React and Chart.js.
- An emails server to process templates designed in HTML and SCSS and produce email templates. Built using Express and HEML.
- A modular monolith API server, built with NestJS and Postgres.

<image src="/hackathon-web.jpg" width="100%">
