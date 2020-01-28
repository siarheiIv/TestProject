import React from 'react';
import axios from 'axios';

class CeoInfo extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      raceName: '',
    }
  }
  async componentDidMount() {
    const {data: races} = await axios(`https://esi.evetech.net/latest/universe/races/`);
    // better to use FIND method here
    const raceInfo= races.filter(race => {
      return race.race_id === this.props.race_id
  })
    this.setState({raceName: raceInfo[0].name});
  }
  render() {
    const {name, birthday} = this.props;
    return (
      <div>
        <p>{name}</p>
        <p>{this.props.convertBirthday(birthday)}</p>
        <p>{this.state.raceName}</p>
      </div>
    )
  }
}

export default CeoInfo;
