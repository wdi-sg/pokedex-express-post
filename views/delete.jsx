var React = require('react');
var Layout = require('./layout.jsx');

class Home extends React.Component {

  render() {

    const pokemon = this.props;
    //console.log(pokemon);

    var valueAttribute = `/pokemon/${pokemon.id}?_method=DELETE`

    return (
        <Layout>
                <h1 class="display-4 text-center m-5">Delete {pokemon["name"]}</h1>
                    <div>
                        <img src={pokemon.img} style={{width: '200px'}}/>
                        <form method="POST" action={valueAttribute}>
                            <input type="submit" value="Delete"></input>
                        </form>

                    </div>
        </Layout>
    );
  }
}

module.exports = Home;