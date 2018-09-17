import React, { Component } from "react";
import { HashRouter, Route } from "react-router-dom";
//Components
import Header from "./Header";
import Home from "./Home";
import AddWish from "./AddWish";
import Progress from "./Progress";
import About from "./About";
import { uniqureID } from "./api/api.scripts";
//Styles
import "../css/bootstrap.min.css";
import "../css/App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      date: "Next Year",
      input: "",
      wishList: [
        {
          id: uniqureID(),
          name: "Visit Paris",
          date: "10.05.2019",
          isOnEdit: false,
          isEdit: false,
          isAchieved: false
        },
        {
          id: uniqureID(),
          name: "Live in Hawaii",
          date: "10.03.2022",
          isOnEdit: false,
          isEdit: false,
          isAchieved: true
        },
        {
          id: uniqureID(),
          name: "Get Front End Job",
          date: "15.05.2018",
          isOnEdit: false,
          isEdit: false,
          isAchieved: false
        }
      ]
    };
  }

  getDate = (e, index = -1) => {
    if (index === -1) {
      this.setState({
        date: e.target.value
      });
    } else {
      this.state.wishList[index].name = e.target.value;
      this.setState({
        date: e.target.value
      });
    }
  };

  setInput = (e, index = -1) => {
    if (index === -1) {
      this.setState({
        input: e.target.value.replace(/\b\w/g, l => l.toUpperCase())
      });
    } else {
      this.state.wishList[index].name = e.target.value;
      console.log(this.state.wishList[index].name);
      this.setState({
        input: e.target.value.replace(/\b\w/g, l => l.toUpperCase())
      });
    }
  };

  addWish = e => {
    e.preventDefault();
    if (this.state.input == "") {
      console.log("Hmmmmm");
    } else {
      this.setState({
        input: "",
        date: "Next Year",
        wishList: [
          ...this.state.wishList,
          {
            name: this.state.input,
            date: this.state.date,
            isOnEdit: false,
            isEdit: false,
            isAchieved: false
          }
        ]
      });
    }
  };

  Edit = index => {
    if (this.state.wishList[index].isOnEdit) {
      this.state.wishList[index].isOnEdit = !this.state.wishList[index]
        .isOnEdit;
      this.setState({});
    } else {
      this.state.wishList[index].isOnEdit = !this.state.wishList[index]
        .isOnEdit;
      this.setState({});
    }
  };
  editWish = index => {
    if (this.state.wishList[index].isEdit) {
      this.state.wishList[index].isEdit = !this.state.wishList[index].isEdit;
      this.setState({});
    } else {
      this.state.wishList[index].isEdit = !this.state.wishList[index].isEdit;
      this.state.wishList[index].isOnEdit = !this.state.wishList[index]
        .isOnEdit;
      this.state.input = this.state.wishList[index].name;
      this.state.date = this.state.wishList[index].date;
      this.setState({});
    }
  };
  saveWishChange = index => {
    this.state.wishList[index].name = this.state.input;
    this.state.wishList[index].date = this.state.date;
    this.state.wishList[index].isEdit = !this.state.wishList[index].isEdit;
    this.setState({
      input: "",
      date: "Next Year"
    });
  };
  removeWish = index => {
    this.setState({
      ...this.state
    });
    this.state.wishList.splice(index, 1);
    console.log("HEY!");
  };

  setAchieved = index => {
    this.state.wishList[index].isAchieved = true;
    this.setState({});
  };
  setNotAchieved = index => {
    this.state.wishList[index].isAchieved = false;
    this.setState({});
  };

  achieveWish = toggleWish => {
    let wishes = this.state.wishList.map(wish => {
      if (wish.id === toggleWish.id) {
        return { ...wish, isAchieved: !wish.isAchieved };
      }
      return wish;
    });
  };

  render() {
    return (
      <HashRouter>
        <div className="app">
          <Header />
          <div className="scroller">
            <Route
              exact
              path="/"
              render={() => (
                <Home
                  wishes={this.state.wishList}
                  Edit={this.Edit}
                  closeEdit={this.closeEdit}
                  editWish={this.editWish}
                  getInput={this.setInput}
                  saveWishChange={this.saveWishChange}
                  getDate={this.getDate}
                  removeWish={this.removeWish}
                />
              )}
            />

            <Route
              path="/add-wish"
              render={() => (
                <AddWish
                  handleGetDate={this.getDate}
                  date={this.state.date}
                  inputValue={this.state.input}
                  handleSetInput={this.setInput}
                  handleAddWish={this.addWish}
                  testMes={this.test}
                />
              )}
            />

            <Route
              path="/progress"
              render={() => (
                <Progress
                  wish={this.state.wishList}
                  setAchieved={this.setAchieved}
                  setNotAchieved={this.setNotAchieved}
                />
              )}
            />

            <Route path="/about" component={About} />
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default App;
