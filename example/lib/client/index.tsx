import React, { Fragment, render, memo } from "react";
import { observer, useComputation } from "alo/react";
import { setProp } from "alo";
import { Store, Mutator } from "alo/store";
import { attachStoreToDevtools, Devtools } from "alo/devtools";

let nextTodoId = 0;

new Devtools();

const mutator = new Mutator({
  createState: function () {
    return {
      todoText: "",
      todos: {} as Record<
        string | number,
        { id: string | number; text: string; done: boolean }
      >,
    };
  },
});

const addTodo = mutator.set("addTodo", (state) => {
  if (!state.todoText) return;

  const id = nextTodoId++;
  setProp(state.todos, id, {
    id,
    text: state.todoText,
    done: false,
  });
  state.todoText = "";
});

const setTodoText = mutator.setWithPayload("setTodoText", (state, action) => {
  state.todoText = action.payload;
});

const setTodoDone = mutator.setWithPayload("setTodoDone", (state, action) => {
  state.todos[action.payload].done = true;
});

const store = new Store({ mutator });

attachStoreToDevtools({ store });

const Todos = memo(
  observer(() => {
    const computed = useComputation(() => {
      return {
        todos: () =>
          Object.values(store.getState().todos).filter((todo) => !todo.done),
      };
    });

    return (
      <ul style={{ padding: "0", listStyle: "none" }}>
        {computed.todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              onChange={() => store.dispatch(setTodoDone(todo.id))}
            />{" "}
            {todo.text} {Math.random()}
          </li>
        ))}
      </ul>
    );
  })
);

const App = observer(() => {
  const state = store.getState();

  return (
    <Fragment>
      <input
        value={state.todoText}
        onKeyUp={(e) => e.keyCode === 13 && store.dispatch(addTodo())}
        onInput={(e) => store.dispatch(setTodoText(e.target.value))}
      />{" "}
      &nbsp;
      <button onClick={() => store.dispatch(addTodo())}>Add todo</button>
      <Todos />
    </Fragment>
  );
});

if (typeof window !== "undefined") {
  render(<App />, document.getElementById("root"));
}
