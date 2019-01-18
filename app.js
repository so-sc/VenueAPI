const express = require('express');
const bodyParser = require('body-parser');
const venueController = require('./controllers/venueController');
const userController = require('./controllers/userController');
const requestController = require('./controllers/requestController');

//Database Instance Connection
require('./config/database')

const app = express();

const port = process.env.PORT || 3301;
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//API ENDPOINTS
//ENDPOINTS FOR VENUES
app
 .route("/venues/:token")
 .get(venueController.listAllVenues)
 .post(venueController.createNewVenue);

app
 .route("/venues/:token/:venueid")
 .get(venueController.readVenue)
 .put(venueController.updateVenue)
 .delete(venueController.deleteVenue);

//ENDPOINTS FOR USERS
app
 .route("/users")
 .post(userController.createNewUser);
 
app
 .route("/users/:token")
 .get(userController.listAllUsers)

app
 .route("/users/:token/:userid")
 .get(userController.readUser)
 .put(userController.updateUser)
 .delete(userController.deleteUser);
 
app
 .route("/users/dept/:token/:deptid")
 .get(userController.findDepartmentUsers)
 .put(userController.updateDepartmentUsers)
 .delete(userController.deleteAllDepartmentUsers)

//ENDPOINTS FOR REQUESTS
app
 .route("/requests/:token")
 .get(requestController.listAllRequests)
 .post(requestController.createNewRequest);

app
 .route("requests/_id/:token/:requestid")
 .get(requestController.readRequest)
 .put(requestController.updateRequest)
 .delete(requestController.deleteRequest)

app
 .route("/requests/dept/:token/:deptid")
 .get(requestController.findDepartmentRequests)
 .put(requestController.updateRequest)
 .delete(requestController.deleteAllDepartmentRequests)

app
 .route("/requests/id/:requestid")
 .get(requestController.findIDRequests)
 .delete(requestController.deleteIDRequest)

//Run Server on specified Port
app.listen(port, () => {
	console.log('Server Running on Port ' + port);
});
