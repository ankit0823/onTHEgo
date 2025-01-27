# User Registration Endpoint

## POST /users/register

### Description

This endpoint is used to register a new user. It requires the user's first name, last name, email, and password.

### Request Body

The request body should be a JSON object with the following fields:

- `fullname`: An object containing:
  - `firstname` (string, required): The user's first name. Must be at least 3 characters long.
  - `lastname` (string, optional): The user's last name. Must be at least 3 characters long if provided.
- `email` (string, required): The user's email address. Must be a valid email format.
- `password` (string, required): The user's password. Must be at least 6 characters long.

### Example Request

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### Responses

#### Success

- **Status Code**: 201 Created
- **Response Body**:
  ```json
  {
    "token": "jwt_token_here",
    "user": {
      "_id": "user_id_here",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com",
      "socketId": null
    }
  }
  ```

#### Validation Errors

- **Status Code**: 400 Bad Request
- **Response Body**:
  ```json
  {
    "errors": [
      {
        "msg": "First name must be at least 3 character long",
        "param": "fullname.firstname",
        "location": "body"
      },
      {
        "msg": "Invalid Email",
        "param": "email",
        "location": "body"
      },
      {
        "msg": "Password must be at least 6 character long",
        "param": "password",
        "location": "body"
      }
    ]
  }
  ```

### Notes

- Ensure that the `Content-Type` header is set to `application/json` when making the request.

# User Login Endpoint

## POST /users/login

### Description

This endpoint is used to log in an existing user. It requires the user's email and password.

### Request Body

The request body should be a JSON object with the following fields:

- `email` (string, required): The user's email address. Must be a valid email format.
- `password` (string, required): The user's password. Must be at least 6 characters long.

### Example Request

