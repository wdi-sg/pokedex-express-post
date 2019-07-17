var React = require('react');

class Mainpage extends React.Component {
    render() {
        let obj = this.props.obj;





        return (
            <html>
                <head>
                    <meta charset="UTF-8"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no"/>
                    <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
                    <title>Document</title>
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous"/>
                </head>
                <body>
                    <div className="container bg-primary">
                        <div  className="row">
                            <div className="col">poke 1</div>
                            <div className="col">poke 2</div>
                            <div className="col">poke 3</div>
                            <div className="col">poke 4</div>
                            <div className="col">poke 5</div>
                            <div className="col">poke 6</div>        
                            <div className="col">poke 7</div>
                            <div className="col">poke 8</div>
                            <div className="col">poke 9</div>        
                        
                        </div>
                    </div>



                    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
                    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
                </body>
            </html>



        );
    };
};

module.exports = Mainpage;