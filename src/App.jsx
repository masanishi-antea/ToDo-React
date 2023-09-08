import React, { useState } from "react";
import "./styles.css";
import { InputTodo } from "./components/InputTodo";
import { IncompleteTodos } from "./components/IncompleteTodos";
import { CompleteTodos } from "./components/CompleteTodos";

export const App = () => {
  const [todoText, setTodoText] = useState("");
  const [incompleteTodos, setInconmpleteTodos] = useState([]);
  const [completeTodos, setCompleteTodos] = useState([]);

  // 入力情報を取得する
  const onChangeTodoText = (event) => setTodoText(event.target.value);
  // 追加ボタンクリック処理
  const onClickAdd = () => {
    if (todoText === "") return;
    const newTodos = [...incompleteTodos, todoText];
    setInconmpleteTodos(newTodos);
    setTodoText("");
  };

  // 削除ボタンクリック処理
  const onClickDelete = (index) => {
    const newTodos = [...incompleteTodos];
    newTodos.splice(index, 1); // index番目の要素を1個削除する
    setInconmpleteTodos(newTodos);
  };

  // 完了ボタンクリック処理
  const onClickComplete = (index) => {
    const newIncompeleteTodos = [...incompleteTodos];
    newIncompeleteTodos.splice(index, 1); // index番目の要素を1個削除する
    setInconmpleteTodos(newIncompeleteTodos);

    const newCompeleteTodos = [...completeTodos, incompleteTodos[index]];
    setCompleteTodos(newCompeleteTodos);
  };

  // 戻すボタンクリック処理
  const onClickBack = (index) => {
    const newCompleteTodos = [...completeTodos];
    newCompleteTodos.splice(index, 1);

    const newIncompeleteTodos = [...incompleteTodos, completeTodos[index]];
    setCompleteTodos(newCompleteTodos);
    setInconmpleteTodos(newIncompeleteTodos);
  };

  return (
    <>
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
        disabled={incompleteTodos.length >= 5}
      />
      {incompleteTodos.length >= 5 && (
        <p style={{ color: "red" }}>登録できるToDoは5個までとなっています</p>
      )}
      <IncompleteTodos
        todos={incompleteTodos}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
      />

      <CompleteTodos todos={completeTodos} onClickBack={onClickBack} />
    </>
  );
};
