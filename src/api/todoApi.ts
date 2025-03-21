export const fetchTodos = async () => {
  const response = await fetch("http://localhost:3000/todos");
  return await response.json();
};

export const addTodo = async (todo: any) => {
  await fetch("http://localhost:3000/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });
};

export const deleteTodo = async (todoId: string) => {
  await fetch(`http://localhost:3000/todos/${todoId}`, {
    method: "DELETE",
  });
};

export const updateTodo = async (todo: any) => {
  await fetch(`http://localhost:3000/todos/${todo.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });
};
