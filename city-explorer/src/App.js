import React from 'react';
import axios from 'axios';

class App extends React.Component {

  constructor(props){
    super(props);
    
    this.state = {
      locationData : '',
      errMsg:'',
      displayErrorMsg: false,
      displayImage : false,
    }
  }

  getData = async(event) => {
    event.preventDefault();
    let selectorPlace = event.target.Searching.value;
    let link = 'https://us1.locationiq.com/v1/search.php?key=pk.6609fd5454fe4ca80f3cbe836300bba0&q=' + selectorPlace + '&format=json';
  

  try {
    let localLink = await axios.get(link);
    this.setState({
      locationData: localLink.data[0],
      displayImage:true,
    });
  
  } catch (error) {
    this.setState({
      errMsg: 'Error is did. please resolve it.',
      displayErrorMsg:true,
  })  
  }
}
  render(){
    return(
      <body>
        <header>
          <h1>Location React Application</h1>
        </header>
        <main>
        <form onSubmit={this.getData}>
          <input type='text' placeholder='Enter City Name' name='Searching'></input><br></br><br></br>
          <input type='submit' value='explore!'/>
        </form>
        <div>
          <p>Place Name : {this.state.locationData.display_name}</p>
          <p>Lat : {this.state.locationData.lat}</p>
          <p>Lon : {this.state.locationData.lon}</p>
          {<p>Error : {this.state.errMsg}</p>}
          {this.state.displayImage && <img src={`https://maps.locationiq.com/v3/staticmap?key=pk.6609fd5454fe4ca80f3cbe836300bba0&center=${this.state.locationData.lat},${this.state.locationData.lon}`} alt='Ma]ing Show' />}

        </div>
        </main>
      </body>
    )
  }
}

export default App;
