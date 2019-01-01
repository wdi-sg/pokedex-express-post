var React = require('react');

class Pokemon extends React.Component {

    render() {

        let url = '/sort'

        return(

            <form method="GET" action={url}>
                <select name="sortby">
                    <option value="id">Sort By Id</option>
                    <option value="name">Sort By Name</option>
                    <option value="height">Sort By Height</option>
                    <option value="weight">Sort By Weight</option>
                </select>
                <input type="submit" value="Submit"/>
            </form>

    )};

};



module.exports = Pokemon;