import React from 'react';
//import { Formik, Form, Field, ErrorMessage } from 'formik';
import queryString from 'query-string';
import axios from 'axios';
import ProtonSDK from '../../utils/proton';
import PageLayout from '../../components/PageLayout';
import FileInfo from '../../components/FileInfo';
import '../../styles/global.sass';

class SignContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      //windowWidth: 0,
      isLoggingIn: false,
      docInfo: { hash:"", filename:"", filesize:"", signer_name: ""},
      downloadlink: "/psignapi/download.php" + this.props.location.search
    }

    this.loadDocInfo();
  }

  loadDocInfo() {
    const parsed = queryString.parse(window.location.search);
    //console.log("doc id: " + parsed.doc + " sig: " + parsed.sig);

    const formData = new FormData();
    formData.append("doc", parsed.doc);
    formData.append("sig", parsed.sig);

     axios.post("/psignapi/docinfo.php", formData)
        .then(res => {
            if (typeof res === 'object' && res !== null && 'data' in res) {
                //console.log(res.data);
                const data = res.data;
                if (typeof data === 'object' && data !== null && 'error' in data) {
                    alert("error: " + data['error']);
                }
                if (typeof data === 'object' && data !== null && 'result' in res.data) {
                    this.setState({docInfo: res.data['result']});
                    //this.doc = res.data['result']; //['doc']
                    //console.log("doc info loaded");
                    //console.log(this.doc);
                    //console.log("result: docrequestid:" + data['result']['docrequestid'] + " hash: " + data['result']['hash']);
                    //console.log(JSON.stringify(data['result']));
                    // go to add signers page:

                }
                else {
                    console.log("didn't make it to res processing");
                    console.log(data);
                }
            }
            else {
                console.log("unsuccessful post");
            }
        })
        .catch(err => {console.log(err); });
  }

  signDocument = async () => {
    //const { actor, permission, history } = this.props;
    const { actor, permission, history } = this.props;
    const { docInfo } = this.state;
    console.log("sign document function");

    try {
      const actions = [{
        account: 'xtokens', // if XPR: 'eosio.token',
        //account: 'xtokens',
        name: 'transfer',
        authorization: [{
          actor: actor,
          permission: permission
        }],
        data: {
            from: actor,
            to: ProtonSDK.requestAccount,
            //quantity: '0.010000 XUSDT',
            //quantity: '0.010000 XBTC',
            quantity: '1.000000 FOOBAR',
            memo: 'ProtonSign ' + docInfo.hash
        }
      }];
      const tx = await ProtonSDK.sendTransaction(actions);
      if (tx.processed.id) {
        console.log(tx.processed.id);
        //console.log("https://www.ryze.com/prot1/prsigned.php" + window.location.search + "&tx=" + tx.processed.id);
        // TODO axios get to php to log the transaction / signing
        const parsed = queryString.parse(window.location.search);
        //console.log("doc id: " + parsed.doc + " sig: " + parsed.sig);

        const formData = new FormData();
        formData.append("doc", parsed.doc);
        formData.append("sig", parsed.sig);
        formData.append("tx", tx.processed.id);

         axios.post("/psignapi/logsignature.php", formData)
            .then(res => {
                if (typeof res === 'object' && res !== null && 'data' in res) {
                    //console.log(res.data);
                    const data = res.data;
                    if (typeof data === 'object' && data !== null && 'error' in data) {
                        console.log("error: " + data['error']);
                    }
                    if (typeof data === 'object' && data !== null && 'result' in res.data) {
                        //this.setState({doc: res.data['result']});
                        //this.doc = res.data['result']; //['doc']
                        console.log("processed signature");
                        //console.log(this.doc);
                        //console.log("result: docrequestid:" + data['result']['docrequestid'] + " hash: " + data['result']['hash']);
                        //console.log(JSON.stringify(data['result']));
                        // go to add signers page:
                        history.push({
                        pathname: '/signaturecompleted',
                        search: window.location.search});
                    }
                    else {
                        console.log("didn't make it to res processing");
                        console.log(data);
                    }
                }
                else {
                    console.log("unsuccessful post");
                }
            })
            .catch(err => {console.log(err); });
      }
      else {
        console.log(tx);
      }
    } catch (e) {
      console.error(e);
    }
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
    } catch (e) {
      this.setState({ isLoggingIn: false });
      console.error(e);
    }
  }

  render() {
    const { accountData } = this.props;
    //const accountData = { name: "adrian"};
    const { docInfo, downloadlink } = this.state;

    // Note: below we display the wording on the button and set its onclick handler based on whether or not the user
    //  is logged in or not.
    return(
    <PageLayout title=<div>Please Sign Document</div>>

        <div class="checksumbox little">
          Checksum: {docInfo.hash}
        </div>

        <FileInfo filename={docInfo.filename} filesize={docInfo.filesize}>
          <td class="right">
            <p><a class="lav nolinkdecoration little" href={downloadlink}>Download</a></p>
          </td>
        </FileInfo>

        <p class="grey">I, {docInfo.signer_name}, sign the following file on the Proton Blockchain and understand that this action can't be undone.</p>
        <button class="lavbutton" type="button" onClick={(accountData && accountData.hasOwnProperty('name')) ? this.signDocument : this.generateLoginRequest}>
          {(accountData && accountData.hasOwnProperty('name')) ? "Sign document" : "Connect Wallet"}
          </button>
    </PageLayout>
   );


  }
}

export default SignContainer;
