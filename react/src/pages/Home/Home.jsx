import React from 'react';
import PropTypes from 'prop-types';
//import { RedButton, RedBackground } from '../../components';
//import HamburgerIcon from './HamburgerIcon';
//import './Home.sass';
import PageLayout from '../../components/PageLayout';

const Home = ({openLoginModal, windowWidth, isLoggingIn}) => {
  return (
    <PageLayout
      afterwords=<div>Don't have a Proton wallet? Get one <a class="lav nolinkdecoration" href="http://www.protonchain.com/" rel="noreferrer" target="_blank">here</a></div>
      title=<div><font color="#4d5dc1">Free document signing</font> on the<br/>Proton Blockchain</div>>
        <div class="uploadbox"><a href="#" class="loginlink" onClick={openLoginModal}>
          <div class="center"><img src="../../images/wallet.png" alt="login"/></div>
          <p class="center">Login to get started</p>
          <div class="center grey">You will need to connect a wallet</div><div class="center grey">that supports Proton.</div>
        </a></div>

    </PageLayout>
      );
}

export default Home;

Home.propTypes = {
  openLoginModal: PropTypes.func.isRequired,
  windowWidth: PropTypes.number.isRequired,
  isLoggingIn: PropTypes.bool.isRequired,
}
