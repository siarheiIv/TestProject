import React from 'react';
import axios from 'axios';
import SearchResults from './searchBy/SearchResults';

const uri = 'https://esi.evetech.net/latest/';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: 'character',
      query: '',
      isSubmitted: false,
      ErrorMessage: '',
      searchResults: [],
      searchResultFirstCategory: [],
      searchResultSecondCategory: [],
      searchResultThirdCategory: [],
      searchResultFourthCategory: [],
    }
  }

  // methods can be combined
  getCategory = (e) => {
    this.setState({category: e.target.value}); 
  }

  getQuery = (e) => {
    this.setState({query: e.target.value});
  }

  validate = () => {
    if (this.state.query.length === 0) {
      this.setState({ErrorMessage: 'Заполните все обязательные поля'});
      return false;
    } else if (this.state.query.length < 3) {
      this.setState({ErrorMessage: 'Минимальное количество символов поискового запроса: 3'});
      return false;
    }
    return true;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      searchResultFirstCategory: [],
      searchResultSecondCategory: [],
      searchResultThirdCategory: [],
      searchResultFourthCategory: [],
      searchResultFifthCategory: [],
      ErrorMessage: '',
      isSubmitted: false,
    })
    const isValid = this.validate();
    if(isValid) {
      const {category, query} = this.state;
      axios(`${uri}search?categories=${category}&search=${query}`)
        .then(response => {this.setState({searchResults: response.data[`${category}`]})})

        // That's not a promise, no use to resolve
        .then(() => this.getSearchMethod(category))
        .then(() => this.setState({isSubmitted: !this.state.isSubmitted})); 
      }  
  }

  getSearchMethod = (category) => {
    switch (this.state.category) {
      case 'character':
      case 'alliance':
      case 'corporation': 
        this.getSearchCategoryFirst(category);
        break;
      case 'constellation':
      case 'region':
      case 'station':
        this.getSearchCategorySecond(category);
        break;
      case 'solar_system':
        this.getSearchCategoryThird(category);
        break;        
      case 'faction':
        this.getSearchCategoryFourth(category);
        break;
      case 'inventory_type':
        this.getSearchCategoryFifth(category);
        break;
    }  
  }
  getSearchCategoryFirst = (category) => {
    let promises = [];
    // It's always TRUE
    if(this.state.searchResults) {
    this.state.searchResults.forEach((elem) => {
      promises.push(axios(`${uri}${category}s/${elem}`)
      .then(response => this.state.searchResultFirstCategory.push(response.data)))
    });

    // https://stackoverflow.com/questions/47237556/disadvantages-mutating-state-directly-and-forceupdate-vs-setstate
    axios.all(promises).then(() => this.forceUpdate())};
  }

  getSearchCategorySecond = (category) => {
    let promises = [];
    if(this.state.searchResults) {
    this.state.searchResults.forEach((elem) => {
      promises.push(axios(`${uri}universe/${category}s/${elem}`)
      .then(response => this.state.searchResultSecondCategory.push(response.data)))});
    axios.all(promises).then(() => this.forceUpdate())}; 
  }

  getSearchCategoryThird = () => {
    const apis = {
      ep1: `universe/system`,
      ep2: elem => `universe/system/${elem}`,
    }


    let promises = [];
    if(this.state.searchResults) {
      console.time();
    this.state.searchResults.forEach((elem) => {
      
      promises.push(axios(`${uri}universe/systems/${elem}`)
      .then(response => this.state.searchResultThirdCategory.push(response.data))
      )});

    
    axios.all(promises).then((arr) => console.timeEnd())};
  }

  getSearchCategoryFourth = (category) => {  
    let promises = [];
    if(this.state.searchResults) {
    this.state.searchResults.forEach(elem => (
      promises.push(
        axios(`${uri}universe/${category}s`)
      .then(response => response.data)
      .then(factions => factions.filter(faction => {
        return faction.faction_id === elem
      })).then(response => this.state.searchResultFourthCategory.push(...response)))));
    axios.all(promises).then(() => this.forceUpdate())}; 
  }

  render() {

    return(
        <>
         <form onSubmit={this.handleSubmit}> 
          <select onChange={this.getCategory} name="categories">
            {/* Options can be placed in an array and mapped */}
            <option value="character">Agent</option>
            <option value="alliance">Alliance</option>
            <option value="constellation">Constellation</option>
            <option value="corporation">Corporation</option>
            <option value="faction">Faction</option>
            <option value="region">Region</option>
            <option value="solar_system">Solar system</option>
            <option value="station">Station</option>
            <option value="inventory_type">Inventory type</option>
          </select>
          <input onChange={this.getQuery} type="text" placeholder="Search" name="search" className={this.state.ErrorMessage ? "error-validation": null}/>  
          <input type="submit" placeholder="Искать" name="submit" />
        </form>
        <div className="error-message">{this.state.ErrorMessage}</div>
        {/* Duplication */}
        {this.state.searchResultFirstCategory.length > 0 && <SearchResults data={this.state.searchResultFirstCategory} id={this.state.searchResults} />}
        {this.state.searchResultSecondCategory.length > 0 && <SearchResults data={this.state.searchResultSecondCategory} id={this.state.searchResults} />}
        {this.state.searchResultThirdCategory.length > 0 && <SearchResults data={this.state.searchResultThirdCategory} id={this.state.searchResults} />}
        {this.state.searchResultFourthCategory.length > 0 && <SearchResults data={this.state.searchResultFourthCategory} id={this.state.searchResults} />}
        {/* Unnecessary comparison with 0 */}
        {this.state.isSubmitted && this.state.searchResultFirstCategory.length === 0 && this.state.searchResultSecondCategory.length === 0 && 
        this.state.searchResultThirdCategory.length === 0 && this.state.searchResultFourthCategory.length === 0 &&
          <div className="search-amount">По вашему запросу ничего не найдено</div>
        }
      </>
    )
  }
}

export default Search;