```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### Responses

#### Success

- **Status Code**: 200 OK
- **Response Body**:
  ```json
  {
    "token": "jwt_token_here",
    "user": {
      "_id": "user_id_here",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com",
      "socketId": null
    }
  }
  ```

#### Validation Errors

- **Status Code**: 400 Bad Request
- **Response Body**:
  ```json
  {
    "errors": [
      {
        "msg": "Invalid Email",
        "param": "email",
        "location": "body"
      },
      {
        "msg": "Password must be at least 6 character long",
        "param": "password",
        "location": "body"
      }
    ]
  }
  ```

### Notes

- Ensure that the `Content-Type` header is set to `application/json` when making the request.

# User Profile Endpoint

## GET /users/profile

### Description

This endpoint is used to retrieve the profile of the currently authenticated user.

### Responses

#### Success

- **Status Code**: 200 OK
- **Response Body**:
  ```json
  {
    "_id": "user_id_here",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": null
  }
  ```

#### Unauthorized

- **Status Code**: 401 Unauthorized
- **Response Body**:
  ```json
  {
    "message": "Authentication required"
  }
  ```

### Notes

- Ensure that the `Authorization` header is set with the JWT token when making the request.

# User Logout Endpoint

## GET /users/logout

### Description

This endpoint is used to log out the currently authenticated user.

### Responses

#### Success

- **Status Code**: 200 OK
- **Response Body**:
  ```json
  {
    "message": "Logout successfully"
  }
  ```

#### Unauthorized

- **Status Code**: 401 Unauthorized
- **Response Body**:
  ```json
  {
    "message": "Authentication required"
  }
  ```

### Notes

- Ensure that the `Authorization` header is set with the JWT token when making the request.

# Driver Registration Endpoint

## POST /drivers/register

### Description

This endpoint is used to register a new driver. It requires the driver's first name, last name, email, password, and vehicle details.

### Request Body

The request body should be a JSON object with the following fields:

- `firstname` (string, required): The driver's first name. Must be provided.
- `lastname` (string, optional): The driver's last name.
- `email` (string, required): The driver's email address. Must be a valid email format.
- `password` (string, required): The driver's password.
- `vehicle`: An object containing:
  - `color` (string, required): The vehicle's color.
  - `plate` (string, required): The vehicle's plate number.
  - `capacity` (number, required): The vehicle's capacity.
  - `vehicleType` (string, required): The type of the vehicle.

### Example Request

```json
{
  "firstname": "Jane",
  "lastname": "Doe",
  "email": "jane.doe@example.com",
  "password": "password123",
  "vehicle": {
    "color": "red",
    "plate": "XYZ123",
    "capacity": 4,
    "vehicleType": "sedan"
  }
}
```

### Responses

#### Success

- **Status Code**: 201 Created
- **Response Body**:
  ```json
  {
    "_id": "driver_id_here",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Doe"
    },
    "email": "jane.doe@example.com",
    "vehicle": {
      "color": "red",
      "plate": "XYZ123",
      "capacity": 4,
      "vehicleType": "sedan"
    }
  }
  ```

#### Validation Errors

- **Status Code**: 400 Bad Request
- **Response Body**:
  ```json
  {
    "errors": [
      {
        "msg": "All fields are required",
        "param": "field_name",
        "location": "body"
      }
    ]
  }
  ```

### Notes

- Ensure that the `Content-Type` header is set to `application/json` when making the request.

# Driver Login Endpoint

## POST /drivers/login

### Description

This endpoint is used to log in an existing driver. It requires the driver's email and password.

### Request Body

The request body should be a JSON object with the following fields:

- `email` (string, required): The driver's email address. Must be a valid email format.
- `password` (string, required): The driver's password. Must be at least 6 characters long.

### Example Request

```json
{
  "email": "jane.doe@example.com",
  "password": "password123"
}
```

### Responses

#### Success

- **Status Code**: 200 OK
- **Response Body**:
  ```json
  {
    "token": "jwt_token_here",
    "driver": {
      "_id": "driver_id_here",
      "fullname": {
        "firstname": "Jane",
        "lastname": "Doe"
      },
      "email": "jane.doe@example.com",
      "vehicle": {
        "color": "red",
        "plate": "XYZ123",
        "capacity": 4,
        "vehicleType": "sedan"
      }
    }
  }
  ```

#### Validation Errors

- **Status Code**: 400 Bad Request
- **Response Body**:
  ```json
  {
    "errors": [
      {
        "msg": "Invalid Email",
        "param": "email",
        "location": "body"
      },
      {
        "msg": "Password must be at least 6 characters long",
        "param": "password",
        "location": "body"
      }
    ]
  }
  ```

### Notes

- Ensure that the `Content-Type` header is set to `application/json` when making the request.

# Driver Profile Endpoint

## GET /drivers/profile

### Description

This endpoint is used to retrieve the profile of the currently authenticated driver.

### Responses

#### Success

- **Status Code**: 200 OK
- **Response Body**:
  ```json
  {
    "_id": "driver_id_here",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Doe"
    },
    "email": "jane.doe@example.com",
    "vehicle": {
      "color": "red",
      "plate": "XYZ123",
      "capacity": 4,
      "vehicleType": "sedan"
    }
  }
  ```

#### Unauthorized

- **Status Code**: 401 Unauthorized
- **Response Body**:
  ```json
  {
    "message": "Authentication required"
  }
  ```

### Notes

- Ensure that the `Authorization` header is set with the JWT token when making the request.

# Driver Logout Endpoint

## GET /drivers/logout

### Description

This endpoint is used to log out the currently authenticated driver.

### Responses

#### Success

- **Status Code**: 200 OK
- **Response Body**:
  ```json
  {
    "message": "Logged out successfully"
  }
  ```

#### Unauthorized

- **Status Code**: 401 Unauthorized
- **Response Body**:
  ```json
  {
    "message": "Authentication required"
  }
  ```

### Notes

- Ensure that the `Authorization` header is set with the JWT token when making the request.

# Ride Creation Endpoint

## POST /rides/create

### Description

This endpoint is used to create a new ride. It requires the user's pickup address, destination address, and vehicle type.

### Request Body

The request body should be a JSON object with the following fields:

- `pickup` (string, required): The pickup address. Must be at least 3 characters long.
- `destination` (string, required): The destination address. Must be at least 3 characters long.
- `vehicleType` (string, required): The type of vehicle. Must be one of `auto`, `car`, or `moto`.

### Example Request

```json
{
  "pickup": "123 Main St",
  "destination": "456 Elm St",
  "vehicleType": "car"
}
```

### Responses

#### Success

- **Status Code**: 201 Created
- **Response Body**:
  ```json
  {
    "user": "user_id_here",
    "pickup": "123 Main St",
    "destination": "456 Elm St",
    "vehicleType": "car",
    "otp": "123456",
    "fare": 100
  }
  ```

#### Validation Errors

- **Status Code**: 400 Bad Request
- **Response Body**:
  ```json
  {
    "errors": [
      {
        "msg": "Invalid pickup address",
        "param": "pickup",
        "location": "body"
      },
      {
        "msg": "Invalid destination address",
        "param": "destination",
        "location": "body"
      },
      {
        "msg": "Invalid vehicleType",
        "param": "vehicleType",
        "location": "body"
      }
    ]
  }
  ```

### Notes

- Ensure that the `Content-Type` header is set to `application/json` when making the request.

# Maps Endpoints

## GET /maps/get-coordinates

### Description

This endpoint is used to get the coordinates (latitude and longitude) of a given address.

### Query Parameters

- `address` (string, required): The address to get coordinates for. Must be at least 3 characters long.

### Example Request

```http
GET /maps/get-coordinates?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA
```

### Responses

#### Success

- **Status Code**: 200 OK
- **Response Body**:
  ```json
  {
    "success": true,
    "coordinates": {
      "lat": 37.4224764,
      "lng": -122.0842499
    }
  }
  ```

#### Validation Errors

- **Status Code**: 400 Bad Request
- **Response Body**:
  ```json
  {
    "errors": [
      {
        "msg": "Invalid or missing address parameter.",
        "param": "address",
        "location": "query"
      }
    ]
  }
  ```

#### API Errors

- **Status Code**: 500 Internal Server Error
- **Response Body**:
  ```json
  {
    "success": false,
    "message": "Error message here"
  }
  ```

## GET /maps/get-distance-time

### Description

This endpoint is used to get the distance and time between an origin and a destination.

### Query Parameters

- `origin` (string, required): The starting point address. Must be at least 3 characters long.
- `destination` (string, required): The destination address. Must be at least 3 characters long.

### Example Request

```http
GET /maps/get-distance-time?origin=New+York,+NY&destination=Los+Angeles,+CA
```

### Responses

#### Success

- **Status Code**: 200 OK
- **Response Body**:
  ```json
  {
    "success": true,
    "distanceTime": {
      "distance": {
        "text": "2,789 mi",
        "value": 4488370
      },
      "duration": {
        "text": "1 day 18 hours",
        "value": 153600
      }
    }
  }
  ```

#### Validation Errors

- **Status Code**: 400 Bad Request
- **Response Body**:
  ```json
  {
    "errors": [
      {
        "msg": "Origin and destination are required",
        "param": "origin",
        "location": "query"
      },
      {
        "msg": "Origin and destination are required",
        "param": "destination",
        "location": "query"
      }
    ]
  }
  ```

#### API Errors

- **Status Code**: 500 Internal Server Error
- **Response Body**:
  ```json
  {
    "message": "internet server error"
  }
  ```

## GET /maps/get-suggestions

### Description

This endpoint is used to get autocomplete suggestions for a given input.

### Query Parameters

- `input` (string, required): The input text to get suggestions for. Must be at least 3 characters long.

### Example Request

```http
GET /maps/get-suggestions?input=1600+Amphitheatre
```

### Responses

#### Success

- **Status Code**: 200 OK
- **Response Body**:
  ```json
  [
    {
      "description": "1600 Amphitheatre Parkway, Mountain View, CA, USA",
      "place_id": "ChIJ2eUgeAK6j4ARbn5u_wAGqWA"
    },
    // ...more suggestions...
  ]
  ```

#### Validation Errors

- **Status Code**: 400 Bad Request
- **Response Body**:
  ```json
  {
    "errors": [
      {
        "msg": "query is required",
        "param": "input",
        "location": "query"
      }
    ]
  }
  ```

#### API Errors

- **Status Code**: 500 Internal Server Error
- **Response Body**:
  ```json
  {
    "message": "Internal server error"
  }
  ```

### Notes

- Ensure that the `Content-Type` header is set to `application/json` when making the request.

