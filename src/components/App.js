import React, { Component } from 'react';
import '../index.css'
import Artist from './Artists'
import Tracks from './Tracks'


//REQUEST
const API_ADDRESS = 'https://spotify-api-wrapper.appspot.com'


class App extends Component {
 state = {ArtistQuery:'', artist: null, tracks: []}


 updateArtistQuery = (event) => {
    this.setState({ArtistQuery: event.target.value})
 }



 searchArtist = () => {
     fetch(`${API_ADDRESS}/artist/${this.state.ArtistQuery}`)
     .then(response => response.json())
     .then(json =>{
         if(json.artists.total > 0) {
          const artist = json.artists.items[0]

          console.log('artist', artist)
          this.setState({
              artist:artist
          })

          //Searching for top tracks
          fetch(`${API_ADDRESS}/artist/${artist.id}/top-tracks`)
          .then((response) => {
              return response.json()
          })
          .then((json) => {
              return this.setState({tracks: json.tracks})
          })
          .catch((error) => {
              alert(error.message)
          })
         }
     })

     .catch((error) => {
        alert(error.message)
    })
 }


 handleKeyPress = (event) => {
    if(event.key === 'Enter'){
        this.searchArtist();
    }
  }
    render() { 
        console.log('this.state', this.state)
        return ( 
            <div>
              <h3 className='text-danger'>Twentek Music Master</h3>
              <input
               onChange={this.updateArtistQuery} 
               onKeyPress ={this.handleKeyPress} 
               type='text' placeholder='Search for an Artist'/>
              <button 
              onClick ={this.searchArtist}
              className='btn btn-danger'>Search</button>

              <Artist artist ={this.state.artist}/>

              <Tracks tracks={this.state.tracks}/>
            </div>
         );
    }
}



 
export default App;