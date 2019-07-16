var React = require('react');
var Layout = require('./layout')

class Edit extends React.Component {

    render () {

        const actionAttribute = `/pokemon/${this.props.id}?_method=put`;

        return (<Layout>
            <h1>Edit Pokemon</h1>
            <div class="container">
                <div class="col-6">
                    <form method="POST" action={actionAttribute}>
                        <div class="form-group">
                            <label for="pokemonName">Name</label>
                            <input type="text" class="form-control form-control-lg" value={this.props.name} />
                        </div>

                        <div class="form-group">
                            <label for="pokemonImage">Image</label>
                            <input type="text" class="form-control form-control-lg" value={this.props.img} />
                        </div>

                        <div class="form-group">
                            <label for="pokemonHeight">Height</label>
                            <input type="text" class="form-control form-control-lg" value={this.props.height} />
                        </div>

                        <div class="form-group">
                            <label for="pokemonImage">Weight</label>
                            <input type="text" class="form-control form-control-lg" value={this.props.weight} />
                        </div>

                        <button type="submit" class="btn btn-primary">Edit</button>
                    </form>
                </div>
            </div>
        </Layout>);  // end of return

    }  // end of render
} // end of class home


module.exports = Edit;