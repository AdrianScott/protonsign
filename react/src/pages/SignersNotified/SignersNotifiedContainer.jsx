import React from 'react';
import PageLayout from '../../components/PageLayout';
import '../../styles/global.sass';

const SignersNotifiedContainer = (accountData) => (
    <PageLayout avatar={accountData.avatar} title=<div>Great! We have notified<br/>all the signers</div>>
      <div class="uploadbox center">
        <div><img src="../../images/check.png" alt="Success!" /></div>

        <p>Success!!</p>
        <label class="grey">You will be notified as people<br/>
        sign the document</label>
      </div>
    </PageLayout>
      );

export default SignersNotifiedContainer;
