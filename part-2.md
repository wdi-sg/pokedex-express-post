# Post - Part 2

- change the rest of your app over to react templates

- if your app doesn't have one, create an index page ( the page that lists all of the pokemon )

- add links to each of your pages:
  - the index page should have a link for each pokemon to the single pokemon page
  - the index page should have alink to the create new pokemon page
  - the single pokemon page should link to the edit page
  - if you have types, the type page should link to each single pokemon page
  - a single pokemon page should link to the type pages

#### further

- upon creation of a new pokemon, redirect the user to that single pokemon page ( use `response.redirect` )

#### further

On the index page, give the user the ability to sort the list of pokemon by any of the pokemon fields. (hint, some fields are harder than others)

#### further

- validate the input from the user- what happens if they put in a blank field? ( you can make up the rules here- you can allow blank fields or not )

#### further

  - try to restrict the user from creating or editing the name of a pokemon to 1 character - (e.g., there shouldn't be a pokemon named "s")
  - restrict the user from creating a pokemon name that is only numbers

#### further

 - when the user enters a name that is invalid, render the form page with a message about what they did wrong

- how could the ability to change the id of a pokemon screw up your app?
  - restrict the user from changing the id


