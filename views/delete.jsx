var React = require('react');

class Delete extends React.Component{
    render(){
        var bodyStyle = {
            backgroundColor:"#00b7ff",
            textAlign : "center"
        }
        var pic = {
            height : "200px",
            width : "200px"
        }
        var url = "/pokemon/"+this.props.pokemonId+"?_method=DELETE";
        var urlHome ="/pokemon";
        return(
            <html>
                <body style={bodyStyle}>
                    <div>
                        <h1>Delete entry</h1>
                        <h1>
                            <p>Pokemon Dexter</p>
                            <img style = {pic} src ={this.props.pokemon.img}/>
                        </h1>
                        <h2>Pokemon Detail</h2>
                        <p>Pokemon Entry: {this.props.pokemon.num}</p>
                        <p>Pokemon: {this.props.pokemon.name}</p>
                        <br/>
                        <p>Are you sure you want to delete this entry?</p>
                        <form method="POST" action={url}>
                        <button type="submits">delete data</button>
                        </form>
                        <p>Return Home</p>
                        <form method="GET" action={urlHome}>
                        <button type="submits">Home</button>
                        </form>
                    </div>
                </body>
            </html>
        );
    };
};

module.exports = Delete;