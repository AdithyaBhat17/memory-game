import React, { Component } from 'react';
import './App.css';
import shuffle from 'shuffle-array'
import Card from './Card'
import Navbar from './Navbar'

const CardState = {
  HIDING : 0,
  SHOWING : 1,
  MATCHING : 2
}

class App extends Component {
  constructor(props){
    super(props);
    let cards = [
      {id:0,cardState : CardState.HIDING,backgroundColor:'red'},
      {id:1,cardState : CardState.HIDING,backgroundColor:'red'},
      {id:2,cardState : CardState.HIDING,backgroundColor:'navy'},
      {id:3,cardState : CardState.HIDING,backgroundColor:'navy'},
      {id:4,cardState : CardState.HIDING,backgroundColor:'green'},
      {id:5,cardState : CardState.HIDING,backgroundColor:'green'},
      {id:6,cardState : CardState.HIDING,backgroundColor:'yellow'},
      {id:7,cardState : CardState.HIDING,backgroundColor:'yellow'},
      {id:8,cardState : CardState.HIDING,backgroundColor:'black'},
      {id:9,cardState : CardState.HIDING,backgroundColor:'black'},
      {id:10,cardState : CardState.HIDING,backgroundColor:'purple'},
      {id:11,cardState : CardState.HIDING,backgroundColor:'purple'},
      {id:12,cardState : CardState.HIDING,backgroundColor:'pink'},
      {id:13,cardState : CardState.HIDING,backgroundColor:'pink'},
      {id:14,cardState : CardState.HIDING,backgroundColor:'lightsky'},
      {id:15,cardState : CardState.HIDING,backgroundColor:'lightsky'}
    ]
    cards = shuffle(cards)
    this.state = {cards,noClick:false}
    // this.handleNewGame = this.handleNewGame.bind(this)
  }

  handleClick = (id) => {
    const mapCardState = (cards,idsToChange,newCardState) => {
      return cards.map(card => {
        if(idsToChange.includes(card.id)){
          return {
            ...card,
            cardState:newCardState
          }
        }
        return card
      })
    }

    const foundCard = this.state.cards.find(card => card.id === id)
    if(this.state.noClick || foundCard.cardState !== CardState.HIDING)
      return

    let noClick = false
    
    let cards = mapCardState(this.state.cards,[id],CardState.SHOWING)

    const showingCards = cards.filter((card) => card.cardState === CardState.SHOWING)

    const ids = showingCards.map(card => card.id)

    if(showingCards.length === 2 &&
      showingCards[0].backgroundColor === showingCards[1].backgroundColor){
        cards = mapCardState(cards,ids,CardState.MATCHING)
    }else if(showingCards.length === 2){
      let hidingCards = mapCardState(cards,ids,CardState.HIDING)
      noClick = true
      this.setState({cards, noClick},()=>{
        setTimeout(()=>{
          this.setState({cards:hidingCards,noClick:false}),2300
        })
      })
      return
    } 
    this.setState({cards,noClick})
  }

  handleNewGame = () => {
    let cards = this.state.cards.map(card => ({
      ...card,
      cardState:CardState.HIDING
    }))
    cards = shuffle(cards)
    this.setState({cards})
  }

  render() {
    const cards = this.state.cards.map((card) => (
      <Card key = {card.id}
      showing={card.cardState !== CardState.HIDING} onClick={() => {this.handleClick(card.id)}} backgroundColor={card.backgroundColor} />
    ) )
    return (
      <div className="App">
        <Navbar onNewGame={this.handleNewGame}/>
        {cards}
      </div>
    );
  }
}

export default App;
