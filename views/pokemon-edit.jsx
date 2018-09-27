var React = require('react');

class Edit extends React.Component {
    render() {
        console.log("THIS.PROPS: ", this.props.pokemon);
        let pokemonID = this.props.pokemon.id;
        let actionUrl = '/pokemon/' + pokemonID + '?_method=PUT';


        let inputType = 'button';
        let formAction = '/pokemon';
        let selectName = 'sortby';
        let valueName = 'name';
        let valueId = 'id';
        let valueHeight = 'height';
        let valueWeight = 'weight';
        let submitInput = 'submit';

        return (
          <div>
            <h1>Edit pokemon!</h1>
            <form method="POST" action={actionUrl}>
                <p>Id</p>
                <input name="id" value={this.props.pokemon.id}/>
                <p>Name</p>
                <input name="name" value={this.props.pokemon.name}/>
                <p>Height</p>
                <input name="height" value={this.props.pokemon.height}/>
                <br/>
                <input type="submit" />
            </form>
          </div>
        );
    }
}

module.exports = Edit;