import React from 'react';
import axios from 'axios';
import CorporationModal from './CorporationModal';

class Description extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      solarSystem: '',
      corporation: {
        name: '',
      },
      showModal: false,
    }
  }
  
  async componentDidMount() {

    // setState to be invoked once
    const {solar_system_id, corporation_id} = this.props.factions;
    const {data: solarSystem} = await axios(`https://esi.evetech.net/latest/universe/systems/${solar_system_id}`);
    const {data: corporation} = await axios(`https://esi.evetech.net/latest/corporations/${corporation_id}`);
    
    this.setState({
      solarSystem: solarSystem.name,
      corporation,
    });
  }

  handleClick = () => {
    // it's better to use a callback in setState
    this.setState({showModal: !this.state.showModal});
  }

  render() {
    const {description} = this.props.factions;
    const {solarSystem, corporation, showModal} = this.state;
  
    return (
      <>
        <p>{description}</p>
        <p>{solarSystem}</p>
        {/* Corporation can be null - the program will crash */}
        <a onClick={this.handleClick} className='link'>{corporation ? corporation.name : 'N/A'}</a>
        {showModal ? <CorporationModal handleClick={this.handleClick} {...corporation} /> : null}
      </>
    )
  }  
}

export default Description;