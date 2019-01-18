# VenueAPI
API for Sahyadri College of Engineering to Manage Venue Registrations.

## Routes
Handling Users
==============
#### Creating New User  
`POST : /users`  
#### List All Users
`GET : /users/<TOKEN>` (Requires minimum Priority : 2)  
#### Read User's Detail By ID
`GET : /users/<TOKEN>/<USER_ID>`
#### Update User with ID
`PUT : /users/<TOKEN>/<USER_ID>`  
#### Delete User with ID
`DELETE : /users/<TOKEN>/<USER_ID>`  
#### Find All Users of a Department
`GET : /users/dept/<TOKEN>/<DEPT_ID>` (Requires minimum Priority : 1)
#### Department User Update
`PUT : /users/dept/<TOKEN>/<DEPT_ID>` (Requires minimum Priority : 1)
#### Delete all Department Users
`DELETE : /users/dept/<TOKEN>/<DEPT_ID>` (Requires minimum Priority : 1)

Handling Venues
==============
#### Creating New Venues
`POST : /venues/<TOKEN>` (Requires minimum Priority : 2)
#### List All Venues
`GET : /venues/<TOKEN>`
#### Read Details of a Venue
`GET : /venues/<TOKEN>/<VENUE_ID>`  
#### Update Venue Details
`PUT: /venues/<TOKEN>/<VENUE_ID>` (Requires minimim Priority : 2)
#### Delete Venue
`DELETE /venue/<TOKEN>/<VENUE_ID>` (Requires minimum Priority : 2)

Handling Requests
==============
#### List All Requests
`GET : /requests/<TOKEN>` (Requires minimum Priority : 2)
#### Create New Request
`POST : /requests/<TOKEN>`
#### Details of a Request
`GET : /requests/<TOKEN>/<REQUEST_ID>`  
#### Update a Request
`PUT : /requests/<TOKEN>/<REQUEST_ID>`  
#### Delete a Request
`DELETE : /requests/<TOKEN>/<REQUEST_ID>`  
#### List all Requests from a Department
`GET : /requests/dept/<TOKEN>/<DEPT_ID>` (Requires minimum Priority : 1 )  
#### Update all Requests of a Department
`PUT : /requests/dept/<TOKEN>/<DEPT_ID>` (Requires minimum Priority : 1 )  
##### Delete all Requests of a Department
`DELETE : /requests/dept/<TOKEN>/<DEPT_ID>` (Requires minimum Priority : 1)  
#### Find Request using id
`GET : /requests/id/<REQUEST_ID>`  
#### Delete Request using id
`DELETE : /requests/id/<REQUEST_ID>`  
