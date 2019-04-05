var React = require('react');
var Layout = require('./layout.jsx')

class New extends React.Component {

  render() {

    const pokemon = this.props;
    //console.log(pokemon);

    var valueAttribute = `/pokemon`

    return (
        <Layout>
            <h1 class="display-4 text-center m-5">Add a new Pokémon</h1>
            <form method="POST" action={valueAttribute}>

                    <div class="row d-flex justify-content-center m-2">

                        <div class="col-4">
                            Name
                            <input type="text" name="name" class="form-control" autofocus/>
                        </div>

                         <div class="col-4">
                            Image link
                            <input type="text" name="img" class="form-control"/>
                        </div>

                    </div>

                    <div class="row d-flex justify-content-center m-2">

                        <div class="col-4">
                            Height
                            <input type="text" name="height" class="form-control"/>
                        </div>

                        <div class="col-4">
                            Weight
                            <input type="text" name="weight" class="form-control"/>
                        </div>

                    </div>

                    <button class="btn btn-primary mx-auto d-block m-4" type="submit">Submit form</button>

                </form>
        </Layout>
    );
  }
}

module.exports = New;