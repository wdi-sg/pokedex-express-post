const React = require('react');

class Form extends React.Component {
  render() {
    return (
        <body>
            <h2>Create a New Pokemon</h2>
                <form method="POST" action="/pokemon">
                <input type="text" name="id" placeholder="id"></input>
                <br></br><br></br>
                <input type="text" name="num" placeholder="num"></input>
                <br></br><br></br>
                <input type="text" name="name" placeholder="name"></input>
                <br></br><br></br>
                <input type="text" name="img" placeholder="img"></input>
                <br></br><br></br>
                <input type="text" name="height" placeholder="height"></input>
                <br></br><br></br>
                <input type="text" name="weight" placeholder="weight"></input>
                <br></br><br></br>
                <h4>{this.props.message}</h4>
                <button type="submit">Create!</button>
            </form>
        </body>
    );
  }
}

module.exports = Form;