import React, { useState } from "react";
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Icon,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import firebase from "../../firebase";

function Register() {
  const [form, setState] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    errors: [],
  });

  const handleChange = (e) => {
    setState({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const isFormValid = () => {
    let errors = [];
    let error;
    const username = form.username.toString();
    const email = form.email.toString();
    const password = form.password.toString();
    const passwordConfirmation = form.passwordConfirmation.toString();
    if (
      isFormEmpty(
        form.username,
        form.email,
        form.password,
        form.passwordConfirmation
      )
    ) {
      errors = { message: "please fill in all fields" };
      setState({ errors: form.errors.concat(error) });
      return false;
    } else if (!isPasswordValid(form.password, form.passwordConfirmation)) {
      errors = { message: "Password is invalid" };
      setState({ errors: form.errors.concat(error) });
      return false;
    } else {
    }
  };

  const isFormEmpty = (username, email, password, passwordConfirmation) => {
    return (
      !username.length ||
      !email.length ||
      !password.length ||
      !passwordConfirmation.length
    );
  };

  const isPasswordValid = (password, passwordConfirmation) => {
    if (password.length < 6 || passwordConfirmation.length < 6) {
      return false;
    } else if (password !== passwordConfirmation) {
      return false;
    } else {
      return true;
    }
  };

  const displayError = (error) => {
    error.map((err, idx) => {
      <p key={idx}>{error.message}</p>;
    });
  };
  const handleSubmit = (e) => {
    if (
      isFormEmpty(
        form.username,
        form.email,
        form.password,
        form.passwordConfirmation
      )
    ) {
      e.preventDefault();
      firebase
        .auth()
        .createUserWithEmailAndPassword(form.email, form.password)
        .then((createUser) => {
          console.log(createUser);
        })
        .catch((err) => {
          console.err(err);
        });
    }
  };

  return (
    <Grid className="app" textAlign="center" verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header color="blue">
          <Icon.Group size="huge">
            <Icon loading size="big" name="circle notch" />
            <Icon name="user" />
          </Icon.Group>
          <br></br>
          <br></br>
          Register For Slack Chat
        </Header>
        <Form onSubmit={handleSubmit} size="large">
          <Segment stacked>
            <Form.Input
              fluid
              name="username"
              icon="user"
              iconPosition="left"
              placeholder="Username"
              onChange={handleChange}
              value={form.username}
              type="text"
            />
            <Form.Input
              fluid
              name="email"
              icon="mail"
              iconPosition="left"
              placeholder="Email Address"
              onChange={handleChange}
              value={form.email}
              type="email"
            />
            <Form.Input
              fluid
              name="password"
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              onChange={handleChange}
              value={form.password}
              type="password"
            />
            <Form.Input
              fluid
              name="passwordConfirmation"
              icon="repeat"
              iconPosition="left"
              placeholder="Password Confirmation"
              onChange={handleChange}
              value={form.passwordConfirmation}
              type="password"
            />
            <Button color="blue" fluid size="large">
              Submit
            </Button>
            {form.errors.length > 0 && (
              <Message error>
                <h3>Error</h3>
                {displayError(form.errors)}
              </Message>
            )}
            <Message>
              Already a user?
              <Link to="/login">Login</Link>
            </Message>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  );
}

export default Register;
