# Post - Part 2

- add the ability to edit the data for a given pokemon
  - install react templates for your app
  - add a form at the path: `/pokemon/:id/edit`
  - add each field as an input and pre-populate the current data for that pokemon
  - the form should make a request ( the form action ) to the correct route ( a PUT request to `/pokemon/:id` )
  
#### further
- add a new page with a form ( it will be a form with only a single button )
- make the path for this page `/pokemon/:id/delete`
- submit the form to `/pokemon/:id` with method `DELETE`

#### further

- change your app over to use RESTful routes every route should begin with /pokemon

- change the rest of your app over to react templates

- if your app doesn't have one, create an index page ( the page that lists all of the pokemon )

#### further

- add links to each of your pages:
  - the index page should have a link for each pokemon to the single pokemon page
  - the index page should have alink to the create new pokemon page
  - the single pokemon page should link to the edit page
  - if you have types, the type page should link to each single pokemon page
  - a single pokemon page should link to the type pages

- upon creation of a new pokemon, redirect the user to that single pokemon page ( use `response.redirect` )
- upon successful edit of a pokemon, redirect the user to that single pokemon page ( use `response.redirect` )
 

- how could the ability to change the id of a pokemon screw up your app?
  - restrict the user from changing the id

- validate the input from the user- what happens if they put in a blank field? ( you can make up the rules here- you can allow blank fields or not )
  - try to restrict the user from creating or editing the name of a pokemon to 1 character - (e.g., there shouldn't be a pokemon named "s")
  - restrict the user from creating a pokemon name that is only numbers
  
 - when the user enters a name that is invalid, render the form page with a message about what they did wrong
  