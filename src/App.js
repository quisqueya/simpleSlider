import React, { Component } from "react";
import { Route, Switch, Link, withRouter } from "react-router-dom";
import { Transition } from "react-transition-group";

import "./App.css";
import "./PageSliderMgr.css";

// Deploy step prep for Heroku
// -make sure proper versions of node, npm, git
// -install heroku cli (if it is not installed)
// login to heroku in terminal
// >heroku login

// git init
// heroku create -b https://github.com/mars/create-react-app-buildpack.git
// git add .
// git commit -m "react-create-app on Heroku"
// git push heroku master
// heroku open



class App extends Component {

  render() {
    return (
      <div className="App">
        <div
          className="nav bg-primary"
          style={{ textAlign: "center", padding: "5px" }}
        >
          <span style={{ padding: "5px" }}>
            <Link
              className="btn btn-danger btn-lg"
              to={{
                pathname: "/",
                state: { prevPath: this.props.location.pathname },
              }}
            >
              Home
            </Link>
          </span>
          <span style={{ padding: "5px" }}>
            <Link
              className="btn btn-danger btn-lg"
              to={{
                pathname: "/about",
                state: { prevPath: this.props.location.pathname },
              }}
            >
              About
            </Link>
          </span>
          <span style={{ padding: "5px" }}>
            <Link
              className="btn btn-danger btn-lg"
              to={{
                pathname: "/contact",
                state: { prevPath: this.props.location.pathname },
              }}
            >
              Contact
            </Link>
          </span>
        </div>
        <Switch>
          <Route
            path="/about"
            exact
            render={(props) => <PageSliderMgr {...props} thePath={"/about"} />}
          ></Route>
          <Route
            path="/contact"
            render={(props) => (
              <PageSliderMgr {...props} thePath={"/contact"} />
            )}
          ></Route>
          <Route
            path="/"
            render={(props) => <PageSliderMgr {...props} thePath={"/"} />}
          ></Route>
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);


/*   */
class PageSliderMgr extends Component {
  slidePages = () => {
    // get the path to the page to be display
    let thepath = this.props.thePath;

    // get the path to the previous page
    let oldpath = "";
    if (this.props.location.state) {
      oldpath = this.props.location.state.prevPath;
    }

    // holds a reference to the component to be
    // animated into the display
    let show = null;

    switch (thepath) {
      case "/":
        show = <Home />;
        break;
      case "/about":
        show = <About />;
        break;
      case "/contact":
        show = <Contact />;
        break;
      default:
        show = null;
    }
    // holds a reference to the component to
    // be animated out of the display
    let hide = null;
    switch (oldpath) {
      case "/":
        hide = <Home />;
        break;
      case "/about":
        hide = <About />;
        break;
      case "/contact":
        hide = <Contact />;
        break;
      default:
        hide = null;
    }

    let display = null;

    if (thepath === oldpath) {
      display = <div className="show">{show}</div>;

      return display;
    }

    display = (
      <React.Fragment>
        <Transition in={true} timeout={500} appear>
          {(status) => <div className={`show show-${status}`}>{show}</div>}
        </Transition>
        <Transition in={true} timeout={500} appear>
          {(status) => <div className={`hide hide-${status}`}>{hide}</div>}
        </Transition>
      
        </React.Fragment>
    );
    return display;


  };
  render() {
    //   if (this.state.redirect) {
    //     return <section>{this.slidePages(true)}</section>;
    //   }
    return <section>{this.slidePages()}</section>;
  }
}

class About extends Component {
  render() {
    return (
      <section>
        <h1>About Page Route</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
          labore quia iure culpa? Natus consequuntur quod suscipit. Culpa
          aliquam suscipit natus neque commodi adipisci dolorum.
        </p>
      </section>
    );
  }
}
class Contact extends Component {
  render() {
    return (
      <section>
        <h1>Contact Page Route</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
          labore quia iure culpa? Natus consequuntur quod suscipit. Culpa
          aliquam suscipit natus neque commodi adipisci dolorum.
        </p>
      </section>
    );
  }
}
class Home extends Component {
  render() {
    return (
      <section>
        <h1>Home Page Route</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
          labore quia iure culpa? Natus consequuntur quod suscipit. Culpa
          aliquam suscipit natus neque commodi adipisci dolorum.
        </p>
      </section>
    );
  }
}