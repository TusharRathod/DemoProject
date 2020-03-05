import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Button } from "@material-ui/core";
import { removeTodo } from "../../actions/TodoActions";

function mapStateToProps(state) {
  return {
    state
  };
}

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: []
    };
  }
  delete = id => {
    this.props.dispatch(removeTodo(id));
  };
  render() {
    var { state } = this.props;
    return (
      <Fragment>
        <div style={styles.container}>
          <ul>
            {state.todos.map((todo, index) => (
              <Fragment key={index}>
                <li>
                  <span>{todo.name}</span>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => this.delete(todo.id)}
                    size="small"
                    style={{ marginLeft: 50 }}
                  >
                    Delete
                  </Button>
                </li>
                <hr />
              </Fragment>
            ))}
          </ul>
        </div>
      </Fragment>
    );
  }
}
const styles = {
  container: {
    width: "100%",
    display: "flex",
    justifyContent: "center"
  }
};

export default connect(mapStateToProps)(TodoList);
