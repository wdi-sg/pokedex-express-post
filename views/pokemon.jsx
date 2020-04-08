var React = require('react');

class Home extends React.Component {

    render() {
        let typelink;
       if(this.props.type2.length == 1) {
            typelink = <a href={"/type/"+this.props.type2}>{this.props.type2}</a>
        }
        // if(this.props.type2.length == 2) {

        // }
    return (
        <html>
            <meta charset="UTF-8"/>
            <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet"/>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"/>
            <link rel="stylesheet" type="text/css" href="./style.css"/>
            <body>
                <div className="container d-flex border mt-5 justify-content-center " style={{height:"200px"}}>
                    <div className="col-3 border d-flex flex-column justify-content-center">
                        <img src={this.props.img} style={{width:"100%"}}/>
                    </div>
                    <div className="col-9 border d-flex flex-column">
                        <div className ="row border d-flex mt-4">
                            <div className="col-5">
                                <div>
                                    Name: {this.props.name}
                                </div>
                                <div>
                                    Num: {this.props.num}
                                </div>
                            </div>
                            <div className="col-5">
                                <div>
                                    Weight: {this.props.weight}
                                </div>
                                <div>
                                    Height: {this.props.height}
                                </div>
                            </div>
                        </div>
                        <div className="row mt-3 ml-1">
                            {this.props.name} is a {this.props.type} Pokemon!
                        </div>
                        <div className="row mt-5 ml-1">
                            <form method="get" action="/">
                                <button type="submit" className="btn btn-secondary d-flex flex-column justify-content-center" style={{height:"20px",width:"100px",fontSize:"12px"}}>Back to Index</button>
                            </form>
                                {typelink}
                        </div>
                    </div>
                </div>
            </body>
        </html>
    );
  }
}

module.exports = Home;