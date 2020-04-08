const React = require('react');
class Photos extends React.Component {
    render() {

        let pokemonIndex = this.props.pokemon;

        let pokemonPhotoList = pokemonIndex.map(image => {
            return (<img src={image.img}/>);
        })

        return (
            <html>
                <body>
                    <h1>All Pokemon Images</h1>
                    {pokemonPhotoList}
                </body>
            </html>
        );
    }
}

module.exports = Photos;