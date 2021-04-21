<h1 align="center">
  <br>
  
  <br>
  login-register-jwt-mysql <img src="https://github.com/chandan-pal/login-register-jwt-mysql/workflows/Java%20CI%20with%20Maven/badge.svg?branch=master" />
  <br>
</h1>

<h4 align="center">login and registration service implementing JWT, and MySQL database</h4>


<p align="center">
    <a alt="Java">
        <img src="https://img.shields.io/static/v1?label=Java&message=v1.8&color=blue" />
    </a>
    <a alt="Spring Boot">
        <img src="https://img.shields.io/static/v1?label=Spring%20Boot&message=2.3.1.RELEASE&color=brightgreen" />
    </a>
    <a alt="MySQL">
        <img src="https://img.shields.io/static/v1?label=MySQL&message=8.0.15&color=orange" />
    </a>
    <a alt="JWT">
        <img src="https://img.shields.io/static/v1?label=JWT&message=0.9.1&color=green" />
    </a>
</p>


## Concept ##
This is a Spring-boot authentication server application which authenticates a user and sends back a JSON Web Token. once authenticated these JSON Web tokens can be used by other applications to validate a user.

This application can be used as a template to create a standalone common authetication servers

features:
  1. This application utilizes Spring Security to block all incoming requests without proper authentication and authorization.
  2. It provides api to register a new user and save the user in the database. url '/register'
  3. It generates a new unique userId for every new user.
  4. It uses jdbc authentication to validate/autheticate users from MySQL database and JPA - Java Persistence API.
  5. It generates a new signed JWT for any request to authentication url '/authenticate'. (only if the user credentials are valid).
  6. Additionaly, this application also applie a filter before every subsequent requests to validate the token if any in the request body.


