export const fetchTodos = async () => {
  const response = await fetch("http://localhost:3000/todos");
  return await response.json();
};
