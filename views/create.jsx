const React = require('react');

class Create extends React.Component {

    render() {

        let url = "/pokemon";

        return (

        <div>
        <h1>Enter A New Pokemon</h1>
            <form method="POST" action={url}>
                <input type="hidden" name="id" />
                <input type="hidden" name="num" />
                Name:
                <br/>
                <input type="text" name="name"/>
                <br/>
                Image Url:
                <br/>
                <input type="text" name="img"/>
                <br/>
                Height:
                <br/>
                <input type="number" name="height"/>
                <br/>
                Weight:
                <br/>
                <input type="number" name="weight"/>
                <br/>
                <input type="submit" value="Submit"/>
            </form>
        </div>

    )}

};

module.exports = Create;
