import React from 'react';
import OneItem from './OneItem';
import Pagination from '../Pagination';

class SearchResults extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      searchResult: [],
      isAscending: true,
      currentPage: 1,
      recordsPerPage: 20,
    }
    const names = this.props.data.map(oneItem => oneItem.name);
    const id = this.props.id;
    for(let i = 0; i < names.length; i++) {
    this.state.searchResult.push({name: names[i], id: id[i]})};
  }

  sortNamesAsc = () => {
    let sortedList = this.state.searchResult.sort((a, b) => {
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1;
      } else if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1;
      } else 
      return 0;
    })
    this.setState({searchResult: sortedList});
    this.setState({isAscending: !this.state.isAscending});
  }
  sortNamesDesc = () => {
    let sortedList = this.state.searchResult.sort((a, b) => {
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1;
      } else if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1;
      } else 
      return 0;
    }).reverse();
    this.setState({searchResult: sortedList});
    this.setState({isAscending: !this.state.isAscending});
  }
  paginate = (number) => {
    this.setState({currentPage: number});
  }

  render() { 
    //current posts
    const lastIndexOfRecord = this.state.currentPage * this.state.recordsPerPage;
    const firstIndexOfRecord = lastIndexOfRecord - this.state.recordsPerPage;
    const records = this.state.searchResult.slice(firstIndexOfRecord, lastIndexOfRecord);

    return(
      <>
        <div className="search-amount">Найдено: {this.props.data.length}</div>
          <table>
            <thead>
              <tr>
                <th onClick={this.state.isAscending ? this.sortNamesAsc : this.sortNamesDesc}>NAME</th>
                <th>ID</th>
              </tr>
            </thead>
            <tbody>
              {/* {this.state.searchResult.map((oneItem, i) => <OneItem key={i} index={i} id={this.props.id} {...oneItem} />)} */}
              {records.map((oneItem, i) => <OneItem key={i} {...oneItem} />)}
            </tbody>
          </table>
          <Pagination data={this.state} paginate={this.paginate}/>
      </>
    )
  } 
}
export default SearchResults;