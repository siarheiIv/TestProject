import React from 'react';
import axios from 'axios';
import Faction from './Faction';
import Search from './search/Search';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      names: [],
      searchResults: [],
    }
  }
  
  async componentDidMount() {
    const {data: factions} = await axios('https://esi.evetech.net/latest/universe/factions/');
    this.setState({names: factions}); 
  }

  render() {
    const {names} = this.state;
    if(names){
    return (
      <>
        <div>
          {names.filter(name => name.name !== "Неизвестно")
            .map((name, i) => <Faction key={i} id={i} {...name} />)}
        </div>
        <Search />
      </>
    )}
  }
}

export default App;