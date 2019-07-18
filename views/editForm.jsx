var React = require('react');

class editForm extends React.Component {
    render() {
        return (
        <html>
        <body>
          <div>
            <h1>Enter Details of New Pokemon</h1>
            <form method="POST" action={"/pokemon/" + this.props.index + "?_method=PUT"} >
                <p>Pokemon ID</p>
                <input name="id"  defaultValue={this.props.id}/>
                <p>Pokemon Number</p>
                <input name="num" defaultValue={this.props.num}/>
                <p>Pokemon Name</p>
                <input name="name" defaultValue={this.props.name}/>
                <p>Image URL</p>
                <input name="imgURL" defaultValue={this.props.img}/>
                <p>Height (m)</p>
                <input name="height" defaultValue={this.props.height}/>
                <p>Weight (kg)</p>
                <input name="weight" defaultValue={this.props.weight}/>
                <br /> <br />
                <input type="submit"/>
            </form>
          </div>
        </body>
        </html>
        );
    }
}

module.exports = editForm;