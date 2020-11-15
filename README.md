# ProtonSign

ProtonSign is a blockchain app written for the Proton Blockchain. The app may be used by a Proton account with the Proton mobile wallet app to initiate a document signing request, to be signed by 1 or more Proton accounts, with signatures being logged as transactions to the Proton blockchain.

Software developed by Adrian Scott ([www.adrianscott.com](http://www.adrianscott.com), [@AdrianScottcom](https://www.twitter.com/adrianscottcom)).


## Architecture Overview

The front-end is a React.js application, which speaks to a PHP back-end accessible in a subdirectory on the web server, receiving POST requests and returning JSON replies with a "result" or "error" object in the replies. Data storage on the server-side consists of a "docinfo" directory with JSON files with info on the document signing request, and a "uploads" directory with the files uploaded. Uploaded files are only available through the PHP API for a configurable, limited number of days, a default of 7 days. Logins and transactions are made through the Proton-Web-SDK by the React front-end.


## Server Requirements

    PHP 7.2+ (may work in newer/greater php version)
    A web server such as Apache
    Node.js e.g. 12.x LTS and npm
    sha256sum


## Installation


### Directory Configuration

Installation can be made to a directory such as /data/protonsign

Create a directory to store user logs, e.g.:

    mkdir /data/protonsign/docinfo /data/protonsign/uploads
    chgrp apache /data/protonsign/docinfo /data/protonsign/uploads
    chmod 770 /data/protonsign/docinfo /data/protonsign/uploads

Each day a user answers a question, a JSON file named username-date.json is created in this directory. Date is calculated using hourly offset of UTC in config.php.


### PHP

The "php" directory contents goes into a subdirectory of the web server docroot with PHP processing of .php files enabled in the web server, e.g. /var/www/html/psignapi

Rename config-sample.php to config.php and change parameters to desired settings and relevant directory locations and URL bases.


### React

Files are in the react directory

This part handles the front-end user interface.

To install:

    npm install
    npm audit fix

Rename sample.env to .env.local, edit parameters and copy to .env.production and edit parameters, or else soft link it (e.g. ln -s) if contents will be the same.
Note that we now have a REACT_APP_VERIFY_ON if you want to test as if all logins are by a verified user, e.g. for testing with unverified accounts.

    npm run build
    cp -r build/* /var/www/html

Note: The app currently charges 1 XPR for the signing transaction. This can be changed in react/src/pages/Sign/SignContainer.jsx


## To Run the App

Start web server, e.g.:

    service httpd start



Disclaimers: This code has not been subjected to a security audit. The react app has lots of dependencies, which also presents a risk vector. PHP configuration is important, c.f. https://phptherightway.com/
