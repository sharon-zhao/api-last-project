# ST Boston - Client
This application allows users to view the course, apply and buy the course.

### Repo Link
Client: https://github.com/sharon-zhao/LAST-project-client
Api: https://github.com/sharon-zhao/api-last-project

## Page Demo
![](https://user-images.githubusercontent.com/62820094/94218955-a3dd1e80-feb3-11ea-8811-d000f84d2d8f.png)

![](https://user-images.githubusercontent.com/62820094/94219289-7d6bb300-feb4-11ea-9f58-c54a9228dfe4.png)
- Home page

![](https://user-images.githubusercontent.com/62820094/94219146-1c43df80-feb4-11ea-95a7-f47aaa684d58.png)
- Google Map API was used, you can click each mark on the map to view the details about that cities.

![](https://user-images.githubusercontent.com/62820094/94219344-9f653580-feb4-11ea-8efe-70e7a3c48260.png)

![](https://user-images.githubusercontent.com/62820094/94219347-a12ef900-feb4-11ea-8740-eaf8ffdf99c3.png)
- Stripe API was used to finish the payment process, it can really charge money. Test bank account was: 4242 4242 4242 4242

![](https://user-images.githubusercontent.com/62820094/94220095-3e3e6180-feb6-11ea-919d-9f503658c5ca.png)

![](https://user-images.githubusercontent.com/62820094/94220098-40082500-feb6-11ea-9162-fcf17acf0086.png)
- User can apply this course to get more information about it.

## User Stories:
- As an unregistered user, I would like to sign up with email and password.
- As a registered user, I would like to sign in with email and password.
- As a signed in user, I would like to change password.
- As a signed in user, I would like to sign out.
- As a signed in user, I would like to view all the course of GA.
- As a signed in user, I would like to be able to add the courses I want.
- As a signed in user, I would like to see all my course in cart.
- As a signed in user, I would like to checkout my course.

## technologies Used

- JavaScript
- express.js

## Wireframe and ERD
- Wireframe:
https://media.git.generalassemb.ly/user/27505/files/ab88fd80-b6e1-11ea-9b6e-26aa7f608802
- Entity Relationship Diagrams:
- Resources:
  1. User
  2. Course
  3. Application
https://media.git.generalassemb.ly/user/27505/files/cf007800-b6e2-11ea-8e97-ccfea43d5b65


## Routes
- Application route has POST PATCH DELETE GET methods
- Course route has POST DELETE GET methods
All the courses in My Cart use get method, when user delete one course, the page will reload all the courses again so there is not patch method for the shopping cart part.
