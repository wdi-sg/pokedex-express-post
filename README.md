MEOW


# Pokedex Express App (with CRUD)

We will build a web app using Node.js and Express - a Pokedex app.

For this exercise, we will continue building our Pokedex web app - setting up our server to accept POST requests to save user-provided data. We will serve a form to the user for them to send data to our server to create a new pokemon.

The starter code in this repository builds upon the previous exercise's ([pokedex-express](https://github.com/wdi-sg/pokedex-express)).

## Getting Started

1.  Fork and clone this repository to your computer
2.  Run `npm install` to install dependencies
3.  Look in the starter file called `index.js`, run `nodemon` to start local server on port 3000
4.  Open `localhost:3000` on your browser and see the home page
5.  Install the react jsx express libraries described in the gitbook

#### Note on comments:

The comments in this file are deliberately verbose meant to orientate you to an Express app for the first time. Feel free to remove any or all comments.

## Deliverables

* Expose a new endpoint that intercepts GET requests to `/pokemon/new`, which responds with a HTML page with a `form` that has these fields: `id`, `num`, `name`, `img`, `height`, and `weight`

* Point the form to submit data to the (`/pokemon`) route using POST method

* (for the `id` and `num` fields, for now, the user will simply choose a number. Obviously if they happen to pick an id that already exists, they will have a bad time. We will have the tools to correct this soon)

* Expose a new endpoint that accepts POST requests to `/pokemon`, which parses the form data and saves the new pokemon data into `pokedex.json`

#### RESTful Routing

RESTful routing is a scheme to structure your URLS that removes duplication, and looks clean. For each type of resource, you can specify a set of routes easily.

| **URL** | **HTTP Verb** |  **Action**| **Description** |
|------------|-------------|------------|----------------|
| /photos/         | GET       | index | Display a list of all photos |
| /photos/new      | GET       | new   | Display a form for creating a photo |
| /photos          | POST      | create | Accept a request for creating a photo |
| /photos/:id      | GET       | show | Display a page for a single photo |
| /photos/:id/edit | GET       | edit | Display a form for editing a specific photo |
| /photos/:id      | PATCH/PUT | update | Accept a request for new data for a specific photo |
| /photos/:id      | DELETE    | destroy | Accept a request to delete a specific photo |


[Read more on wiki](http://en.wikipedia.org/wiki/Representational_state_transfer)


## Further

* create `jsx` files for every page your app displays

* validate the user's input data. If the user makes a mistake (i.e., the name of the pokemon is empty) render the form instead. Display the error that they made and how they can correct it.

* Add a "Sort by name" button to the homepage (`/` route) that when clicked, sends a GET request with a query parameter specifying "?sortby=name" ( this requests a whole new page )
  - (hint) this button should be a subit button in a form with method GET. You would need to add an input that creates the appropriate request.

* Implement this sort functionality as a drop down (`select` `input`) of all the sorting fields the user can choose to sort by.

* Add a "Sort by weight" button to the homepage (`/` route) that when clicked, sends a GET request with a query parameter specifying "?sortby=weight" ( this requests a whole new page )

* Add a "Sort by height" button to the homepage
  - what do you need to write to abstract the idea of *sorting* in your code? What is the most elegant way to sort by any field in the pokedex?
  
* restrict the user from creating a pokemon with a id, number and name that already exists

* validate all of the incoming user data. Restrict values to reasonable numbers (i.e. height less that 100, etc.) What is the best structure for your app to have this validation code?

* Instead of saving `id` and `num` as random values input by the user via the form, implement the logic that guarantees the uniqueness of `id` and `num` of every newly created pokemon
  * eg. if last pokemon in the `pokedex.json` has `"id": 151` and `"num": "151"`, the new pokemon object could have `"id": 152` and `"num": "152"`
  * Hint: You might consider adding a new key value pair in `pokedex.json`, like `"lastKey": 151` - in this system you *will not* have to worry about ids being consecutive integers.
  * are there any other ways to make a unique id for something? Remember that it is technically possible for 2 requests to be made to your server at almost the exact same time. What would happen when request 1 comes in and you begin to write to the disk and request 2 comes in and starts *and* finishes writing to the disk before request 1 finished writing to the disk?