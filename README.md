# Pokedex Express App (with CRUD)

We will build a web app using Node.js and Express - a Pokedex app.

For this exercise, we will continue building our Pokedex web app - setting up our server to accept POST requests to save user-provided data. We will serve a form to the user for them to send data to our server to create a new pokemon.

The starter code in this repository builds upon the previous exercise's ([pokedex-express](https://github.com/wdi-sg/pokedex-express)).

## Getting Started

1.  Fork and clone this repository to your computer
2.  Run `npm install` to install dependencies
3.  Look in the starter file called `index.js`, run `nodemon` to start local server on port 3000
4.  Open `localhost:3000` on your browser and see the home page

#### Note on comments:

The comments in this file are deliberately verbose meant to orientate you to an Express app for the first time. Feel free to remove any or all comments.

## Deliverables

* Expose a new endpoint that intercepts GET requests to `/pokemon/new`, which responds with a HTML page with a `form` that has these fields: `id`, `num`, `name`, `img`, `height`, and `weight`

* Point the form to submit data to the (`/pokemon`) route using POST method

* (for the `id` and `num` fields, for now, the user will simply choose a number. Obviously if they happen to pick an id that already exists, they will have a bad time. We will have the tools to correct this soon)

* Expose a new endpoint that accepts POST requests to `/pokemon`, which parses the form data and saves the new pokemon data into `pokedex.json`

## Further

* at the root route (GET request) `/` display a list of all the pokemons in the pokedex

* Add a "Sort by name" button to the homepage (`/` route) that when clicked, sends a GET request with a query parameter specifying "?sortby=name" ( this requests a whole new page )
  - (hint) this button should be a subit button in a form with method GET. You would need to add an input that creates the appropriate request.

* Implement this sort functionality as a drop down (`select` `input`) of all the sorting fields the user can choose to sort by.

* Instead of saving `id` and `num` as random values input by the user via the form, implement the logic that guarantees the uniqueness of `id` and `num` of every newly created pokemon
  * eg. if last pokemon in the `pokedex.json` has `"id": 151` and `"num": "151"`, the new pokemon object could have `"id": 152` and `"num": "152"`
  * Hint: You might consider adding a new key value pair in `pokedex.json`, like `"lastKey": 151`
  * are there any other ways to make a unique id for something? Remember that it is technically possible for 2 requests to be made to your server at almost the exact same time. What would happen when request 1 comes in and you begin to write to the disk and request 2 comes in and starts *and* finishes writing to the disk before request 1 finished writing to the disk?
  
* this pokedex is a simplified one, but how would you implement keeping track of the pokemon type?
 * One solution would be to have a form on each `pokemon/:id` (individual pokemon) pages. This post request would put a single pokemon type into that specific pokemon.
 * How would you create and save the *set* of specific pokemon types that a user could input into a pokemon? How would you display them to the user and let them submit them in a form? A select input perhaps?