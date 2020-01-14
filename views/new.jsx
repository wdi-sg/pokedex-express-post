var React = require('react');
class NewPokemon extends React.Component {
render() {
return (
<html>

<body>
    <form method="POST" action="/pokemon">
        <label for="id" style={{display: 'inline-block', textAlign: 'right', width: "140px"}}>Pokemon ID: </label>
        <input type="text" name="id"/><br/>
        <label for="num" style={{display: 'inline-block', textAlign: 'right', width: "140px"}}>Pokemon Number: </label>
        <input type="text" name="num"/><br/>
        <label for="name" style={{display: 'inline-block', textAlign: 'right', width: "140px"}}>Pokemon Name: </label>
        <input type="text" name="name"/><br/>
        <label for="img" style={{display: 'inline-block', textAlign: 'right', width: "140px"}}>Pokemon Image: </label>
        <input type="text" name="img"/><br/>
        <label for="height" style={{display: 'inline-block', textAlign: 'right', width: "140px"}}>Pokemon Height: </label>
        <input type="text" name="height"/><br/>
        <label for="weight" style={{display: 'inline-block', textAlign: 'right', width: "140px"}}>Pokemon Weight: </label>
        <input type="text" name="weight"/><br/>
        <input type="submit" value="Submit" style={{display: 'inline-block', textAlign: 'center', width: "140px", marginLeft: "75px"}}/>
    </form>
</body>
</html>
);
}
}

module.exports = NewPokemon;