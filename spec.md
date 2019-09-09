Notes for the LOGIN-PAGE

1 Page - Sign Up

- username AKA identifier & pass word -html input fields
- sign up button below user and pw fields
- upon onClick of signup button - saves data somewhere (textfile) - hash & salt

1 Page - Log in

- when user enters username and password into respective fields --> check both against the storage document
  if they match - authorise login
- for safety - hash & salt the document

new route /login-user

- create another route - have following logic:
- check user login credentials against userdata.JSON
- if they match - allow user to login and send them to index.html
- else, error message - maybe wrong credentials? or redirect to signup page
-
