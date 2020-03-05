import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { addTodo } from "../../actions/TodoActions";
import { TextField } from "@material-ui/core";

class TodoApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
  }
  todos = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  addTodo = () => {
    console.log(addTodo(this.state.name));
    if (this.state.name) {
      this.setState({ name: "" });
      this.props.dispatch(addTodo(this.state.name));
    } else {
      window.alert("Name is required");
    }
  };
  render() {
    return (
      <Fragment>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "5%"
          }}
        >
          <TextField
            id="standard-required"
            label="Name"
            name="name"
            value={this.state.name}
            onChange={this.todos}
            onKeyPress={event => {
              if (event.key === "Enter") {
                this.addTodo();
              }
            }}
            style={{ width: "40%" }}
          />
        </div>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(TodoApp);
