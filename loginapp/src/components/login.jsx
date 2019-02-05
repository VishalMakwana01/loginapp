import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Redirect, withRouter } from "react-router-dom";

import Home from "./home";

class Login extends Component {
  state = {
    fields: {},
    errors: {},
    value: 0,
    isLoaded: false,
    items: [],
    datamail: [],
    datapass: [],
    emailuser: "",
    passuser: ""
  };

  handleChange = e => {
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    this.setState({ fields });
  };
  submituserRegistrationForm = e => {
    e.preventDefault();
    const { items, datamail, datapass } = this.state;
    let dataemail = this.state.items.map(function(person) {
      return person.emailid;
    });
    this.setState({ datamail: dataemail });
    let datapassword = this.state.items.map(function(person) {
      return person.password;
    });
    this.setState({ datapass: datapassword });
    if (this.validateForm()) {
      let emailuser = this.state.fields["emailid"];
      let passuser = this.state.fields["password"];

      let fields = {};
      fields["emailid"] = "";
      fields["password"] = "";
      this.setState({
        emailuser: emailuser,
        passuser: passuser,
        fields: fields,
        value: 1
      });
      alert("Form submitted");
    }
  };

  validateForm = () => {
    const { items, datamail, datapass } = this.state;

    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    if (!fields["emailid"]) {
      formIsValid = false;
      errors["emailid"] = "*Please enter your email-ID.";
    }

    if (typeof fields["emailid"] !== "undefined") {
      //regular expression for email validation
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(fields["emailid"])) {
        formIsValid = false;
        errors["emailid"] = "*Please enter valid email-ID.";
      }
    }

    if (!fields["password"]) {
      formIsValid = false;
      errors["password"] = "*Please enter your password.";
    }

    for (var i = 0; i < 3; i++) {
      if (
        datamail[i] == fields["emailid"] &&
        datapass[i] == fields["password"]
      ) {
        formIsValid = true;
        break;
      } else if (i < 2) {
        formIsValid = false;
        continue;
      }
      if ((i = 2)) {
        formIsValid = false;
        errors["password"] = "Invalid Credentials";
      }
    }

    this.setState({
      errors: errors
    });
    return formIsValid;
  };
  componentDidMount() {
    fetch("/users.JSON")
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          items: json
        });
      });
  }
  render() {
    var { items, isLoaded, data } = this.state;

    return (
      <React.Fragment>
        <Router>
          <div>
            <Route
              exact
              path="/"
              render={() => {
                return (
                  <div id="main-registration-container">
                    <div id="register">
                      <h3>Login page</h3>
                      <form
                        method="post"
                        name="userRegistrationForm"
                        onSubmit={this.submituserRegistrationForm}
                      >
                        <label>Email ID:</label>
                        <input
                          required
                          type="text"
                          name="emailid"
                          value={this.state.fields.emailid}
                          onChange={this.handleChange}
                        />
                        <div className="errorMsg">
                          {this.state.errors.emailid}
                        </div>

                        <label>Password</label>
                        <input
                          required
                          type="password"
                          name="password"
                          value={this.state.fields.password}
                          onChange={this.handleChange}
                        />
                        <div className="errorMsg">
                          {this.state.errors.password}
                        </div>

                        <input type="submit" className="button" value="Login" />
                      </form>
                      {this.state.value ? (
                        <Redirect to="/home" />
                      ) : (
                        <Redirect to="/" />
                      )}
                    </div>
                    <ul>
                      {items.map(item => (
                        <li key={item.id}>
                          Email:{item.emailid} | Password:{item.password}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              }}
            />
            <Route
              path="/home"
              render={() => {
                return (
                  <React.Fragment>
                    <div
                      style={{
                        textAlign: "center",
                        alignItems: "center",
                        alignContent: "center"
                      }}
                    >
                      <h1>Email:{this.state.emailuser}</h1>
                      <h1>Password:{this.state.passuser}</h1>
                    </div>
                  </React.Fragment>
                );
              }}
            />
          </div>
        </Router>
      </React.Fragment>
    );
  }
}

export default Login;
