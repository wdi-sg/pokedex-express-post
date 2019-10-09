var React = require('react');
class Delete extends React.Component {
  render() {
    let data = this.props;
    return (
      <html>
        <body>
          <div>
            <div><h3>Id: { data.pokemon.id }</h3></div>
            <div><h3>Number: { data.pokemon.num }</h3></div>
            <div><h1>Name: { data.pokemon.name }</h1></div>
            <div><img src={ data.pokemon.img }/></div>
            <div><h3>Height: { data.pokemon.height }</h3></div>
            <div><h3>Weight: { data.pokemon.weight }</h3></div>
            <form action={"/pokemon/"+data.index+'?_method=delete'} method="POST">
              <div><h1>PRESS TO DELETE</h1></div>
              <div><input type="submit" value="DELETE"/></div>
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Delete;