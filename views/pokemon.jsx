var React = require('react');

class Pokemon extends React.Component {
  render() {

    return (
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
      </div>
    );
  }
}

// '<form method="POST" action="/pokemon/'+pokemon.id+'?_method=PUT">'+
//   '<div class="pokemon-attribute">'+
//     'id: <input name="id" type="text" value="'+pokemon.id+'"/>'+
//     'name: <input name="name" type="text" value="'+pokemon.name+'"/>'+
//   '</div>'+
// '</form>';


module.exports = Pokemon;