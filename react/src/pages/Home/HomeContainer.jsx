import React from 'react';
//import PropTypes from 'prop-types';
//import AddSigners from './AddSigners';
//import { Formik, Form, Field, ErrorMessage } from 'formik';
//import axios from 'axios';
import ProtonSDK from '../../utils/proton';
//import './App.css';
import '../../styles/global.sass';
import Home from './Home';

class HomeContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      windowWidth: 0,
      isLoggingIn: false
    }
  }

  componentDidMount() {
    this.updateWindowWidth();
    window.addEventListener('resize', this.updateWindowWidth)
  }

  updateWindowWidth = () => {
    this.setState({ windowWidth: window.innerWidth });
  }

  generateLoginRequest = async () =>  {
    const { setLoggedInState } = this.props;
    console.log("gen login req");
    try {
      this.setState({ isLoggingIn: true });
      const { auth, accountData } = await ProtonSDK.login();
      setLoggedInState(auth.actor, auth.permission, accountData);
      this.setState({ isLoggingIn: false });
      console.log("logged in!");
      //this.props.history.push({
      //  pathname: '/uploaddoc',
        //search: queryString.parse(window.location.search)
      //  });
    } catch (e) {
      this.setState({ isLoggingIn: false });
      console.error(e);
    }
  }

  render() {
    const { windowWidth, isLoggingIn } = this.state;
    //console.log(window.location.search);

    return(
      <Home openLoginModal={this.generateLoginRequest} windowWidth={windowWidth} isLoggingIn={isLoggingIn} />
    );
  }
}


export default HomeContainer;

