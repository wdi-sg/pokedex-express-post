var React = require('react');

class Pokemon extends React.Component {
  render() {

    return (

    <html>
        <head>
            <meta charset="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
            <title>GA Pokedex</title>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous"/>
            <link href="https://fonts.googleapis.com/css?family=Thasadith" rel="stylesheet"/>
            <link rel="stylesheet" type="text/css" href="http://10.193.240.192:8080/style.css"/>
        </head>

        <body>

      <div>
        <img src={this.props.img}/>
        <ul>
            <li>{"Number: #" + this.props.num}</li>
            <li>{"Name: " + this.props.name}</li>
            <li>{"Height: " + this.props.height}</li>
            <li>{"Weight: " + this.props.weight}</li>
            <li>{"Type: " + this.props.type}</li>
        </ul>
        <form name="type" method="POST" action={'/pokemon/' + this.props.id + '?_method=PUT'}>
          <h2>Name</h2>
          <input type="" name="id" value={this.props.id} style={{display: 'none'}}/>
          <input type="" name="name" placeholder={this.props.name}/>
          <h2>Img</h2>
          <input type="" name="img" placeholder={this.props.img}/>
          <h2>Height</h2>
          <input type="" name="height" placeholder={this.props.height}/>
          <h2>Weight</h2>
          <input type="" name="weight" placeholder={this.props.weight}/>
          <h2>Type</h2><br/>
            <select name='type'>
                 <option value='normal'>Normal</option>
                 <option value='fire'>Fire</option>
                 <option value='water'>Water</option>
                 <option value='electric'>Electric</option>
                 <option value='grass'>Grass</option>
                 <option value='ice'>Ice</option>
                 <option value='fighting'>Fighting</option>
                 <option value='poison'>Poison</option>
                 <option value='ground'>Ground</option>
                 <option value='flying'>Flying</option>
                 <option value='psychic'>Psychic</option>
                 <option value='bug'>Bug</option>
                 <option value='rock'>Rock</option>
                 <option value='ghost'>Ghost</option>
                 <option value='dragon'>Dragon</option>
                 <option value='dark'>Dark</option>
                 <option value='steel'>Steel</option>
                 <option value='fairy'>Fairy</option>
            </select>
            <input type='submit' className="btn btn-primary"/>
        </form>
        <form name='delete' method="POST" action={'/pokemon/' + this.props.id + '?_method=DELETE'}>
                <input type="" name="id" value={this.props.id} style={{display: 'none'}}/>
                <input value="Delete Pokemon"  type='submit' className="btn btn-primary"/>
        </form>
      </div>
    </body>
    </html>
    );
  }
}

module.exports = Pokemon;