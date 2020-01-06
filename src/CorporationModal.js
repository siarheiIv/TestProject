import React from 'react';
import axios from 'axios';
import CeoInfo from './CeoInfo';
import { Carousel } from 'react-responsive-carousel';

class Corporation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ceoName: '',
      getCeoInfo: false, 
      selectedItem: 0,
    }
  }

  async componentDidMount() {
    if(this.props.ceo_id) {
      const {data: ceoName} = await axios(`https://esi.evetech.net/latest/characters/${this.props.ceo_id}`);
      this.setState({ceoName: ceoName});
    }
  }

  convertBirthday = (birthday) => {
    return birthday.split('T').slice(0, 1); 
  }

  changeSlide = () => {
    this.setState({selectedItem: this.state.selectedItem + 1});
  }

  closeModal = (e) => {
    e.target === this.overlay && this.props.handleClick();
  }
    
  render() {
    return(
      <>
        <div className='modal-overlay' onClick={this.closeModal} ref={node => {this.overlay = node}} >
          <div className='modal'>
            <Carousel showThumbs={false} selectedItem={this.state.selectedItem}>
              <div className='modal-content'>
                <button className="close-button" onClick={this.props.handleClick}></button>
                <p>{this.props.name}</p>
                <p>{this.props.member_count}</p>
                <p>{this.props.description}</p>
                <a onClick={this.changeSlide} className='link'>{this.state.ceoName.name}</a>
              </div>
              <div>
                <div className='modal-content'>
                  <button className="close-button" onClick={this.props.handleClick}></button>
                  {this.state.ceoName ? <CeoInfo {...this.state.ceoName} convertBirthday={this.convertBirthday} /> : null}
                </div>
              </div>
            </Carousel>
          </div>
        </div>
      </>
    )
  } 
}

export default Corporation;