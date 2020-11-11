import { Component } from 'react';
import './App.css';

import { CardList } from './components/card-list/card-list.component';
import { SearchBox } from './components/search-box/search-box.component';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      monsters: [],
      stringFilter: ''
    }
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(users => this.setState({monsters: users}))
  }
  
  render() {
    const { monsters, stringFilter } = this.state;
    const re = new RegExp(stringFilter, 'i');
    const filtered = monsters.filter(monster => monster.name.match(re));
    return (
        <div className="App">
          <h1>Monsters Rolodex</h1>
          <SearchBox placeholder="Search Monster" handleChange={e =>
            this.setState({stringFilter: e.target.value})
          } />
          <CardList monsters={filtered} />
        </div>
    );
  }
}

export default App;
