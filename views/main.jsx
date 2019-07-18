var React = require('react');
class Main extends React.Component {

  render() {
    let pokemon = this.props.pokemon;

    const pokTable = pokemon.map(pokObj=>{
        let pokUrl = "/pokemon/"+pokObj.id;
        return <div style={{width:220}}><div style={{backgroundColor:"#f2f2f2",position:"relative",height:210,borderRadius:10}}><a href={pokUrl}><img src={pokObj.img} style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:200}}/></a></div><div><p style={{fontSize:12,color:"grey",fontWeight:"bold"}}>#{pokObj.num}</p><p style={{fontWeight:"bold"}}>{pokObj.name}</p></div></div>
    })
    const sortingMethodSelections =
        <select name="sortby" style={{width:300,height:50,textAlignLast:"center",fontSize:20,color:"white",backgroundColor:"#6cc0e3",borderRadius:10}}>
            <option>Sort By</option>
            <option value="">ID</option>
            <option value="name">Name</option>
            <option value="weight">Weight</option>
            <option value="height">Height</option>
        </select>;

    return (
      <html>
        <body style={{width:1000,margin:"0 auto",fontFamily:"sans-serif",textAlign:"center"}}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1200px-International_Pok%C3%A9mon_logo.svg.png" style={{width:500,display:"block",margin:"0 auto"}}/><br/>
            <form>{sortingMethodSelections}<br/><br/><input type="submit" value="Submit"/></form><br/><a href="/pokemon/new" style={{display:"block",textAlign:"left"}}>Add New Pokemon</a>
            <div style={{display:"flex",flexWrap:"wrap",justifyContent:"space-around"}}>{pokTable}</div>
        </body>
      </html>
    );
  }
}

module.exports = Main;
