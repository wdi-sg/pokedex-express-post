var React = require('react');
class EditPokemon extends React.Component {
render() {
    let id = this.props.id - 1
    let actionURL = "/pokemon/"+id+"?_method=delete"
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
            <div className="col">
                <form method="POST" action={actionURL}>
                    <div style={{margin: "30px auto 5px auto"}}>
                        <label htmlFor="name" style={{color: "red"}}>Name</label>
                        <input type="text" style={{fontSize: 12}} value={this.props.name} readOnly name="name" />
                    </div>
                    <input type="submit" value="Delete!" readOnly className="btn btn-danger"/>
                </form>
            </div>
        </div>
    </div>
</body>

</html>
);
}
}

module.exports = EditPokemon;