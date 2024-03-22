import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import axios from "axios";
import "./styles.scss";
import { csrfToken } from "./util/functions";
import { Layout } from "./layout/Layout";
import { Dashboard } from "./pages/Dashboard";

// TODO: later
export const UserContext = React.createContext();

export const TodosContext = React.createContext(null)
export const FiltersContext = React.createContext(null)

const queryClient = new QueryClient();

// TODO: add token only for post/put/delete
axios.interceptors.request.use(
  (config) => {
    config.headers["X-CSRF-TOKEN"] = csrfToken();
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (res) => res,
  (error) => {
    if ([401].includes(error.response.status)) {
      window.location.href = "/";
    }
  }
);

// TODO: add routes here
const TodoApp = () => {
  const [todos, setTodos] = useState([])
  const [filters, setFilters] = useState({ search: '', type: 'all' })

  const handleTodosChange = (newTodos) => {
    setTodos(newTodos)
    setFilters(Object.assign({...filters}))
  }

  const handleFilterChange = (type, value) => {
    const newFilters = Object.assign({...filters}, { [type]: value })
    setFilters(newFilters)
  }

  return (
    <UserContext.Provider value={window.USER || {}}>
      <TodosContext.Provider value={{ todos, handleTodosChange }}>
        <FiltersContext.Provider value={{ filters, handleFilterChange }}>
          <QueryClientProvider client={queryClient}>
            <BrowserRouter>
              <Routes>
                <Route element={<Layout />}>
                  <Route index element={<Dashboard />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </QueryClientProvider>
        </FiltersContext.Provider>

      </TodosContext.Provider>

    </UserContext.Provider>
  );
}

export default TodoApp
