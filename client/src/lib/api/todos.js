export const fetchTodos = async (url) => {
  const response = await fetch(`${url}/todos`);
  return response.json();
};

export const addTodo = async (url, todo) => {
  const response = await fetch(`${url}/todos`, {
    method: 'POST',
    headers: { 'content-Type': 'application/json' },
    body: JSON.stringify(todo)
  });
  return response.json();
};

export const deleteTodo = async (url, id) => {
  const response = await fetch(`${url}/todos/${id}`, {
    method: 'DELETE'
  });
  return response.json();
};

export const toggleCompletedTodo = async (url, id, completed) => {
  const response = await fetch(`${url}/todos/${id}`, {
    method: 'PATCH',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(completed)
  });
  return response.json();
};

export const toggleCompletedAllTodo = async (url, newStatus) => {
  const response = await fetch(`${url}/todos`, {
    method: 'PATCH',
    headers: { 'content-Type': 'application/json' },
    body: JSON.stringify({ completed: newStatus })
  });
  return response.json();
};

export const clearCompletedTodos = async (url) => {
  const response = await fetch(`${url}/todos`, {
    method: 'DELETE'
  });
  return response.json();
};
