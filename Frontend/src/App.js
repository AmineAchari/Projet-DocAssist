import "./App.css";
import React from "react";
// import {Header,Container,Footer} from './Components/index'
import UserStore from "./Login/UserStore";
import LoginForm from "./Login/LoginForm/LoginForm";
// import InputField from './Login/InputField'
// import SubmitButton from './Login/SubmitButton/SubmitButton'
import SideBar from "./Components/SideBar";
import { observer } from "mobx-react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Accueil from "./pages/Accueil/Accueil";
import Patients from "./pages/Patients/Patients";
import Calendrier from "./pages/Calendrier/Calendrier";
// import { Container } from "@mui/system";

class App extends React.Component {
  async componentDidMount() {
    try {
      let res = await fetch("/isLoggedIn", {
        method: "post",
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
        },
      });
      let result = await res.json();

      if (result && result.success) {
        UserStore.loading = false;
        UserStore.isLoggedIn = true;
        UserStore.username = result.username;
      } else {
        UserStore.loading = false;
        UserStore.isLoggedIn = false;
      }
    } catch (e) {
      UserStore.loading = false;
      UserStore.isLoggedIn = false;
    }
  }

  render() {
    if (UserStore.loading) {
      return (
        <>
          <div>loading , please wait ...</div>
        </>
      );
    } else {
      if (UserStore.isLoggedIn) {
        return (
          <>
            <Router>
              <Routes>
                <Route path="/" element={<SideBar />}>
                  <Route index path="/" element={<Accueil />} />
                  <Route path="Patients" element={<Patients />} />
                  <Route path="Calendrier" element={<Calendrier />} />
                </Route>
              </Routes>
            </Router>
          </>
        );
      }
      return (
        <div className="app">
          <div className="container">
            <LoginForm />
          </div>
        </div>
      );
    }
  }
}

export default observer(App);
