import React from 'react';
import PageLayout from '../../components/PageLayout';
import '../../styles/global.sass';

const SignatureCompletedContainer = (accountData) => (
    <PageLayout avatar={accountData.avatar} title=<div>Great! You've signed the<br/>document!</div>>

      <div class="uploadbox center">
        <div><img src="../../images/check.png" alt="Success!" /></div>

        <p>Success!!</p>
        <label class="grey">Check your email for a<br/>
        confirmation.</label>
      </div>
    </PageLayout>
      );

export default SignatureCompletedContainer;
