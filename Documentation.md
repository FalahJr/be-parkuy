# Documentations
How to use this API for Frontend or Mobile usage

Base URL: Localhost (temporary)
# Table of Contents
* Authentication
  * [register-petugas](#register-petugas)
  * [login-petugas](#login-petugas)
  * [register-pengendara](#register-pengendara)
  * [login-pengendara](#login-pengendara)
  * [register-admin](#register-admin)
  * [login-admin](#login-admin)
* Admin Dashboard
  * [get total for each data](#get-total-for-each-data)
  * [get petugas dashboard](#get-petugas-dashboards)
* Petugas
  * [search petugas](#search-petugas)
  * [get all petugas files](#get-all-petugas-files)
  * [get-an-petugas-with-a-working-status-already-accepted](#get-an-petugas-with-a-working-status-already-accepted)
  * [get an petugas with a working status not yet accepted](#get-an-petugas-with-a-working-status-not-yet-accepted)
## Register Petugas
* ### Endpoint
  `/api/users/register-petugas`
* ### Method
  POST
* ### Headers
  `Content-type: application/json`
* ### Body
  ```
  {
  "email": "string",
  "password": "string"
  }
  ```
* ### Response Success
  ```
  {
    "statusCode": 201,
    "message": "Successfully register",
    "data": {
        "id": "e3cdb18b-1147-4ae2-bf51-96b30d26fbc1",
        "email": "parkuy@gmail.com",
        "role": "User",
        "emailVerified": false,
    }
  }
  ```
* ### Response Fail (because one of request body not filled (required))
  ```
  {
    "statusCode": 400,
    "message": [
        "email must be an email",
        "email should not be empty",
        "password must be longer than or equal to 6 characters",
        "password should not be empty"
    ],
    "error": "Bad Request"
  }
  ```
* ### Response Fail (because the password is less than 6 characters)
  ```
  {
    "statusCode": 400,
    "message": [
        "password must be longer than or equal to 6 characters"
    ],
    "error": "Bad Request"
  }
  ```
* ### Response Fail (because email already used)
  ```
  {
    "statusCode": 409,
    "message": [
        "Email parkuy@gmail.com already used"
    ],
    "error": "Conflict"
  }
  ```
### Login Petugas
* ### Endpoint
  `/api/auth/login-petugas`
* ### Method
  POST
* ### Headers
  `Content-type: application/json`
* ### Body
  ```
  {
    "email": string,
    "password": string
  }
  ```
* ### Response Success
  ```
  {
    "statusCode": 201,
    "message": "Successfully login as Petugas",
    "data": {
        "id_petugas": "40359e23-771b-4dc7-9e57-aa5259d3ebcb",
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxZmRlZmZmZC0wYWY0LTQxZTUtODkyMy00YmJkZThkNDE5NmQiLCJpYXQiOjE2NTU3MDI1MjYsImV4cCI6MTY1NTcwMjgyNn0.IMvaupjc0pkkJLtDN_LYWLH0XWyUkeM6DIHmpMOA4kA",
        "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RfaWQiOiI2MDFhOGFmNC1lNzA4LTQ3YTgtYWIxOC04MTBhNjA1M2NhZTIiLCJpYXQiOjE2NTU3MDI1MjYsImV4cCI6MTY1NTc4ODkyNn0.srnPa34tu1nUPXVp4khWSzZ410DMX74n4scxeJ9giZE",
        "emailVerified": true,
        "status_petugas": "offline",
        "status_bekerja": "Belum diterima"
    }
  }
  ```
* ### Response Fail (because because the email has not been verified)
  ```
  {
    "statusCode": 400,
    "message": "Please verify your email first, we already send verification link on your email",
    "error": "Bad Request"
  }
  ```
* ### Response Fail (because wrong email or password)
  ```
  {
    "statusCode": 401,
    "message": "Wrong email or password",
    "error": "Unauthorized"
  }
  ```
* ### Response Fail (because email should not be empty)
  ```
  {
    "statusCode": 400,
    "message": [
        "email should not be empty"
    ],
    "error": "Bad Request"
  }
  ```
* ### Response Fail (because password should not be empty)
  ```
  {
    "statusCode": 400,
    "message": [
        "password should not be empty"
    ],
    "error": "Bad Request"
  }
  ```
## Register Pengendara
* ### Endpoint
  `/api/users/register-pengendara`
* ### Method
  POST
* ### Headers
  `Content-type: application/json`
* ### Body
  ```
  {
  "email": "string",
  "password": "string"
  }
  ```
* ### Response Success
  ```
  {
    "statusCode": 201,
    "message": "Successfully register",
    "data": {
        "id": "e3cdb18b-1147-4ae2-bf51-96b30d26fbc1",
        "email": "parkuy@gmail.com",
        "role": "User",
        "emailVerified": false,
    }
  }
  ```
* ### Response Fail (because one of request body not filled (required))
  ```
  {
    "statusCode": 400,
    "message": [
        "email must be an email",
        "email should not be empty",
        "password must be longer than or equal to 6 characters",
        "password should not be empty"
    ],
    "error": "Bad Request"
  }
  ```
* ### Response Fail (because the password is less than 6 characters)
  ```
  {
    "statusCode": 400,
    "message": [
        "password must be longer than or equal to 6 characters"
    ],
    "error": "Bad Request"
  }
  ```
* ### Response Fail (because email already used)
  ```
  {
    "statusCode": 409,
    "message": [
        "Email parkuy@gmail.com already used"
    ],
    "error": "Conflict"
  }
  ```
### Login Pengendara
* ### Endpoint
  `/api/auth/login-pengendara`
* ### Method
  POST
* ### Headers
  `Content-type: application/json`
* ### Body
  ```
  {
    "email": string,
    "password": string
  }
  ```
* ### Response Success
  ```
  {
    "statusCode": 201,
    "message": "Successfully login as Pengendara",
    "data": {
        "id_petugas": "40359e23-771b-4dc7-9e57-aa5259d3ebcb",
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxZmRlZmZmZC0wYWY0LTQxZTUtODkyMy00YmJkZThkNDE5NmQiLCJpYXQiOjE2NTU3MDI1MjYsImV4cCI6MTY1NTcwMjgyNn0.IMvaupjc0pkkJLtDN_LYWLH0XWyUkeM6DIHmpMOA4kA",
        "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RfaWQiOiI2MDFhOGFmNC1lNzA4LTQ3YTgtYWIxOC04MTBhNjA1M2NhZTIiLCJpYXQiOjE2NTU3MDI1MjYsImV4cCI6MTY1NTc4ODkyNn0.srnPa34tu1nUPXVp4khWSzZ410DMX74n4scxeJ9giZE",
        "emailVerified": true,
    }
  }
  ```
* ### Response Fail (because because the email has not been verified)
  ```
  {
    "statusCode": 400,
    "message": "Please verify your email first, we already send verification link on your email",
    "error": "Bad Request"
  }
  ```
* ### Response Fail (because wrong email or password)
  ```
  {
    "statusCode": 401,
    "message": "Wrong email or password",
    "error": "Unauthorized"
  }
  ```
* ### Response Fail (because email should not be empty)
  ```
  {
    "statusCode": 400,
    "message": [
        "email should not be empty"
    ],
    "error": "Bad Request"
  }
  ```
* ### Response Fail (because password should not be empty)
  ```
  {
    "statusCode": 400,
    "message": [
        "password should not be empty"
    ],
    "error": "Bad Request"
  }
  ```
## Register Admin
* ### Endpoint
  `/api/users/register-admin`
* ### Method
  POST
* ### Headers
  `Content-type: application/json`
* ### Body
  ```
  {
  "username": "string",
  "password": "string"
  }
  ```
* ### Response Success
  ```
  {
    "statusCode": 201,
    "message": "Successfully register",
    "data": {
        "id_admin": "77ff32e1-5fd8-45e5-a0f1-77e08709511e",
        "username": "admin",
        "role": "Admin"
    }
  }
  ```
* ### Response Fail (because one of request body not filled (required))
  ```
  {
    "statusCode": 400,
    "message": [
        "username should not be empty",
        "password must be longer than or equal to 6 characters",
        "password should not be empty"
    ],
    "error": "Bad Request"
  }
  ```
* ### Response Fail ()
  ```
  {
    "statusCode": 400,
    "message": [
        "password must be longer than or equal to 6 characters"
    ],
    "error": "Bad Request"
  }
  ```
* ### Response Fail (because username already used)
  ```
  {
    "statusCode": 409,
    "message": [
        "Username admin already used"
    ],
    "error": "Conflict"
  }
  ```
### Get total for each data
* ### Endpoint
  `/api/admin/dashboard`
* ### Method
  GET
* ### Headers
  `Authorization: `Bearer ${token}``
* ### Response Success
  ```
  {
    "message": "get all total data successfully",
    "total": {
        "user": 5,
        "location": 2,
        "petugas": 3,
        "pengendara": 1
    }
  }
  ```
* ### Response Fail (because token not available or expired)
  ```
  {
    "statusCode": 401,
    "message": "Unauthorized"
  }
  ```
### Get petugas dashboards
* ### Endpoint
  `/api/admin/dashboard`
* ### Method
  GET
* ### Headers
  `Authorization: `Bearer ${token}``
* ### Response Success
  ```
  {
    "message": "get all total data successfully",
    "petugas": [
        {
            "id_petugas": "9615ba8a-b94a-45b7-9da4-13d430bf4455",
            "fullName": "Sumarni",
            "namaKota": "Jakarta",
            "alamatPetugas": "JL. Damanhuri",
            "phone": "086545434654",
            "date": null,
            "id_location": "f8fd7765-fb45-4d43-a738-30876d578df6",
            "cityName": "Solo",
            "car": 12,
            "motorCycle": 8,
            "address": "Jl. Pangeran 7-21, Gn. Selili",
            "coordinate": "- 1.76655767,7654",
            "rate": 2000
        },
        {
            "id_petugas": "9a2aa56a-e0c6-41f2-a6e5-6585a4af8c06",
            "fullName": "Ucup Markicup",
            "namaKota": "Samarinda",
            "alamatPetugas": "JL. Buana Kana",
            "phone": "082251569933",
            "date": null,
            "id_location": "8e2875a4-2297-48d8-836e-41d5e4bdb346",
            "cityName": "Malang",
            "car": 12,
            "motorCycle": 8,
            "address": "Jl. Soeharto 7-21, Gn. Bahagia",
            "coordinate": "- 1.76655767,7654",
            "rate": 2000
        }
    ]
  }
  ```
  * ### Response Fail (because token not available or expired)
  ```
  {
    "statusCode": 401,
    "message": "Unauthorized"
  }
  ```
  ### Search Petugas
  * ### Endpoint
  `/api/petugas/search-petugas`
  * ### Method
    GET
  * ### Headers
    `Authorization: `Bearer ${token}``
  * ### Body
  ```
  {
  "fullName": "string",
  }
  ```
  * ### Response Success
  ```
  [
    {
      "id_petugas": "127f0251-ce9d-483b-b863-9d6866bc172e",
      "fullName": "ade",
      "cityName": "kota",
      "address": "Jalan",
      "phone": "084456789944",
      "date": null,
      "status": "Online",
      "status_bekerja": "Sudah diterima",
      "create_at": "2022-06-24T05:37:01.620Z",
      "update_at": "2022-06-29T13:30:16.001Z"
    }
  ]
  ```


  ### Get all petugas files
  * ### Endpoint
  `/api/petugas/berkas-petugas`
  * ### Method
    GET
  * ### Headers
    `Authorization: `Bearer ${token}``
  * ### Response Success
  ```
  [
      {
        "id_petugas": "b9f49752-7631-4586-b296-7cd184a87161",
        "fullName": "Fernata Samudra",
        "cityName": "Palangkaraya",
        "address": "JL. Delima",
        "phone": "086657483366",
        "date": null,
        "status": "online",
        "status_bekerja": "Sudah diterima",
        "id": "5a4a3df0-698e-4b6a-ab4a-f1cd384fb5a1",
        "email": "fernata@gmail.com"
    },
    {
        "id_petugas": "cb68f419-94a9-45ef-b9fd-b32b18b13891",
        "fullName": "Ciko Jeriko",
        "cityName": "Bandung",
        "address": "JL. Kerak",
        "phone": "082251569933",
        "date": null,
        "status": "offline",
        "status_bekerja": "Belum diterima",
        "id": "480db79a-af59-494d-80f7-cad6b4b3ffa9",
        "email": "ciko@gmail.com"
    }
  ]
  ```
  * ### Response Fail (because token not available or expired)
  ```
  {
    "statusCode": 401,
    "message": "Unauthorized"
  }
  ```
  ### Get an petugas with a working status already accepted
  * ### Endpoint
    `/api/petugas/petugas-diterima`
  * ### Method
    GET
  * ### Headers
    `Authorization: `Bearer ${token}``
  * ### Response Success
  ```
  [
    {
        "id_petugas": "b9f49752-7631-4586-b296-7cd184a87161",
        "fullName": "Fernata Samudra",
        "cityName": "Palangkaraya",
        "address": "JL. Delima",
        "phone": "086657483366",
        "date": null,
        "status": "online",
        "status_bekerja": "Sudah diterima",
        "id": "5a4a3df0-698e-4b6a-ab4a-f1cd384fb5a1",
        "email": "fernata@gmail.com"
    }
  ]
  ```
  * ### Response Fail (because token not available or expired)
  ```
  {
    "statusCode": 401,
    "message": "Unauthorized"
  }
  ```
  ### Get an petugas with a working status not yet accepted
  * ### Endpoint
    `/api/petugas/petugas-belum-diterima`
  * ### Method
    GET
  * ### Headers
    `Authorization: `Bearer ${token}``
  * ### Response Success
  ```
  [
    {
        "id_petugas": "cb68f419-94a9-45ef-b9fd-b32b18b13891",
        "fullName": "Ciko Jeriko",
        "cityName": "Bandung",
        "address": "JL. Kerak",
        "phone": "082251569933",
        "date": null,
        "status": "offline",
        "status_bekerja": "Belum diterima",
        "id": "480db79a-af59-494d-80f7-cad6b4b3ffa9",
        "email": "ciko@gmail.com"
    }
  ]
  ```
  * ### Response Fail (because token not available or expired)
  ```
  {
    "statusCode": 401,
    "message": "Unauthorized"
  }
  ```
