import React from 'react';
import ReactDOM from 'react-dom';
// import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
const axios = require('axios');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }
    this.updateData = this.updateData.bind(this);
  }
  componentDidMount() {
    //get from database and update state.repos
    this.updateData();
  }
  updateData() {
    axios.get('/repos')
      .then((data) => this.setState({ repos: data.data }))
      .catch((err) => console.log(err));
  }

  search(term) {
    console.log(`${term} was searched`);
    axios.post('/repos', { username: term })
      .then((response) => {
        console.log(response);
        this.updateData();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos} />
      <Search onSearch={this.search.bind(this)} />
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));