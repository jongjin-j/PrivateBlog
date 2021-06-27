# BostonGolf
## Installing MongoDB

If you do not have mongoDB installed, run the following commands to install. 

Mac: 
### `brew tap mongodb/brew & brew install mongodb-community@4.4`

Windows:  
https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/
  
## Setting up Local Database
Run: 
### `brew services start mongodb-community@4.4`
### `mongo`

Create a database and a collection by running:
### `use test`
### `db.createCollection('collection name')`
Insert any name for collection name above(include single quotes)

## Running the app
On a new terminal or command prompt, in the project directory, run:

### `npm run dev`

Open [http://localhost:5000](http://localhost:5000) to view it in the browser.
