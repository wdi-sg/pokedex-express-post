var React = require('react');
class pokemon extends React.Component {
  render() {
const type=this.props.type.map(type=>{
    return <li  style={{display: "inline", margin:"0px 80px"}} ><a href={"/pokemon/type?options="+type}>{type}</a></li>
});
    return (
      <html>
      <link rel={"stylesheet"} href={"https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"} integrity={"sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"} crossorigin={"anonymous"}></link>

        <body>
          <div class={"container"}>
            <div class={"row"}>
                <div class={"col-md-12 text-center border p-3 mt-4"}>
                    <h1>{this.props.name}</h1>
                </div>

            </div>

             <div class={"row"}>
                <div class={"col-md-4 text-center border p-2"}>
                    <img style={{width: "75%"}} src={this.props.img} />
                </div>
                <div class={"col-md-8 border p-0"}>
                <div class={"container"}>
                    <div class={"row"} >
                        <div class={"col-md-12 border p-2"}>
                            <p  style={{margin: "23px 0"}}>Kanto Dex: {this.props.num}</p>
                        </div>
                    </div>
                        <div class={"row"}>
                            <div class={"col-md-6 border p-2"}>
                                <p style={{margin: "203x 0"}}>Height: {this.props.height}</p>
                            </div>
                            <div class={"col-md-6 border p-2"}>
                                <p style={{margin: "23px 0"}}>Weight: {this.props.weight}</p>
                            </div>
                        </div>

                        <div class={"row"}>
                            <div class={"col-md-4 border p-2"}>
                            <span style={{fontSize: "20px", margin: "20px 0"}}>Type:</span>
                            </div>
                            <div class={"col-md-8 border p-2 text-center"}>

                                <ul  style={{margin: "12px 0"}}>
                                    {type}
                                </ul>
                            </div>
                        </div>

                        <div class={"row"}>


                        </div>
                    </div>
                </div>
            </div>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = pokemon;