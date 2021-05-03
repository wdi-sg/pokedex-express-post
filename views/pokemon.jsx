var React = require('react');
class NewPokemon extends React.Component {
render() {
    const pokemon = this.props.pokemon.map( pokemon => {
        return <li>{pokemon}</li>
        });


return (

<html>

<head>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
        integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous" />
    <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js"
        integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossOrigin="anonymous">
    </script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
        integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossOrigin="anonymous">
    </script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"
        integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossOrigin="anonymous">
    </script>
</head>

<body>
    <div className="container">
        <div className="row">
            <div className="col-sm-3">
                <ul style={{margin: 30}}>
                    {pokemon}
                </ul>
            </div>

        <div style={{margin: 35}}>
            <div className="col-9">
                <form method="get" action="/pokemon/sort">
                    <input type="submit" value="Sort!" className="btn btn-danger"></input>
                    <input type="hidden" name="sortby" value="name"></input>
                </form>
            </div>
        </div>


        </div>
    </div>
</body>

</html>
);
}
}

module.exports = NewPokemon;