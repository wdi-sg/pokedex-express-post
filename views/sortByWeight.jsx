var React = require('react');

class Home extends React.Component {

  render() {
    //code logic goes here
    //variables defined for sorting logic
    //form to sort by values
    var form =
      <form method="GET" action="/pokemon">
      <select name ="sortby" action="/" onChange="this.form.submit()">
        <option disabled selected value>Select an option</option>
        <option value="weight">Sort by weight</option>
        <option value="height">Sort by height</option>
        <option value="name">Sort by name</option>
      </select>
      <input type="submit" value="submit"/>
      </form>
      const pokemon = this.props.data.map(obj=>{
        return <li>{obj.name} - {obj.weight}</li>
      })

    return (
      <html>
        <body>
          <div>
            <h1>A list of all pokemon sorted by name</h1>
            <h1>{form}</h1>
          </div>
          <div>
            <ul>{pokemon}</ul>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Home;
