import React from 'react';
//import PropTypes from 'prop-types';
import '../styles/global.sass';

class FileInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }


  render() {
    const { children, filename, filesize } = this.props;

    // express filesize in KB or if greater than 1MB, MB (these are base 1000 calc's)
    let filesized = Math.ceil(Number(filesize)/1000);
    if (filesized > 1000) {
      filesized = (Math.ceil(Number(filesized)/1000)).toString() + "MB";
    }
    else {
      filesized = filesized.toString() + "KB";
    }
    //const filesized = (Math.ceil(Number(filesize)/1000)).toString() + "KB";
    //console.log(Number(doc.filesize));
    //console.log(Number(doc.filesize)/1000);
    //console.log(Math.ceil(Number(doc.filesize)/1000));
    //console.log(Math.ceil(Number(doc.filesize)/1000) + "KB");
    //console.log((Math.ceil(Number(doc.filesize)/1000)).toString() + "KB");
    //console.log(accountData);
    //console.log(filesized);

    // trim .pdf off of end of filename
    const filenameRoot = filename.slice(0, -4);

    return (
      <div>
        <table class="filebox">
          <tr>
            <td class="filepng"><img src="../../images/file.png" alt="PDF File"/></td>
            <td>
              <label>{filenameRoot}</label>
              <div class="grey">{filesized}</div>
            </td>
            {children}
          </tr>
        </table>
      </div>
    );
  }
}

export default FileInfo;
