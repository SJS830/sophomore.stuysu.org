# sophomore.stuysu.org

The sophomore student union website. See [our frontend prototype](https://github.com/pserb/sophsu-web).

## Available scripts

* `npm run start`
* `npm run test`

## Environment Variables

It's easiest to make a `.env` file to use these locally.

| Name | Description |
|:----:|:-----------:|
| **PORT** | what port to run on (default is 3001) |
| **DATABASE_LOAD** | describes how to load the Sequelize ORM (force, alter) |
| **DATABASE_URL** | a database url to use (default is a SQLite DB at ./app.db) |
| **LOG** | if the database should log (default is no logging) |
| **AUTHENTICATION_MODE**| Change the admin panel authentication mode in development: <ul><li><b>full</b>- uses google to sign in and checks for a valid email address.</li><li><b>show</b>- uses google to sign in and doesn't check for a valid email address.</li><li><b>skip</b>(or anything not above)- doesn't work through google -- force loads admin panel</li><li><i>default is full authentication ("full")</i></li></ul> |
| **CLIENT_ID** | the google api client id for the google admin panel authentication (not necessary if AUTH_MODE is set to not use google) |
| **CLIENT_SECRET**| the google api client secret for google authentication |
| **ACCESS_TOKEN_SECRET** | the signuture of the JWTs distrubted for authorization |

## Todo

* think about better study guide and event interface for admin page
* add newsletter
* timezones are messed up between local and remote website (e.g. event interface, consider using Date datatype in the models)
* redesign error page
* clean api response code
* not all of the alerts actually respond to what the server is saying
* add READMEs to each folder
* fix the way admin panel login fails work (it's a url query) (see /admin/signin?message)
