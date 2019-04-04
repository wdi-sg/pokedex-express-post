var React = require('react');
var DefaultLayout = require('./layouts/default');

class Type extends React.Component {
  render() {
    let typeElements = this.props.types.map((o) => {
        return <label><input type="checkbox" name="type" value={o}/><span>{o}</span></label>
    });

    return (
        <span>
            {typeElements}
        </span>
    );
  }
}

class Add extends React.Component {
  render() {
    return (
            <DefaultLayout title="Add New Pokemon">
                <form className="add" method="POST" action="/pokemon">
                        <h1>Add New Pokemon</h1>
                        Name: <input name="name"/><br/>
                        Height: <input name="height"/><br/>
                        Weight: <input name="weight"/><br/>
                        Pokemon Type: <Type types={this.props.uniquePokemonType}/><br/><br/>
                        <input className="btn btn-success" type="submit" value="Add new Pokemon"/>
                </form>
                <a className="btn btn-info back" href="/pokemon">Back to Pokedex</a>
            </DefaultLayout>
    );
  }
}

module.exports = Add;