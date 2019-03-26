# VENUE API
Venue API is a Venue Management API for Sahyadri College of Engineering and Management by SOSC.

## Routes 
[ALL REQUESTS ARE OF METHOD `POST`] 
### USER HANDLING 

#### List All Users : `/`  
    MINIMUM PRIORITY : 0  
    REQUIRES: `faculty_id, username, password, department`  
    OPTIONAL: `priority(default: 0)`

#### List All Users of a Department : `/dept`  
    MINIMUM PRIORITY : 1  
    REQUIRES: ``  
    OPTIONAL: ``

### REQUEST HANDLING

#### List All Requests : `/all`  
    MINIMUM PRIORITY : 2  
    REQUIRES: ``  
    OPTIONAL: ``