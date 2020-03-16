import React from 'react';
import "./login_styles.scss";
import Input from '../../components/input/input';
import Button from '../../components/button/button';
import { Link, Redirect } from 'react-router-dom';
import { IoIosUndo } from 'react-icons/io';
import Send from '../../helpers/send';
import ErrorPage from '../errors/error';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.tryLogin = this.tryLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      validate: {
        username: false,
        password: false
      },
      values: {
        username: "",
        password: ""
      },
      loginResult: null,
      error: {
        hasError: false,
        code: "401"
      }
    };
  };

  tryLogin(event) {
    event.preventDefault();

    if (!this.state.validate.username || !this.state.validate.password) {
      return alert("Alle velden moeten ingevuld worden.");
    };

    const values = {
      name: this.state.values.username,
      password: this.state.values.password
    };

    try {
      Send.Login(values)
      .then(res => {
        console.log(res);
        this.setState({
          loginResult: res
        });
        if (res.token) {
          alert("Gelukt!");
          return <Redirect to={{
            pathname: "/admin",
            state: this.state.result
          }} />;
        } else {
          console.error(res);
          return alert("Login niet gelukt!");
        }
      }).catch(err => {
        this.setState({
          error: {
            ...this.state.error,
            hasError: true
          }
        });
        return console.error(err);
      });
    } catch (err) {
      this.setState({
        error: {
          ...this.state.error,
          hasError: true
        }
      });
      console.error(err);
    };
  };

  handleChange(event) {
    let isIncluded = false;
    let needsToBeChanged = false;

    if (this.state.validate.hasOwnProperty(event.target.name)) {
      isIncluded = true;
    };

    if (isIncluded) {
      if (event.target.value.length > 0) {
        needsToBeChanged = true;
      } else {
        needsToBeChanged = false;
      };
    };

    if (isIncluded) {
      if (needsToBeChanged) {
        this.setState({
          values: {
            ...this.state.values,
            [event.target.name]: event.target.value
          },
          validate: {
            ...this.state.validate,
            [event.target.name]: true
          }
        });
      } else {
        this.setState({
          values: {
            ...this.state.values,
            [event.target.name]: event.target.value
          },
          validate: {
            ...this.state.validate,
            [event.target.name]: false
          }
        });
      };
    } else {
      this.setState({
        values: {
          ...this.state.values,
          [event.target.name]: event.target.value
        }
      });
    }
  };

  render() {
    return (
      <React.Fragment>
        {
          this.state.error.hasError ? (
            <ErrorPage code={ this.state.error.code } />
          ) : (
          <div className="login__wrapper">
            <Link to="/" className="login__return-link">
              <IoIosUndo className="login__icon" />
              <span>Terug</span>
            </Link>
            <form method="POST" onSubmit={ this.tryLogin } className="login__form">
              <Input name="username" label="Gebruiksnaam" onChange={ this.handleChange }
                color={ this.state.validate.username ? "success" : "danger" } mandatory data-val="name" type="text"
                wrapperClasses="login__input-wrapper" value={ this.state.values.username }
              />

              <Input name="password" label="Wachtwoord" onChange={ this.handleChange }
                color={ this.state.validate.password ? "success" : "danger" } mandatory data-val="password" type="password"
                wrapperClasses="login__input-wrapper" value={ this.state.values.password }
              />

              <Button color="white" classes="login__button" type="submit">Login</Button>
            </form>
          </div>
          )
        }
      </React.Fragment>
    );
  };
};

export default Login;
