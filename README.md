# Pokedex Express App (with POST request)

We will build our first web app using Node.js and Express - a Pokedex app.

For this exercise, we will continue building our Pokedex web app - setting up our server to accept POST requests to save user-provided data and providing relevant responses.

The starter code in this repository builds upon the previous exercise's ([pokedex-express](https://github.com/wdi-sg/pokedex-express)).

## Getting Started

1.  Fork and clone this repository to your computer
2.  Run `yarn install` to install dependencies
3.  Look in the starter file called `index.js`, run `nodemon` to start local server on port 3000
4.  Open `localhost:3000` on your browser and see the home page

#### Note on comments:

The comments in this file are deliberately verbose meant to orientate you to an Express app for the first time. Feel free to remove any or all comments.

## Deliverables

Use the data in `pokedex.json` and return a response with details about the requested Pokemon. Specifically:

* Go through `pokedex.json` to understand how the data is structured. Where are all the pokemon data stored? (As usual, using a JSON parser for human-readable JSON is a good idea. There are many, [here](http://jsonprettyprint.com/) is one.)


## Further

* Handle the case where an invalid pokemon name is provided (eg. `/names/Deadpool`). Return a HTML page with a `p` tag that says "Could not find information about `<pokemon_name>` - Is that a new pokemon? Gotta catch em' all!" (replace `<pokemon_name>` with the requested for pokemon name)
