# Crowdfund
A fancy dynamic crowdfunding website built with Meteor.

Based upon Kickstarter, it allows you to run multiple concurrent campaigns, post project updates, have prizes for each campaign, and keep track of donors. Uses StripeJS for payment.

<a target='_blank' rel='nofollow' href='https://app.codesponsor.io/link/FxZBsM1BVd2zn4caD6nypquU/alexanderson1993/crowdfund'>  <img alt='Sponsor' width='888' height='68' src='https://app.codesponsor.io/embed/FxZBsM1BVd2zn4caD6nypquU/alexanderson1993/crowdfund.svg' /></a>

## Initial setup
1. Copy `settings_template.json` to `settings.json` and put necessary settings into it
2. Update the default username and password in `/server/startup.js`
3. Run `meteor --settings settings.json` or use `mupx` to deploy to a remote server
