// Импортируем необходимые модули и функции
import React, { useEffect } from "react";
import { TodoForm } from "./TodoForm";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodo, deleteTodo,  } from "../../store/actions/firebase-todo-actions";

// Компонент TodoList
export const TodoList = () => {
  const dispatch = useDispatch();
  const { todos } = useSelector((state) => state.firebaseTodo);

  useEffect(() => {
    dispatch(fetchTodo());
  }, [dispatch]);

  const deleteHandle = (id) => {
    dispatch(deleteTodo(id));
  };

  const toggleCompleted = (id) => {
    dispatch({ type: 'CHECK', payload: id });
  };


//   const editOpenHandler=(data)=>{
//     const result={
// ...data,
// edit:true,
//     }
//     dispatch(putEditOpenTodo(result))
//   }

//   const editSaveHandler=(data,title)=>{
//     const result={
//       ...data,
//       edit:false,
//       title:title,

//     }
//     dispatch(putEditSaveTodo(result))
//   }

  return (
    <div>
      <TodoForm />

      {todos.map((todo) => (
        <div key={todo.id}>
          <p style={{ textDecoration: todo.completed ? "line-through" : null }}>
            {todo.title}
          </p>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleCompleted(todo.id)}
          />
          <button onClick={() => deleteHandle(todo.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};
