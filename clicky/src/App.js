import React, { Component } from "react";
import ClickyCard from "./components/ClickyCard/clicky";
import Wrapper from "./components/Wrapper";
import friends from "./friends.json";
import "./App.css";
import "animate.css";
import PageTitleCard from "./components/pageTitleCard/PageTitle";

const introStyle = {
  textAlign: "center",
  fontFamily: "Sirin Stencil, cursive"
};

class App extends Component {
  state = {
    friends
  };

  score = 0;

  Clicked = id => {
    console.log(friends);
    const friends = this.state.friends.map(friend => {
      if (friend.id === id) {
        if (friend.clicked === false) {
          //if new photo click
          friend.clicked = true;
          this.score++;
        } else {
          alert("Oops! Try again.");
          console.log(friends);
          document.getElementById("shake").classList.add("uk-animation-shake");
          setTimeout(function() {
            document
              .getElementById("shake")
              .classList.remove("uk-animation-shake");
          }, 500);
          this.resetGame(); //otherwise reset
        }
      } else {
        if (this.score === 12) {
          alert("You win!");
          this.resetGame();
        }
      }
      return friend;
    });
    //pushes new photo array
    this.setState({ friends });
  };

  shuffle = array => {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While theres still elements to shuffle...
    while (0 !== currentIndex) {
      // Pick the element remaining...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // swap it
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  resetGame = () => {
    this.score = 0;
    this.state.friends.map(friend => {
      friend.clicked = false;
      return friend;
    });
  };

  componentDidMount() {}
  render() {
    return (
      <div>
        <PageTitleCard>React Memory Game! Score:{this.score}</PageTitleCard>
        <h2 style={introStyle} className="title">
          Fast Cast Memory Game. Try and remember Which member of the team
          you've clicked, if you guess the same person again, Back to zero you
          go!
        </h2>
        <div id="shake">
          <Wrapper>
            {this.shuffle(this.state.friends).map(friend => (
              <ClickyCard
                Clicked={this.Clicked}
                id={friend.id}
                image={friend.image}
                name={friend.name}
              />
            ))}
          </Wrapper>
        </div>
      </div>
    );
  }
}

export default App;
