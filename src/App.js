import React, { Component } from "react";
import axios from "axios";
class App extends Component {


  constructor(props) {
    super(props);
    this.state = {
      filterType: "series",
      jsonObject: [],
      searchedText: ""
    }
    // series have "title" property and characters have "name" property
    // when getting the data of series. It will use "title" property and so on.
    this.filterTitle = {
      "series" : "title",
      "characters" : "name",
      "comics" : "title",
    }
  }

  // calling the Api on mount
  componentDidMount() {
    this.callApi();
  }

  // Api method call get data from marvel
  callApi() {
    // If the api is called once dont call it again and again.
    if (!this.state.jsonObject[this.state.filterType]) {
      let api = "http://gateway.marvel.com/v1/public/" + this.state.filterType + "?ts=1609169846315&apikey=06b519b87668f473a42846dc5319e017&hash=4aa75c58439e894c3d11fd829b53d7b0";
      axios.get(api).then(response => {
        const { jsonObject, filterType } = this.state;
        // stroing the data into its filterType so that i can reuse the data
        jsonObject[filterType] = response.data.data.results;
        this.setState({
          jsonObject: jsonObject
        });
      });
    }
  }

  // handling filter change
  changeFilterType = (e) => {
    this.setState({
      filterType: e.target.value
    }, () => {
      // when filter is changed calling the api again
      this.callApi();
    });
  }

  // handling search text change
  handleSearch = (e) => {
    this.setState({
      searchedText: e.target.value
    });
  }


  render() {
    const { jsonObject, filterType, searchedText } = this.state;
    this.noDataFoundFlag = true;
    return (
      <div className="App">
        <div className="select-search-bar">
          <div className="select-bar">
            <label>Choose a Filter Type:</label>
            <select name="filterType" onChange={this.changeFilterType}>
              <option value="series">Series</option>
              <option value="characters">Characters</option>
              <option value="comics">Comics</option>
            </select>
          </div>
          <div className="search-container">
            <input type="text" value={searchedText} placeholder="Search.." name="search" onChange={this.handleSearch} />
          </div>
        </div>
        <div className="flex-container">
          {/* check if data is available in jsonObject only than iterate */}
          {jsonObject[filterType] ?
            jsonObject[filterType].map((item, index) => {
              // if no data is matched with searched string showing no Data found string
              (this.noDataFoundFlag && (item[this.filterTitle[filterType]].toLowerCase().indexOf(searchedText.toLowerCase()) !== -1 ) ? this.noDataFoundFlag = false : this.text = null);
              return (
                item[this.filterTitle[filterType]].toLowerCase().indexOf(searchedText.toLowerCase()) !== -1 ? <div key={index}>{item[this.filterTitle[filterType]]}</div> : null
              )
            }) : null}
        </div>
        {/* showing do data found string */}
        {this.noDataFoundFlag === true ? <div className="noDataFound">No Data Found</div> : ""}
      </div>
    );
  }
}

export default App;
