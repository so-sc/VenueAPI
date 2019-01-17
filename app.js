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
 .route("/venues")
 .get(venueController.listAllVenues)
 .post(venueController.createNewVenue);

app
 .route("/venues/:venueid")
 .get(venueController.readVenue)
 .put(venueController.updateVenue)
 .delete(venueController.deleteVenue);

//ENDPOINTS FOR USERS
app
 .route("/users")
 .get(userController.listAllUsers)
 .post(userController.createNewUser);

app
 .route("/users/:userid")
 .get(userController.readUser)
 .put(userController.updateUser)
 .delete(userController.deleteUser);

//ENDPOINTS FOR REQUESTS
app
 .route("/requests")
 .get(requestController.listAllRequests)
 .post(requestController.createNewRequest);

app
 .route("requests/_id/:requestid")
 .get(requestController.readRequest)
 .put(requestController.updateRequest)
 .delete(requestController.updateRequest)

app
 .route("/requests/:token/dept/:requestid")
 .get(requestController.findDepartmentRequests)
 .put(requestController.updateRequest)
 .delete(requestController.deleteRequest)

app
 .route("/requests/id/:requestid")
 .get(requestController.findIDRequests)
 .delete(requestController.deleteIDRequest)

app.listen(port, () => {
	console.log('Server Running on Port ' + port);
});
