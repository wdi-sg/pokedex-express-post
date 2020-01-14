var React = require('react');

class New extends React.Component {
    render() {
        return (
            <html>
                <head>
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous"/>
                </head>
                <body>
                    <div class="container">
                        <h1>Input Data for New Pokemon Here</h1>
                        <div class="col-6">
                            <form action="/pokemon" method="POST">
                                <div class="form-group">
                                    <label>Name :</label>
                                    <input type="text" class="form-control" placeholder="Pokemon Name" name="name"/>
                                </div>
                                <div class="form-group">
                                    <label>ID :</label>
                                    <input type="number" class="form-control" placeholder="ID" name="id"/>
                                </div>
                                <div class="form-group">
                                    <label>Num :</label>
                                    <input type="text" class="form-control" placeholder="eg. #152" name="num"/>
                                </div>
                                <div class="form-group">
                                    <label>Img :</label>
                                    <input type="text" class="form-control" placeholder="ID" name="img"/>
                                </div>
                                <div class="form-group">
                                    <label>Height :</label>
                                    <input type="text" class="form-control" placeholder="Height" name="height"/>
                                </div>
                                <div class="form-group">
                                    <label>Weight :</label>
                                    <input type="text" class="form-control" placeholder="Weight" name="weight"/>
                                </div>
                                <button type="submit" class="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </body>
            </html>
        );
    }
}

module.exports = New;