var React = require('react');

class Pokemon extends React.Component {
    render() {
        return (
            <html>
                <head>
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous"/>
                </head>
                <body>
                    <div class="container">
                        <h1>Pokemon Data</h1>
                        <div class="pokemonData">
                            <div>ID : {this.props.id}</div>
                            <div>Num : {this.props.num}</div>
                            <div>Name : {this.props.name}</div>
                            <img src={this.props.img} alt="{this.props.name} img"/>
                            <div>Height : {this.props.height}</div>
                            <div>Weight: {this.props.weight}</div>
                        </div>
                    </div>
                </body>
            </html>
        );
    }
}

module.exports = Pokemon;