import React, { useContext } from "react";
import { FiltersContext } from "../../TodoApp";

export const Filters = () => {
  const { filters, handleFilterChange } = useContext(FiltersContext)
  const { search, type } = filters

  const searchChange = (e) => {
    handleFilterChange('search', e.target.value)
  }

  const typeChange = (e) => {
    handleFilterChange('type', e.target.value)
  }

  return (
    <div className="filters">
      <input type="text" className="text-input" placeholder="Search" value={search} onChange={searchChange} />
      <select className="type-select" value={type} onChange={typeChange} >
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="incompleted">Incompleted</option>
      </select>
    </div>
  );
};
