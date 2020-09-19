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
    loading: false,
  });

  const database = firebase.database();

  const handleChange = (e) => {
    setState({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const isFormValid = () => {
    let errors = [];
    let error;
    let result = false;
    if (
      !isFormEmpty(
        form.username,
        form.email,
        form.password,
        form.passwordConfirmation
      )
    ) {
      error = { message: "please fill in all fields" };
      setState({ ...form, errors: errors.concat(error) });
      result = false;
    } else if (!isPasswordValid(form.password, form.passwordConfirmation)) {
      error = { message: "Password is invalid" };
      setState(...form, { errors: errors.concat(error) });
      result = false;
    } else {
      result = true;
    }
    return result;
  };

  const isFormEmpty = (username, email, password, passwordConfirmation) => {
    let isFormEmpty = false;
    if (
      username === "" ||
      email === "" ||
      password === "" ||
      passwordConfirmation === ""
    ) {
      isFormEmpty = false;
    } else {
      isFormEmpty = true;
    }
    return isFormEmpty;
  };

  const isPasswordValid = (password, passwordConfirmation) => {
    let isPassWord = password || [];
    let isPassWordConfirmation = passwordConfirmation || [];
    if (isPassWord.length < 6 || isPassWordConfirmation.length < 6) {
      return false;
    } else if (isPassWord !== isPassWordConfirmation) {
      return false;
    } else {
      return true;
    }
  };

  const displayError = (error) => {
    const displayError = error || [];
    return displayError.map((element, index) => {
      return <p key={index}>{element.message}</p>;
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      setState(...form, { errors: [], loading: true });
      firebase
        .auth()
        .createUserWithEmailAndPassword(form.email, form.password)
        .then((createUser) => {
          console.log(createUser);
          setState(...form, { errors: [], loading: false });

          let date = new Date();
          let now = date.getTime();
          database
            .ref(createUser.uid)
            .set({
              signup: now,
              email: form.email,
            })
            .then(() => {});
        })
        .catch((err) => {
          console.log(err);
          setState(...form, {
            errors: form.errors.concat(err),
            loading: false,
          });
        });
    }
  };

  const handleInputError = (errors, inputName) => {
    let inputError = errors || [];
    return inputError.some((error) =>
      error.message.toLowerCase().includes(inputName)
    )
      ? "error"
      : "";
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
              className={handleInputError(form.errors, "email")}
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
              className={handleInputError(form.errors, "password")}
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
              className={handleInputError(form.errors, "password")}
            />
            <Button
              disabled={form.loading}
              className={form.loading ? "loading" : ""}
              color="blue"
              fluid
              size="large"
            >
              Submit
            </Button>
          </Segment>
        </Form>
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
      </Grid.Column>
    </Grid>
  );
}

export default Register;
