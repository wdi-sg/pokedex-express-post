var React = require('react');

class Home extends React.Component {

    render() {
        //console.log(typeof this.props)

        let pokemonlist = this.props.pokemon.map ((element) => {
        return (<div className="border text-center" style={{width:"25%"}}>
            {element.name}<br/>
                    <a href={"/pokemon/id/"+element.id}><img src={element.img}/></a>
                </div>)
        })

    return (
        <html>
            <meta charset="UTF-8"/>
            <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet"/>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"/>
            <link rel="stylesheet" type="text/css" href="css/style.css"/>
            <body>
                <div>
                    <div>
                        <form method="get" action="/pokemon/test">
                            <button type="submit">Continue</button>
                            <input type="text" name="id"/><br/>
                        </form>
                        <form method="get" action="/pokemon/indexlist">
                            <button type="submit">Continue</button>
                        </form>
                        <form method="get" action="/pokemon/createnew">
                            <button type="submit">Continue</button>
                        </form>
                        <form method="get" action="/pokemon/edit">
                            <button type="submit">Continue</button>
                        </form>
                        <div className="container">
                            <div className="container d-flex border flex-row flex-wrap">

                                    {pokemonlist}

                            </div>
                        </div>
                    </div>
                </div>
            </body>
        </html>
    );
  }
}

module.exports = Home;