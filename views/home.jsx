var React = require('react');

class Home extends React.Component {
  render() {
    console.log(this.props)

    return (
        <html>
            <body>
            <form action="/pokemon/pokemon.id?_method=PUT" method="POST" >
                <div className="pokemon-attribute">
                    id: <input name="id" type="text" value={this.props.id}/>
                    num: <input name="num" type="text" value={this.props.num}/>
                    name: <input name="name" type="text" value={this.props.name}/>
                    img: <input name="name" type="text" value={this.props.img}/>
                    <input type="submit"/>
                </div>
            </form>
            </body>
        </html>
    );
  }
}

module.exports = Home;