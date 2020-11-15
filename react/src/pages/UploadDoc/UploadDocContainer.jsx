import React from 'react';
//import { render } from 'react-dom';
//import PropTypes from 'prop-types';
//import AddSigners from './AddSigners';
//import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
//import ProtonSDK from '../../utils/proton';
//import './App.css';
//import * as yup from "yup";
import '../../styles/global.sass';
import UploadDoc from './UploadDoc';

class UploadDocContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      //windowWidth: 0,
      isLoggingIn: false
    }
  }

    // On file select (from the pop up)
    onFileChange = event => {
      // Update the state
      this.setState({ selectedFile: event.target.files[0] });
    };

    // On file upload (click the upload button)
    onFileUpload = (acceptedFiles) => {
      const { actor, setDocInfo } = this.props;
      // Create an object of formData
      const formData = new FormData();

      // add the username
      formData.append("sa", actor);

      // Add the file to the formData object
      /*formData.append(
        "fileToUpload",
        this.state.selectedFile,
        this.state.selectedFile.name
      );*/
      formData.append(
        "fileToUpload",
        acceptedFiles[0],
        acceptedFiles[0].name
      );

      // Details of the uploaded file
      //console.log(this.state.selectedFile);

             //console.log("file upload starting...");
             axios.post("/psignapi/upload.php", formData)
                .then(res => {
                    if (typeof res === 'object' && res !== null && 'data' in res) {
                        //console.log(res.data);
                        var data = res.data;
                        if (typeof data === 'object' && data !== null && 'error' in data) {
                            alert("error: " + data['error']);
                        }
                        if (typeof data === 'object' && data !== null && 'result' in res.data) {
                            console.log("result: docrequestid:" + data['result']['docrequestid'] + " hash: " + data['result']['hash']);
                            let docInfo = { id: data['result']['docrequestid'], hash: data['result']['hash'], filename: data['result']['filename'], filesize: data['result']['filesize'] };
                            setDocInfo(docInfo);

                            console.log(JSON.stringify(data['result']));
                            // go to add signers page:

                            this.props.history.push({
                              pathname: '/addsigners',
                              //search: queryString.parse(window.location.search)
                            });
                        }
                    }
                    else {
                        console.log("unsuccessful post");
                    }
                })
                .catch(err => console.log(err));
    }

  render() {
    //const { accountData, actor, permission } = this.state;
    const { accountData } = this.props;

    return(
      <UploadDoc accountData={accountData} onFileChange={this.onFileChange} onFileUpload={this.onFileUpload} />
    );
  }
}

export default UploadDocContainer;
