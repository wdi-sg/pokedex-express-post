# Post - Part 2

- add the ability to edit the data for a given pokemon
  - install react templates for your app
  - add a form at the path: `/pokemon/:id/edit`
  - add each field as an input and pre-populate the current data for that pokemon
  - the form should make a request ( the form action ) to the correct route ( a PUT request to `/pokemon/:id` )

- change the rest of your app over to react templates

### further

- how could the ability to change the id of a pokemon screw up your app?
  - restrict the user from changing the id

- validate the input from the user- what happens if they put in a blank field? ( you can make up the rules here- you can allow blank fields or not )
  - try to restrict the user from creating or editing the name of a pokemon to 1 character - (e.g., there shouldn't be a pokemon named "s")

- use bootstrap in your app- you won't have to write any CSS code. Simply use the CSS classes already provided to you by bootstrap.

- this pokedex is a simplified one, but how would you implement keeping track of the pokemon type?
 - One solution would be to have a form on each `pokemon/:id` (individual pokemon) pages. This post request would put a single pokemon type into that specific pokemon.
 - How would you create and save and edit the *set* of specific pokemon types that a user could input into a pokemon? How would you display them to the user and let them submit them in a form? A select input perhaps?
