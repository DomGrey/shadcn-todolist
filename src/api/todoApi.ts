export const fetchTodos = async () => {
  const response = await fetch(
    "https://wholesale-amusing-sandalwood.glitch.me/todos"
  );
  return await response.json();
};

export const addTodo = async (todo: any) => {
  await fetch("https://wholesale-amusing-sandalwood.glitch.me/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });
};

export const deleteTodo = async (todoId: string) => {
  await fetch(
    `https://wholesale-amusing-sandalwood.glitch.me/todos/${todoId}`,
    {
      method: "DELETE",
    }
  );
};

export const updateTodo = async (todo: any) => {
  await fetch(
    `https://wholesale-amusing-sandalwood.glitch.me/todos/${todo.id}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todo),
    }
  );
};
