var React = require('react');

class EditForm extends React.Component {
    render() {
        return (
            <html>
        <body>
          <div>
            <h1>edit pokemon: {this.props.id}</h1>
            <form action={"/pokemon/"+this.props.id+'?_method=put'} method="POST">
                <p>ID:</p>
                <input type="number" name="id" value={this.props.id}/>
                <p>Number:</p>
                <input type="number" name="num" value={this.props.num}/>
                <p>Name:</p>
                <input type="text" name="img" value={this.props.name}/>
                <p>Img</p>
                <input type="text" name="name" value={this.props.img}/>
                <p>height:</p>
                <input type="text" name="height" value={this.props.height}/>
                <p>weight:</p>
                <input type="text" name="weight" value={this.props.weight}/>

                <p>
                    <input type="submit"/>
                </p>
            </form>
          </div>
        </body>
      </html>
            )
    }
}


module.exports = EditForm;