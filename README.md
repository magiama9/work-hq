# work-hq

WIP

## Team

The WorkHQ team consists of [May Hitchings](https://github.com/mhitchi), [Jon Choi](https://github.com/Jonathan-J-Choi), and [Sam Randels](https://github.com/magiama9).

## About

Job searching isn't easy, but it doesn't have to be quite so hard. WorkHQ is a tool designed to assist job-seekers in organizing their job search. WorkHQ makes it easy to find jobs you're interested in, apply to them, and add them to a tracker that not only organizes the jobs you've applied for, but reminds you of action items so your job search is more effective. Users are able to import jobs from any source, including major job boards, keep track of their active applications, and store their job search materials including resumes and cover letters. Many job-seekers keep track of their job applications across different tools including excel and kanban style lists, but WorkHQ makes it easy to keep everything organized in one place.

## User Stories

### Active Job Searcher

As someone looking for a new job in my field, I often feel overwhelmed by the process and can't keep track of where I've applied. I want there to be one place where I can view all of my job applications in once place.

### Passive Job Searcher

As someone who applies for the occasional job but isn't actively looking for a new job, I often fail to move quickly enough when new jobs appear, and someone is hired before I even apply. I want a place that notifies me of new jobs and makes it easy to apply quickly and seamlessly.

### Open to Opportunities

As someone who isn't actively job searching, but is open to opportunities, I want an easy way to quickly see if there are any new openings in which I would be interested and keep my professional materials organized and updated.

## MVP

1. Users are able to add jobs to their dashboard
2. Users are able to move jobs across the categories in their dashboard
3. Users are able to remove jobs from their dashboard
4. Users are able to create and track to-dos related to their job applications
5. Users should be able to view their professional materials
6. Users should be authenticated and their information should persist.

## Tech

WorkHQ is built and deployed using the MERN (Mongo, Express, React, Node) stack. Information is displayed to the user via React. Express and Node handle server-side functionality. User and job data are stored using MongoDB with Mongoose as the ORM.

Project is deployed via Heroku.
