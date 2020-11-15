import React from 'react';
//import PropTypes from 'prop-types';
import '../styles/global.sass';

class PageLayout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }



  render() {
    const { children, avatar } = this.props;

    // we display the avatar if user is logged in and it is available
    return (
      <div className="page">
        <div className="page-wrapper">
          <div>
            <table class="titleline"><tr>
              <td><h1>Proton<font color="#4d5dc1">Sign</font></h1></td>
              <td
                style={{
                  backgroundImage:
                    typeof(avatar) !== "undefined"
                      ? `url('data:image/jpeg;base64,${avatar}')`
                      : `url('./images/default-avatar.png')`,
                }}
                alt="avatar"
                className="header-avatar">
              </td>
            </tr></table>
            <div class="titlebox">

                <div class="title">{this.props.title}</div>
                <div class="contentparent">
                  <div class="contentchild imageshape1"></div>
                  <div class="contentchild imageshape2"></div>
                  <div class="contentchild contentbox">
                    {children}
                  </div>
                </div>
            </div>
            <div class="center afterwords">{this.props.afterwords}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default PageLayout;
/*
PageLayout.propTypes = {
  avatar: PropTypes.string,
  openConfirmModal: PropTypes.func,
  logout: PropTypes.func.isRequired,
};

PageLayout.defaultProps = {
  avatar: '',
  openConfirmModal: null,
};
*/
