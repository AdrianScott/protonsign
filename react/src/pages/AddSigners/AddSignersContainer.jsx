import React from 'react';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import PageLayout from '../../components/PageLayout';
import FileInfo from '../../components/FileInfo';
import '../../styles/global.sass';

class AddSignersContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      //windowWidth: 0,
      isLoggingIn: false
    }
  }

  onAddSigner(e, values, setValues) {
    const signers = [...values.signers];
    //console.log("hi add signer");
    signers.push({ name: '', email: ''});
    setValues({ ...values, signers });
  }

  render() {
    //const { accountData, actor, permission } = this.state;
    const { accountData, history, actor, docInfo } = this.props;
    const validationSchema = Yup.object().shape({
        signers: Yup.array().of(
            Yup.object().shape({
                name: Yup.string(),
                    //.required('Name is required'),
                email: Yup.string()
                    .email('Please use a valid email address')
                    //.required('Email is required')
            })
        )
    });
    //console.log(docInfo);

    return(
    <PageLayout avatar={accountData.avatar} title=<div>Who needs to sign this<br/> document?</div>>

    <FileInfo filename={docInfo.filename} filesize={docInfo.filesize}>
    </FileInfo>

        <Formik
            initialValues={{ signers: [{ name: "", email: ""}] }} //, name1: "John Doe", email1: "johndoe@gmail.com", name2: "", email2: ""}}
            validationSchema={validationSchema}
       onSubmit={(values, { setSubmitting }) => {
         setTimeout(() => {
             const formData = new FormData();
             for (let key in values) {
               if(values.hasOwnProperty(key)) {
                 //console.log(`${key} : ${values[key]}`);
                 //formData.append(key, values[key]);
               }
             }
             for (let key in values.signers) {
               //if(values.signers.hasOwnProperty(key)) {
                 //console.log(`${values.signers[key].name}`);
                 //console.log(`${values.signers[key].email}`);
                 //console.log("name"+key);
                 formData.append("name"+key, `${values.signers[key].name}`);
                 formData.append("email"+key, `${values.signers[key].email}`);
               //}
             }
             // add the username and docrequestid
             formData.append("sa", actor);
             formData.append("docrequestid", docInfo.id); // TODO fix this

             axios.post("/psignapi/addsigners.php", formData)
                .then(res => {
                    if (typeof res === 'object' && res !== null && 'data' in res) {
                        //console.log(res.data);
                        var data = res.data;
                        if (typeof data === 'object' && data !== null && 'error' in data) {
                            console.log("error: " + data['error']);
                            alert("error: " + data['error']);
                        }
                        if (typeof data === 'object' && data !== null && 'result' in res.data) {
                            console.log("result: " + data['result']);
                            // go to add signers page:
                            history.push({
                              pathname: '/signersnotified',
                              //search: queryString.parse(window.location.search)
                            });
                        }
                    }
                    else {
                        console.log("unsuccessful post");
                    }
                    })
                .catch(err => console.log(err));
           //alert(JSON.stringify(values, null, 2));
           setSubmitting(false);
         }, 400);
       }}
     >
       {({ values, setValues, isSubmitting }) => (
                    <Form>
                    <table class="fullwidth"><tr>
                      <td><p>Signers</p></td>
                      <td class="grey right" onClick={e => this.onAddSigner(e, values, setValues)}><img src="../../images/addsigner.png" alt="Add Signer" /> Add signer</td>
                    </tr></table>

                    <FieldArray
                      name="signers"
                      render={arrayHelpers => (
                        <div>
                        <table class="fullwidth">
                        <tr>
                          <td><label>Name</label></td>
                          <td class="halfwidth"><label>Email</label></td>
                        </tr>
                        {values.signers.map((signer, index) => (
                            <tr key={index}>
                              <td><Field name={`signers.${index}.name`} placeholder="John Doe"/> <ErrorMessage name={`signers.${index}.name`} component="div" /></td>
                              <td><Field name={`signers.${index}.email`} type="email" placeholder="johndoe@gmail.com"/> <ErrorMessage name={`signers.${index}.email`} component="div" /></td>
                            </tr>
                        ))}
                        </table>
                        </div>
                      )}
                    />

                    <button class="lavbutton" disabled={isSubmitting}>Submit for signing</button>
                    </Form>
        )}
        </Formik>
    </PageLayout>
      );
  }
}

export default AddSignersContainer;
