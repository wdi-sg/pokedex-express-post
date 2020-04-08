const React = require('react');
class Individual extends React.Component {
    render() {

        let pokemonStatsId = this.props.id;
        let pokemonStatsNum = this.props.num;
        let pokemonStatsName = this.props.name;
        let pokemonStatsImg = this.props.img;
        let pokemonStatsType = this.props.type.join(', ');
        let pokemonStatsHeight = this.props.height;
        let pokemonStatsWeight = this.props.weight;
        let pokemonStatsWeaknesses = this.props.weaknesses.join(', ');
        let pokemonStatsNextEvolution = this.props.next_evolution;
        let pokemonStatsPrevEvolution = this.props.prev_evolution;

        let hasNextEvolution = ['None'];
        if (pokemonStatsNextEvolution !== undefined) {
            //for (let i = 0; i < pokemonStatsNextEvolution.length; )
            hasNextEvolution = pokemonStatsNextEvolution.map(evolution => {
                return (evolution.name);
            })
        }

        let hasPrevEvolution = ['None'];
        if (pokemonStatsPrevEvolution !== undefined) {
            hasPrevEvolution = pokemonStatsPrevEvolution.map(prevolution => {
                return (prevolution.name);
            })
        }

        console.log(hasPrevEvolution)

        let edit = '/pokemon/edit'

        return (
            <html>
                <body>
                    <img src={pokemonStatsImg}  />
                    <h2>{pokemonStatsName}</h2>
                    <ul>
                        <li>ID: {pokemonStatsId}</li>
                        <li>Number: {pokemonStatsNum}</li>
                        <li>Type: {pokemonStatsType}</li>
                        <li>Height: {pokemonStatsHeight}</li>
                        <li>Weight: {pokemonStatsWeight}</li>
                        <li>Weaknesses: {pokemonStatsWeaknesses}</li>
                        <li>Next Evolution: {hasNextEvolution.join(', ')}</li>
                        <li>Previous Evolution: {hasPrevEvolution.join(', ')}</li>
                    </ul>
                    <p>Found new information? Edit the information <a href={edit}>here</a></p>
                </body>
            </html>
        );
    }
}

module.exports = Individual;