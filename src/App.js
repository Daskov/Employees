import React, { useEffect, Fragment } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Registration from "./pages/Registration";
import UsersTable from "./components/UsersTable";
import { useDispatch, useSelector } from "react-redux";
import { setIsAdmin, setIsAuth } from "./store/userSlice";
import NotFound from "./pages/NotFound";
import EditUser from "./pages/EditUser";

const App = () => {
  const { isAdmin, isAuth } = useSelector(({ userSlice }) => userSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("authorized"));
    dispatch(setIsAuth(!!user));
    if (!user) return navigate("/login");
    dispatch(setIsAdmin(user.admin));
  }, []);

  return (
    <Fragment>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        {!isAuth && <Route path="/login" element={<Login />} />}
        <Route path="/registration" element={<Registration />} />
        {isAdmin && <Route path="/admin" element={<UsersTable />} />}
        {isAdmin && <Route path="/admin-edit/:id" element={<EditUser />} />}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Fragment>
  );
};

export default App;
