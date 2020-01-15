var React = require('react');
class Sorted extends React.Component {
render() {
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
    <div className="text-center">
        <h1>Welcome to the Pokedex!</h1>
    </div>
    <div className="list-group text-center">
        <a href="/pokemon" className="list-group-item list-group-item-action list-group-item-primary">Show me all
            Pokemon</a>
        <a href="/pokemon/sort?sortby=name" className="list-group-item list-group-item-action list-group-item-secondary">Show me all Pokemon sorted by name</a>
        <a href="/pokemon/1" className="list-group-item list-group-item-action list-group-item-success">Show me a
        single Pokemon by ID</a>
        <a href="/pokemon/new" className="list-group-item list-group-item-action list-group-item-info">Create a new Pokemon</a>
        <a href="/pokemon/1/edit" className="list-group-item list-group-item-action list-group-item-danger">Edit a Pokemon
            entry (change ID in URL)</a>
        <a href="/pokemon/1/delete" className="list-group-item list-group-item-action list-group-item-warning">Delete a Pokemon entry
            (change ID in URL)</a>
    </div>
</body>

</html>
);
}
}

module.exports = Sorted;