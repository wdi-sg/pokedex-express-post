var React = require('react');
class NewPokemon extends React.Component {
render() {
    let missingKey
    if (this.props.missingKey){
        missingKey = `Please type in a ${this.props.missingKey}`
    }

    let doubleEntry
    if (this.props.double){
        doubleEntry = 'ID Already used'
    }
return (
<html>
<body>
    <form method="POST" action="/pokemon">
        <label htmlFor="id" style={{display: 'inline-block', textAlign: 'right', width: "140px", fontWeight: "bold", color: "grey"}}>Pokemon ID</label>
        <input type="text" name="id"/><br/>
        <label htmlFor="num" style={{display: 'inline-block', textAlign: 'right', width: "140px", fontWeight: "bold", color: "grey"}}>Pokemon Number</label>
        <input type="text" name="num"/><br/>
        <label htmlFor="name" style={{display: 'inline-block', textAlign: 'right', width: "140px", fontWeight: "bold", color: "grey"}}>Pokemon Name</label>
        <input type="text" name="name"/><br/>
        <label htmlFor="img" style={{display: 'inline-block', textAlign: 'right', width: "140px", fontWeight: "bold", color: "grey"}}>Pokemon Image</label>
        <input type="text" name="img"/><br/>
        <label htmlFor="height" style={{display: 'inline-block', textAlign: 'right', width: "140px", fontWeight: "bold", color: "grey"}}>Pokemon Height</label>
        <input type="text" name="height"/><br/>
        <label htmlFor="weight" style={{display: 'inline-block', textAlign: 'right', width: "140px", fontWeight: "bold", color: "grey"}}>Pokemon Weight</label>
        <input type="text" name="weight"/><br/>
        <input type="submit" value="Submit" style={{display: 'inline-block', textAlign: 'center', width: "140px", marginLeft: "75px", fontWeight: "bold", fontSize: 15, color: "red"}}/>
    </form>
    <div style={{color: "red", fontSize: "50px", marginTop: "15px"}}>{missingKey}</div>
    <div style={{color: "red", fontSize: "50px", marginTop: "15px"}}>{doubleEntry}</div>
</body>
</html>
);
}
}


module.exports = NewPokemon;