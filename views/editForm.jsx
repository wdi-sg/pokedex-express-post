var React = require('react');

class editForm extends React.Component {
    render() {
        return (

        <html>
        <body>
            <div>
                <h1>Updated details of pokemon</h1>
                <form method="POST" action={"/pokemon/" + this.props.index + "?_method=PUT"}>
                    <p> Pokemon ID</p>
                    <input name="id" value ={this.props.id}/>
                    <p>Pokemon Number </p>
                    <input name="num" value ={this.props.num}/>
                    <p>Pokemon Name</p>
                    <input name="name" value= {this.props.name}/>
                    <p>Image URL</p>
                    <input name="img" value = {this.props.img}/>
                    <p>Height</p>
                    <input name="height" value = {this.props.height}/>
                    <p>Weight</p>
                    <input name="weight" value = {this.props.weight}/>
                    <br/>
                    <input type="submit"/>
                </form>
            </div>
        </body>
        </html>
        );

    }
}

module.exports = editForm;