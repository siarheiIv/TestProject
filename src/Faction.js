import React from 'react';
import Description from './Description'

class Faction extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
    }
  }

  handleClick = () => {
    this.setState(prevState => ({isActive: !prevState.isActive}));
  }
  
  render() {
    return(
      <>
        <button className="accordion" onClick={this.handleClick}>{this.props.name}</button>
        {this.state.isActive ? 
          (
            <div className='active'>
              <Description factions={this.props}/>
            </div>
          ) : 
            null
        }
    </>
    )
  } 
}

export default Faction;