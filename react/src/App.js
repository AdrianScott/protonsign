import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
//import { Formik, Form, Field, ErrorMessage } from 'formik';
//import axios from 'axios';
//import queryString from 'query-string';
import {
  HomeContainer,
  AddSignersContainer,
  UploadDocContainer,
  SignContainer,
  SignersNotifiedContainer,
  SignatureCompletedContainer,
} from './pages';
import ProtonSDK from './utils/proton';
//import PropTypes from "prop-types";
//import logo from './logo.svg';
import './App.css';
import './styles/global.sass';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      actor: '',
      permission: '',
      session: '',
      accountData: {},
      docInfo: {},
    };
  }

  componentDidMount = async ()  => {
    this.checkIfLoggedIn();
  }

  checkIfLoggedIn = async () => {
    const { auth, accountData } = await ProtonSDK.restoreSession();
    const { history } = this.props;


    if (auth.actor && auth.permission) {
      this.setLoggedInState(auth.actor, auth.permission, accountData);
    }
    else {
      if (window.location.search.includes('doc') && !window.location.href.includes('/sign')) {
            //console.log(window.location.href);
            history.push({
            pathname: '/sign',
            search: window.location.search});
      }
    }
  }

  setDocInfo = async(docInfo) => {
    this.setState({docInfo});
    //console.log("docInfo updated");
    //console.log(this.state.docInfo);
  }

  setLoggedInState = async (actor, permission, accountData) => {
    const { history } = this.props;
    this.setState({ actor, permission, accountData });

    // logged in, re-route to other page if desired
    if (window.location.search.includes('doc')) {
          //console.log(window.location.href);
          history.push({
          pathname: '/sign',
          search: window.location.search});
    }
    else {
      //if (!window.location.href.includes('/addsigners') && !window.location.href.includes('/uploaddoc') && !window.location.href.includes('/signersnotified') && !window.location.href.includes('/sign')) {
          //console.log(window.location.href);
          history.push({
          pathname: '/uploaddoc',
          search: window.location.search});
      //}
    }
  }

  logout = async () => {
    const { accountData } = this.state;
    const { history } = this.props;
    if (accountData && accountData.acc) {
      await ProtonSDK.logout();
      this.setState({ actor: '', accountData: {}, session: '' });
    }
    history.push('/');
  }

  render() {
    const { accountData, actor, permission, docInfo } = this.state;
    const { history, location } = this.props;

    return (
      <Switch>
        <Route path="/sign" render={() => <SignContainer setLoggedInState={this.setLoggedInState} location={location} history={history} accountData={accountData} actor={actor} permission={permission}/>} />
        <Route path="/signaturecompleted" render={() => <SignatureCompletedContainer accountData={accountData} />} />
        <Route path="/signersnotified" render={() => <SignersNotifiedContainer accountData={accountData} />} />
        <Route path="/addsigners" render={() => <AddSignersContainer docInfo={docInfo} accountData={accountData} history={history} actor={actor} permission={permission}/>} />
        <Route path="/uploaddoc" render={() => <UploadDocContainer setDocInfo={this.setDocInfo} accountData={accountData} history={history} actor={actor} permission={permission}/>} />
        <Route path="/" render={() => <HomeContainer setLoggedInState={this.setLoggedInState} />} />
      </Switch>
    );
  }
}


export default withRouter(App);
