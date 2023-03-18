# slack-reinvite-automation

## What
This repo contains a browser automation that opens up a Slack workspace and reinvites every member who hasn't accepted the invite yet.

## Why
I'm an admin of many Slack workspaces and frequently need to reinvite people manually. After Slack recently changed their interface to add an extra confirmation pop up and refresh the page after each reinvite, I decided to finally automate this process.

## How
1. Clone this repo
2. Run `npm install`
3. Copy the contents of `.cypress.env.json.sample` to another file named `.cypress.env.json` and update the required variables to your specific workspace
4. Run `npm start`