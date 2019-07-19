var React = require('react');

class Home extends React.Component {
  render() {
    var url = "/pokemon/"+ "?_method=POST";
    return (
      <html>
                <head>
                <style>
                    body{
                        display=flex;
                    }
                    div{
                        width:150px;
                        display:flex;
                        flex-direction:column;
                        justify-content:center;
                        align-items: center;
                        float: left;
                    }
                    img{
                        display:flex;
                    }
                </style>
                </head>
                <body>
                <h2>List of Pokemon</h2>
                    <form>
                        <select name="sortby">
                            <option disabled selected>Select an option</option>
                            <option value="id">ID</option>
                            <option value="name">Name</option>
                            <option value="weight">Weight</option>
                            <option value="height">Height</option>
                        </select>
                        <button>Sort by</button>
                    </form>
                    <h3>Create new Pokemon</h3>
                </body>
                </html>;
    );
  }
}

module.exports = Home;