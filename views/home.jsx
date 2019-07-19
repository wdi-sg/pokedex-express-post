var React = require('react');

class Home extends React.Component {

  render() {
    //code logic goes here
    this.props.data
    this.props.requestQuery

    if (this.props.requestQuery === "name"){
      var sort = this.props.data.sort(compareValues("name")).map((obj)=>{
        var pokelink = "/pokemon/"+obj.id
        return (
          <div style={{margin: 10+"px", display:"inline-block", width: 100+"px", height: 100+"px", textAlign:"center"}}>
            <a href={pokelink}><img src={obj.img}/></a><br/>
            <a href={pokelink}>{obj.name}</a><br/>
            ID: {obj.id}<br/>
            NUM: {obj.num}<br/>
          </div>
        )
      });
    }else if (this.props.requestQuery === "weight"){
      var sort = this.props.data.sort(compareValues("weight")).map((obj)=>{
        var pokelink = "/pokemon/"+obj.id
        return (
          <div style={{margin: 10+"px", display:"inline-block", width: 100+"px", height: 100+"px", textAlign:"center"}}>
            <a href={pokelink}><img src={obj.img}/></a><br/>
            <a href={pokelink}>{obj.name}</a><br/>
            ID: {obj.id}<br/>
            Weight: {obj.weight}<br/>
          </div>
        )
      });
    }else if (this.props.requestQuery === "height"){
      var sort = this.props.data.sort(compareValues("height")).map((obj)=>{
        var pokelink = "/pokemon/"+obj.id
        return (
          <div style={{margin: 10+"px", display:"inline-block", width: 100+"px", height: 100+"px", textAlign:"center"}}>
            <a href={pokelink}><img src={obj.img}/></a><br/>
            <a href={pokelink}>{obj.name}</a><br/>
            ID: {obj.id}<br/>
            Height: {obj.height}<br/>
          </div>
        )
      });
    }else if (this.props.requestQuery === "nameRev"){
      var sort = this.props.data.sort(compareValues("name", "dsc")).map((obj)=>{
        var pokelink = "/pokemon/"+obj.id
        return (
          <div style={{margin: 10+"px", display:"inline-block", width: 100+"px", height: 100+"px", textAlign:"center"}}>
            <a href={pokelink}><img src={obj.img}/></a><br/>
            <a href={pokelink}>{obj.name}</a><br/>
            ID: {obj.id}<br/>
            NUM: {obj.num}<br/>
          </div>
        )
      });
    }else if (this.props.requestQuery === "weightRev"){
      var sort = this.props.data.sort(compareValues("weight", "dsc")).map((obj)=>{
        var pokelink = "/pokemon/"+obj.id
        return (
          <div style={{margin: 10+"px", display:"inline-block", width: 100+"px", height: 100+"px", textAlign:"center"}}>
            <a href={pokelink}><img src={obj.img}/></a><br/>
            <a href={pokelink}>{obj.name}</a><br/>
            ID: {obj.id}<br/>
            Weight: {obj.weight}<br/>
          </div>
        )
      });
    }else if (this.props.requestQuery === "heightRev"){
      var sort = this.props.data.sort(compareValues("height", "dsc")).map((obj)=>{
        var pokelink = "/pokemon/"+obj.id
        return (
          <div style={{margin: 10+"px", display:"inline-block", width: 100+"px", height: 100+"px", textAlign:"center"}}>
            <a href={pokelink}><img src={obj.img}/></a><br/>
            <a href={pokelink}>{obj.name}</a><br/>
            ID: {obj.id}<br/>
            Height: {obj.height}<br/>
          </div>
        )
      });
    }else {
      var sort = this.props.data.map((obj)=>{
        var pokelink = "/pokemon/"+obj.id
        return (
          <div style={{margin: 10+"px", display:"inline-block", width: 100+"px", height: 100+"px", textAlign:"center"}}>
            <a href={pokelink}><img src={obj.img}/></a><br/>
            <a href={pokelink}>{obj.name}</a><br/>
            {obj.id}<br/>
            {obj.num}<br/>
          </div>
        )
      });
    }


    //form to sort by values
    var form =
      <form method="GET" action="/pokemon">
      <select name ="sortby" action="/" onChange="this.form.submit()">
        <option disabled selected value>Select an option</option>
        <option value="weight">Sort by weight(Ascending)</option>
        <option value="weightRev">Sort by weight(Descending)</option>
        <option value="height">Sort by height(Ascending)</option>
        <option value="heightRev">Sort by height(Descending)</option>
        <option value="name">Sort by name(A-Z)</option>
        <option value="nameRev">Sort by name(Z-A)</option>
      </select>
      <input type="submit" value="submit"/>
      </form>

    var searchForm =
      <form method="GET" action="/pokemon/search">
      <input name="q" type="text"/>
      <input type="submit" value="submit"/>
      </form>

    return (
      <html>
        <body style={{backgroundColor: "rgba(0,0,0,0.5)", textAlign:"center"}}>
          <div style={{color: "#FFFFFF", textAlign: "center"}}>
            <h1>A list of pokemon</h1>
            <p>Sort your favorite pokemon!</p>
            {form}
          </div>
          <br/>
          <div style={{color: "#FFFFFF", textAlign: "center"}}>
            <form action="/pokemon/new">
              <input type="submit" value="Create new pokemon!"/>
            </form>
          </div>
          <div style={{color: "#FFFFFF", textAlign: "center"}}>
          <p>Search for your favorite pokemon!</p>
            {searchForm}
          </div>
          <br/>
          <br/>
          <br/>
          <br/>
          <div>
          {sort}
          </div>
        </body>
      </html>
    );
  }
}
// <ul style={{color: "#FFFFFF"}}>{sort}</ul>
module.exports = Home;


//function that does the sorting by name, weight or height
function compareValues(key, order){
  var varA, varB, compare;
  return function (a,b){
    if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
    return 0;
    }
    if (hasNumber(a[key]) === true && hasNumber(b[key]) === true){
      // console.log("is a number")
      varA = parseFloat(a[key])
      varB = parseFloat(b[key])
      if (order === "dsc"){
        return (varA-varB)*-1;
      }else {
        return varA-varB;
      }
    }else {
      // console.log("is a string")
      varA = a[key].toUpperCase()
      varB = b[key].toUpperCase()
      if (varA > varB){
        compare = 1;
      }else if (varA < varB){
        compare = -1;
      }
      if (order === "dsc"){
        return compare*-1;
      }else {
        return compare;
      }
    }
  }
}
function hasNumber(input){
  return /\d/.test(input);
}
