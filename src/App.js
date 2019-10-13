import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = { 
      numCorrect: 0,
      numTries: 0,
      score: 0,
      flag1: "",
      country1: "",
      country2: "",
      capital1: "",
      capital2: "",
      message: "",
      outcome: "",
      correctCountryCapital: "",
      buttonPos: 0,
    };
  }
  
  click1 = () => {
    this.setState({
      score: ((this.state.numCorrect + 1) * 100 / (this.state.numTries + 1)),
      numCorrect: this.state.numCorrect + 1,
      outcome: "correct!",
      buttonPos: 0
    })
    this.loadCountry();
    this.updateCountries();
    } 
    

  click2 = () => {
      this.setState({
        score: (this.state.numCorrect * 100 / (this.state.numTries + 1)),
        outcome: "incorrect!",
        buttonPos: 0
      })
    this.loadCountry();
    this.updateCountries();
  }

  updateCountries() {
    this.setState({
      message: this.state.capital1 + " is the capital of " + this.state.country1 + ". " + this.state.capital2 + " is the capital of " + this.state.country2 + ".",
      numTries: this.state.numTries + 1,
      buttonPos: this.state.buttonPos + Math.floor((Math.random()) + 0.5)
    })
  }

  async loadCountry() {
    const p1_id = Math.floor(Math.random() * 250);
    let p2_id = Math.floor(Math.random() * 250);
    while (p1_id == p2_id) {
      p2_id = Math.floor(Math.random() * 250);
    }

    const response1 = await fetch("https://restcountries.eu/rest/v2/all?fields=name;capital;flag");
    const json1 = await response1.json();
    this.setState({
      country1: json1[p1_id].name,
      flag1: json1[p1_id].flag,
      capital1: json1[p1_id].capital,
      correctCountryCapital: json1[p1_id].capital
    });
    const response2 = await fetch("https://restcountries.eu/rest/v2/all?fields=name;capital;flag");
    const json2 = await response2.json();
    this.setState({
      country2: json1[p2_id].name,
      capital2: json1[p2_id].capital
    });
  }

  async componentDidMount() {
    this.loadCountry();
  }

  buttonOneFirst(props) {
    return(
    <div>
    <button className='button' onClick={this.click1}>
      {this.state.capital1}
    </button>
    <button className='button' onClick={this.click2}>
      {this.state.capital2}
    </button>
  
    </div>
    );
  }

  buttonTwoFirst(props) {
    return(
      <div>
    <button className='button' onClick={this.click2}>
      {this.state.capital2}
    </button>
    <button className='button' onClick={this.click1}>
    {this.state.capital1}
  </button>
    </div>
    );
  }

  buttonPlacement(props) {
    const buttonPosVal = props.buttonPos;
    if (buttonPosVal) {
      return <buttonOneFirst />;
    }
    return <buttonTwoFirst />;
  }

  render() {
    return (
      /*<div>
        {this.state.country}
        <img src={this.state.flag1} />
        {this.state.capital1}
      </div>
      */
      <div className="font">
        <div className="header">
          What is the capital of this country?
        </div>

        <div className="country-flag">
          <div className="flag" align="center">
            <img src={this.state.flag1}/>
          </div>
        </div>

        <div className="country-name-row">
          <div className="name">
            {this.state.country1}
          </div>
        </div>
        
        <div className="button-row">
          <buttonPlacement buttonPosVal= {this.state.buttonPos} />,
        </div>

        <div className="score">
            score: {this.state.score.toFixed(0) + "% "}
            &nbsp;
            &nbsp;
            tries: {this.state.numTries}
        </div>

        <div className="outcome">
          {this.state.outcome}
        </div>

        <div className="message">
          {this.state.message}
        </div>
        
      </div>
    )
  }
}

/*


        <div className="outcome">
          {this.state.outcome}
        </div>

        <div className="message">
          {this.state.message}
        </div>
        
<div className="pokemon" align="center;">
            <img src={this.state.pic2} />          
          </div>
          <div className="name">
            {this.state.name2}
          </div>

  <div className="button-row">
          <button className='button' onClick={this.click1}>
              this one!
          </button>

          <button className="button" onClick={this.click2}>
              this one!
          </button>
        </div>
          */

export default App;
