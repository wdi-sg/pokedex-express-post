var React = require('react');

class Edit extends React.Component {
  render() {

//bunch of JS code
//establish var = link
//establish variables/functions/conditionals
    let data = this.props;

    return (
      <html>
        <body>
          <div>
            <h1>so the pokemon has grown...</h1>
                                                                {/* <button>hello</button>
                                                                <a href="http://google.com">click me</a> */}
            <h3>Editing {data.pokemon.name}</h3>
            <img src={data.pokemon.img} alt={data.pokemon.name}/>
            <form action={"/pokemon"+data.index+'?_method=put'} method="POST">
                Enter Pokemon Information Here:
                <br></br>
                <div><p></p></div>
                <input type="number" name="id" placeholder="id" value={data.pokemon.id}/>
                <br></br>
                <input type="number" name="num" placeholder="num" value={data.pokemon.num}/>
                <br></br>
                <input type="text" name="name" placeholder="name" value={data.pokemon.name}/>
                <br></br>
                <input type="text" name="img" placeholder="img" value={data.pokemon.img}/>
                <br></br>
                <input type="text" name="height" placeholder="height" value={data.pokemon.height}/>
                <br></br>
                <input type="text" name="weight" placeholder="weight" value={data.pokemon.weight}/>
                <br></br>
                <input type="submit" value="Submit"/>
            </form>
                                                                {/* <form action="/form" method="POST">
                                                                    Just Name:
                                                                    <input type="text" name="hello"/>
                                                                    <input type="submit" value="Submit"/>
                                                                </form> */}
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Edit;