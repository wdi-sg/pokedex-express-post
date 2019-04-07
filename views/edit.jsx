var React = require('react');
var Layout = require('./layout.jsx')

class Edit extends React.Component {

    render() {


    const pokemon = this.props;
    //console.log(pokemon);

    var valueAttribute = `/pokemon/${pokemon.id}?_method=PUT`
    var name = `${pokemon.name}`

        return (
            <Layout>
                <img class="mx-auto d-block mt-5" src={pokemon.img}/>

                <h1 class="display-4 text-center m-0 mb-4">{pokemon.name}</h1>
                <form method="POST" action={valueAttribute}>

                    <div class="row d-flex justify-content-center m-2">

                        <div class="col-4">
                            Name
                            <input type="text" name="name" class="form-control" placeholder="Name" value={pokemon.name}/>
                        </div>

                        <div class="col-4">
                            ID
                            <input class="form-control-plaintext" type="text" placeholder={pokemon.id} readonly/>
                        </div>

                    </div>

                    <div class="row d-flex justify-content-center m-2">

                        <div class="col-4">
                            Num
                            <input type="text" name="num" class="form-control-plaintext" placeholder="Number" value={pokemon.num} readonly/>
                        </div>

                        <div class="col-4">
                            Image link
                            <input type="text" name="img" class="form-control" placeholder="Weight" value={pokemon.img}/>
                        </div>

                    </div>

                    <div class="row d-flex justify-content-center m-2">

                        <div class="col-4">
                            Height
                            <input type="text" name="height" class="form-control" placeholder="Number" value={pokemon.height}/>
                        </div>

                        <div class="col-4">
                            Weight
                            <input type="text" name="weight" class="form-control" placeholder="Weight" value={pokemon.weight}/>

                        </div>

                    </div>

                    <button class="btn btn-primary mx-auto d-block m-4" type="submit">Submit form</button>



                </form>
            </Layout>
        );
    }
}



module.exports = Edit;