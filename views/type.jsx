var React = require('react');

class Home extends React.Component {

    render() {
        let pokemontype = this.props.pokemon.map ((element) => {
        return (
            <div className="border text-center" style={{width:"25%"}}>
                {element.name}<br/>
                <a href={"/pokemon/id/"+element.id}><img src={element.img}/></a>
            </div>
            )
        })

    return (
        <html>
            <meta charset="UTF-8"/>
            <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet"/>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"/>
            <link rel="stylesheet" type="text/css" href="./style.css"/>
            <body>
                <div className="container mt-5">
                    <div className = "row">

                        {pokemontype}

                    </div>
                    <div>
                    </div>
                </div>
            </body>
        </html>
    );
  }
}

module.exports = Home;