var React = require('react');
class Pokepages extends React.Component {
  render() {
    // console.log( "INSIDE jsx", this.props );
    let formUrl = "/pokemon_edit/"+this.props.id+"?_method=put";
    return (
      <html>
        <body>
          <div>
            <h1>Pokemon Edit Form</h1>
            <form action={formUrl} method="POST">
                <p>
                    ID <input name="id" value={this.props.id}/>
                    Name <input name="name" value={this.props.name}/>
                    Img <input name="img" value={this.props.img}/>
                    Height <input name="height" value={this.props.height}/>
                    Weight<input name="weight" value={this.props.weight}/>
                </p>
                <p>
                    <input type="submit"/>
                </p>
            </form>
          </div>
        </body>
      </html>
    );
  }
}
module.exports = Pokepages;