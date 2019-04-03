var React = require('react');

class Home extends React.Component {
  render() {

    let allPokemon = this.props.pokemon.map( (o) => {
        return <li>
                    { o.name } - &nbsp;
                    <a href={`/pokemon/${ o.id }`}>view</a>&nbsp;&nbsp;
                    <a href={`/pokemon/${ o.id }/edit`}>edit</a>&nbsp;&nbsp;
                    <a href={`/pokemon/${ o.id }/delete`}>delete</a>
              </li>;
    });

    return (
        <body>
            <form>
                <input type="submit" value="Sort Pokemon       "/>
                <select name="sortby">
                    <option value="id">id</option>
                    <option value="name">name</option>
                </select>
            </form>

            <form action="/pokemon/new">
                <input type="submit" value="Add new Pokemon"/>
            </form>
            <ul>
                { allPokemon }
            </ul>
        </body>
    );
  }
}

module.exports = Home;