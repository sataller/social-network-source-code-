import React from 'react';
import './App.css';
import {BrowserRouter, Redirect, Route, Switch, withRouter} from "react-router-dom";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./Redux/appReducer";
import Preloader from "./components/common/Preloader/Preloader";
import store from "./Redux/ReduxStore";
import withSuspense from "./HOC/withSuspens";
import ToDoListsContainer from "./components/TodoLists/ToDoListsContainer";

const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"))

class App extends React.Component {

    componentDidMount() {
        this.props.initializeApp();
    };

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }

        return (
            <div className="app">
                <div className="appWrapper">
                    <div className="header">
                        <HeaderContainer/>
                    </div>
                    <div className="content">
                        <Switch>
                            <Route exact path="/" render={() => <Redirect to={"/profile"}/>}/>
                            <Route path="/dialogs" render={() => withSuspense(DialogsContainer)}/>
                            <Route path="/profile/:userId?" render={() => <ProfileContainer/>}/>
                            <Route path="/users" render={() => <UsersContainer/>}/>
                            <Route path="/login" render={() => <Login/>}/>
                            <Route path="/todolists" render={() => <div><h1>
                                This page is under construction</h1></div>}/>
                        </Switch>

                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        initialized: state.app.initialized,
    }
}

let AppContainer = compose(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App)

let MainAppJS = (props) => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <AppContainer/>
            </Provider>
        </BrowserRouter>
    )
}
export default MainAppJS