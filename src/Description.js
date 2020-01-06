import React from 'react';
import axios from 'axios';
import CorporationModal from './CorporationModal';

class Description extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      solarSystem: '',
      corporation: '',
      showModal: false,
    }
  }
  
  async componentDidMount() {
    const {solar_system_id} = this.props.factions;
    const {data: solarSystem} = await axios(`https://esi.evetech.net/latest/universe/systems/${solar_system_id}`);
    this.setState({solarSystem: solarSystem.name});
    
    const {corporation_id} = this.props.factions;
    const {data: corporation} = await axios(`https://esi.evetech.net/latest/corporations/${corporation_id}`);
    this.setState({corporation});
  }

  handleClick = () => {
    this.setState({showModal: !this.state.showModal});
  }

  render() {
    const {description} = this.props.factions;
    const {solarSystem, corporation, showModal} = this.state;
  
    return (
      <>
        <p>{description}</p>
        <p>{solarSystem}</p>
        <a onClick={this.handleClick} className='link'>{corporation.name}</a>
        {showModal ? <CorporationModal handleClick={this.handleClick} {...corporation} /> : null}
      </>
    )
  }  
}

export default Description;