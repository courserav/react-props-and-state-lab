import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      adoptedPets: [],
      filters: {
        type: 'all'
      }
    }
  }
  updateType = (newType) => {
    this.setState({filters: {...this.state.filters, type: newType}})
  }
  findPets = () => {
    let type = this.state.filters.type
    let apiUrl = ''

    if (type == 'all'){
      apiUrl = '/api/pets'
    }
    else if (type == 'cat'){
      apiUrl = '/api/pets?type=cat'
    }
    else if (type == 'dog'){
      apiUrl = '/api/pets?type=dog'
    }
    else if (type == 'micropig'){
      apiUrl = '/api/pets?type=micropig'
    }
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      this.setState({pets: data})
    })
  }
  handleAdoptPet = petId => {
    this.setState({
      adoptedPets: [...this.state.adoptedPets, petId],
    });
  }
  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.updateType} onFindPetsClick={this.findPets}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser adoptedPets={this.state.adoptedPets} onAdoptPet={this.adoptTrue}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
