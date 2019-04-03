var React = require('react');

class Home extends React.Component {
  render() {

    let actionAttribute = `/pokemon`;

    return (
        <body>
        <h1>Create a new pokemon!</h1><br/>
        <h1>Please enter the pokemon details</h1>
        <form method="POST" action={actionAttribute}>
        Enter id: <input type="text" name="id"/><br/>
        Enter num: <input type="text" name="num"/><br/>
        Enter name: <input type="text" name="name"/><br/>
        Enter img: <input type="text" name="img"/><br/>
        Enter height: <input type="text" name="height"/><br/>
        Enter weight: <input type="text" name="weight"/><br/>
        <input type="submit" value="Submit"/>
        </form>
        </body>
    );
  }
}

module.exports = Home;