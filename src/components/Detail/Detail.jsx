import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { authContex } from "../Auth/AuthContex";
import { dishesContext } from "../context/DishesContext";
import Header from "../Header/Header";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import "./Detail.css";

const Detail = () => {
  const { detail, handleSaveEditDishes, handleOrder } =
    useContext(dishesContext);
  const { user, ADMIN } = useContext(authContex);
  const [commit, setCommit] = useState("");
  const [dishes, setDishes] = useState(false);
  const [flagComments, setFlagComments] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (detail.commit) {
      if (detail.commit.length > 0) {
        setDishes(true);
      } else {
        setDishes(false);
      }
    }
  }, [detail]);

  let time = new Date(Date.now());
  let arr = [];
  arr.push(time.toString().split(" "));
  let newArr = arr[0].slice(1, 5).join(" ");

  console.log(commit.length);

  const handleCommit = (id) => {
    if (commit.length <= 0) {
      return;
    }

    let obj = {
      user: user[0].login,
      commit: commit,
      time: newArr,
      id:
        Math.ceil(Math.random() * 9999999999999) +
        Math.ceil(Math.random() * 88888888888888888) +
        Math.ceil(Math.random() * 5555555555) +
        Date.now(),
    };

    setCommit("");
    detail.commit.push(obj);
    handleSaveEditDishes(detail, id, history);
    if (detail.commit.length > 0) {
      setDishes(true);
    } else {
      setDishes(false);
    }
  };

  const handleCommets = () => {
    setFlagComments(!flagComments);
  };

  const handleDeleteCommit = (id) => {
    let newArr = detail.commit.filter((item) => {
      if (item.id !== id) {
        return item;
      }
    });

    detail.commit = newArr;

    console.log(detail);
    handleSaveEditDishes(detail, detail.id, history);
  };

  const handleGoBack = () => {
    history.goBack();
  };

  return (
    <>
      <Header />
      <div className="detail">
        <div className="container">
          <div className="detail_content">
            <Link to="/">
              <div className="detail_exit-btn">
                <HighlightOffIcon
                  className="detail_btn-exit"
                  fontSize="large"
                ></HighlightOffIcon>
              </div>
            </Link>
            <div className="detail_row">
              <div className="detail_col">
                <div>
                  <div
                    className="detail_img"
                    style={{
                      background: `url(${detail.image}) no-repeat`,
                    }}
                  ></div>
                </div>
                <div className="detaeil_content_text">
                  <div className="detail_content_title text">
                    <span>Название :</span>
                    {detail.title}
                  </div>
                  <div className="detail_content_price text">
                    <span>Цена :</span>
                    {detail.price} <span>сом</span>
                  </div>
                  <div className="detail_content_structure text">
                    <span>Состав :</span>
                    {detail.structure}
                  </div>
                  <div className="detail_content_weight text">
                    <span>Вес :</span>
                    {detail.weight}г
                  </div>
                  <div className="detail_content_calories text">
                    <span>Калории :</span>
                    {detail.calories} <span>ккал</span>
                  </div>
                  <Link
                    onClick={() => handleOrder(detail.id)}
                    style={{ textDecoration: "none" }}
                    to="/order"
                  >
                    <div className="detail_box_btn_order detail_mobilion_top">
                      <button className="detail_btn_order">Заказать</button>
                    </div>
                  </Link>
                </div>
                {flagComments ? null : (
                  <div
                    className={`detail_commit_btn detail_mobilion_btn_bottom`}
                  >
                    <button
                      onClick={handleCommets}
                      className="detail_commit-btn"
                    >
                      Коментарии
                    </button>
                  </div>
                )}
              </div>
              <div className="detail_content_col2">
                <div className="detail_user-comments">
                  {dishes
                    ? detail.commit.map((item) => (
                        <div className="detail_coments text">
                          <div className="detail_coments-btn">
                            {user.length > 0 ? (
                              user[0].login === ADMIN ? (
                                <HighlightOffIcon
                                  className="detail_delete-btn"
                                  onClick={() => handleDeleteCommit(item.id)}
                                >
                                  delete
                                </HighlightOffIcon>
                              ) : null
                            ) : null}
                          </div>
                          <div>
                            <p>{item.user}</p>
                            <p>{item.commit}</p>
                            <p>{item.time}</p>
                          </div>
                        </div>
                      ))
                    : null}
                </div>
                {user.length > 0 ? (
                  <>
                    <div className="detail_inp-comments">
                      <div className="detail_box-comment">
                        <textarea
                          className="detail_comment"
                          onChange={(e) => setCommit(e.target.value)}
                          name="comment"
                          value={commit}
                          cols="50"
                          rows="5"
                        ></textarea>
                      </div>
                      <button
                        onClick={() => handleCommit(detail.id)}
                        className="detail_commit-btn"
                      >
                        Commit
                      </button>
                    </div>
                  </>
                ) : null}
              </div>
              {flagComments ? (
                <div className="detail_content_col2 detail_col2_mobilion">
                  <div className="detail_user-comments">
                    {dishes
                      ? detail.commit.map((item) => (
                          <div className="detail_coments text">
                            <div className="detail_coments-btn">
                              {user.length > 0 ? (
                                user[0].login === ADMIN ? (
                                  <HighlightOffIcon
                                    className="detail_delete-btn"
                                    onClick={() => handleDeleteCommit(item.id)}
                                  >
                                    delete
                                  </HighlightOffIcon>
                                ) : null
                              ) : null}
                            </div>
                            <div>
                              <p>{item.user}</p>
                              <p>{item.commit}</p>
                              <p>{item.time}</p>
                            </div>
                          </div>
                        ))
                      : null}
                  </div>
                  {user.length > 0 ? (
                    <>
                      <div className="detail_inp-comments">
                        <div className="detail_box-comment">
                          <textarea
                            className="detail_comment"
                            onChange={(e) => setCommit(e.target.value)}
                            name="comment"
                            value={commit}
                            cols="20"
                            rows="5"
                          ></textarea>
                        </div>
                        <button
                          onClick={() => handleCommit(detail.id)}
                          className="detail_commit-btn"
                        >
                          Commit
                        </button>
                      </div>
                    </>
                  ) : null}
                  <div
                    className={`detail_commit_btn detail_mobilion_btn_bottom`}
                  >
                    <button
                      onClick={handleCommets}
                      className="detail_commit-btn"
                    >
                      Закрыть коментарии
                    </button>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
            <Link
              onClick={() => handleOrder(detail.id)}
              style={{ textDecoration: "none" }}
              to="/order"
            >
              <div className="detail_box_btn_order">
                <button className="detail_btn_order">Заказать</button>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail;
