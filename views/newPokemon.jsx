var React = require('react');
var Layout = require('./layout')

class NewPokemon extends React.Component {

    render () {

        return (<Layout>
            <h1>New Pokemon</h1>
            <div class="container">
                <div class="col-6">
                    <form method="POST" action="/newPokemon">

                        <div class="form-group">
                            <label for="pokemonId">ID</label>
                            <input type="text" class="form-control form-control-lg" value={this.props.lastId} name="id" disabled/>
                        </div>

                        <div class="form-group">
                            <label for="pokemonNum">Num</label>
                            <input type="text" class="form-control form-control-lg" value={this.props.lastNum} name="num" disabled/>
                        </div>
                        <div class="form-group">
                            <label for="pokemonName">Name</label>
                            <input type="text" class="form-control form-control-lg" name="name" />
                        </div>

                        <div class="form-group">
                            <label for="pokemonImage">Image</label>
                            <input type="text" class="form-control form-control-lg" name="img" />
                        </div>

                        <div class="form-group">
                            <label for="pokemonHeight">Height</label>
                            <input type="text" class="form-control form-control-lg" name="height" />
                        </div>

                        <div class="form-group">
                            <label for="pokemonImage">Weight</label>
                            <input type="text" class="form-control form-control-lg" name="weight" />
                        </div>

                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </Layout>);  // end of return

    }  // end of render
} // end of class home


module.exports = NewPokemon;