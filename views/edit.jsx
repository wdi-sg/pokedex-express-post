var React = require('react');
class EditPokemon extends React.Component {
render() {
    let id = this.props.id - 1
    let actionURL = "/pokemon/"+id+"?_method=put"
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
                    <div style={{textAlign: "right", width: "25%", margin: "10px auto 5px auto"}}>
                        <label htmlFor="id">ID: </label>    
                        <input type="text" value={this.props.id} onChange="" name="id" />
                    </div>
                    <div style={{textAlign: "right", width: "25%", margin: "10px auto 5px auto"}}>
                        <label htmlFor="num">Number: </label>
                        <input type="text" value={this.props.num} onChange="" name="num" />
                    </div>
                    <div style={{textAlign: "right", width: "25%", margin: "10px auto 5px auto"}}>
                        <label htmlFor="name">Name: </label>
                        <input type="text" value={this.props.name} onChange="" name="name" />
                    </div>
                    <div style={{textAlign: "right", width: "25%", margin: "10px auto 5px auto"}}>
                        <label htmlFor="img">Image: </label>
                        <input type="text" value={this.props.img} onChange="" name="img" />
                    </div>
                    <div style={{textAlign: "right", width: "25%", margin: "10px auto 5px auto"}}>
                        <label htmlFor="height">Height: </label>
                        <input type="text" value={this.props.height} onChange="" name="height" />
                    </div>
                    <div style={{textAlign: "right", width: "25%", margin: "10px auto 5px auto"}}>
                        <label htmlFor="weight">Weight: </label>
                        <input type="text" value={this.props.weight} onChange="" name="weight" />
                    </div>
                    <input type="submit" value="Edit!" readOnly className="btn btn-outline-dark" style={{marginLeft: "635px"}}/>
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