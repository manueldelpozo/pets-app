import React, { Component } from 'react';
import './App.css';

import SearchBox from './components/SearchBox';
import List from './components/List';
import Details from './components/Details';

class App extends Component {
  initialTitle = 'Search for pet pictures';
  state = {
    petType: '',
    resultList: [],
    petSelectedName: '',
    petSelectedImageUrl: '',
    showSearchBox: true,
    showList: false,
    showDetails: false,
    title: this.initialTitle
  }

  updateList = (type, list) => {
    this.setState(() => ({
      petType: type,
      resultList: list,
      showSearchBox: false,
      showList: true,
      title: 'Select your favourite ' + type.slice(0, -1) + ' from the list'
    }));
  }

  selectPet = (name, imgurl) => {
    this.setState(() => ({
      petSelectedName: name,
      petselectedImageUrl: imgurl,
      showList: false,
      showDetails: true,
      title: 'Hi ' + name + '!'
    }));
  }

  goBack = () => {
    this.setState((prevState) => ({
      showSearchBox: prevState.showList,
      showList: prevState.showDetails,
      showDetails: false,
      title: prevState.showList ? this.initialTitle : 'Select your favourite ' + this.state.petType.slice(0, -1) + ' from the list'
    }));
  }

  render() {
    return (
      <div> 
        <header>
          { !this.state.showSearchBox ? <button className="btn btn-default" onClick={this.goBack}>&lt; Back</button> : null }
          <h2>{this.state.title}</h2>
        </header>
        { this.state.showSearchBox ? <SearchBox onSubmit={this.updateList} /> : null }
        { this.state.showList ? <List result={this.state.resultList} type={this.state.petType} onSelectPet={this.selectPet} /> : null }
        { this.state.showDetails ? <Details imgurl={this.state.petselectedImageUrl} /> : null }
      </div>
    );
  }
}

export default App;
