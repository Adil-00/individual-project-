import React from "react";
import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { dishesContext } from "../context/DishesContext";
import "./NavigationPanel.css";

const NavigationPanel = () => {
  const { handleGetDishes } = useContext(dishesContext);
  const history = useHistory();

  const handleFilter = (e) => {
    const search = new URLSearchParams(history.location.search);
    history.push("/");
    switch (e.target.dataset.name) {
      case "все":
        history.push(`${history.location.pathname.replace("category")}`);
        break;
      case "пиццы":
        search.set("category", e.target.dataset.name);
        search.set("_page", 1);
        history.push(`${history.location.pathname}?${search.toString()}`);
        break;
      case "суши":
        search.set("category", e.target.dataset.name);
        search.set("_page", 1);
        history.push(`${history.location.pathname}?${search.toString()}`);
        break;
      case "бургеры":
        search.set("category", e.target.dataset.name);
        search.set("_page", 1);
        history.push(`${history.location.pathname}?${search.toString()}`);
        break;
      case "завтраки":
        search.set("category", e.target.dataset.name);
        search.set("_page", 1);
        history.push(`${history.location.pathname}?${search.toString()}`);
        break;
      case "обед":
        search.set("category", e.target.dataset.name);
        search.set("_page", 1);
        history.push(`${history.location.pathname}?${search.toString()}`);
        break;
      case "ужин":
        search.set("category", e.target.dataset.name);
        search.set("_page", 1);
        history.push(`${history.location.pathname}?${search.toString()}`);
        break;
      default:
        history.push(`${history.location.pathname.replace("category")}`);
        break;
    }
    handleGetDishes(history);
  };

  return (
    <div className="navigation">
      <button onClick={handleFilter} data-name="все" className="nav">
        Все
      </button>

      <button onClick={handleFilter} data-name="пиццы" className="nav">
        Пиццы
      </button>

      <button onClick={handleFilter} data-name="суши" className="nav">
        Суши
      </button>

      <button onClick={handleFilter} data-name="бургеры" className="nav">
        Бургеры
      </button>

      <button onClick={handleFilter} data-name="завтраки" className="nav">
        Завтраки
      </button>

      <button onClick={handleFilter} data-name="обед" className="nav">
        Обед
      </button>

      <button onClick={handleFilter} data-name="ужин" className="nav">
        Ужин
      </button>
    </div>
  );
};

export default NavigationPanel;
