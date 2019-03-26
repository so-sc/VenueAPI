# VENUE API
Venue API is a Venue Management API for Sahyadri College of Engineering and Management by SOSC.

## Routes 
[ALL REQUESTS ARE OF METHOD `POST`] 
### USER HANDLING 

#### Create a New User : `/register`  
    MINIMUM PRIORITY : 0  
    REQUIRES: `faculty_id, username, password, department`  
    OPTIONAL: `priority(default: 0)`

#### List All Users  : `/user`  [TESTING ONLY]  
    MINIMUM PRIORITY : 0  
    REQUIRES: ``  
    OPTIONAL: ``

#### Login as a User : `/login`  
    MINIMUM PRIORITY : 0  
    REQUIRES: `faculty_id, password`  
    OPTIONAL: ``

#### List All Users of a Department : `user/dept`  
    MINIMUM PRIORITY : 1  
    REQUIRES: `token`  
    OPTIONAL: ``

### REQUEST HANDLING

#### List All Requests : `request/all`  
    MINIMUM PRIORITY : 2  
    REQUIRES: `token`  
    OPTIONAL: ``

#### Delete All Requests : `request/all`  [METHOD DELETE]
    MINIMUM PRIORITY : 2  
    REQUIRES: `token`  
    OPTIONAL: ``

#### List All Requests of a Department : `request/dept`  
    MINIMUM PRIORITY : 1  
    REQUIRES: ``  
    OPTIONAL: ``