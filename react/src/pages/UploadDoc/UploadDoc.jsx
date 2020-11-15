import React from 'react';
import Dropzone from 'react-dropzone'
import PageLayout from '../../components/PageLayout';
import '../../styles/global.sass';

const UploadDoc = ({accountData, onFileChange, onFileUpload}) => {
    const maxSize = 5000000;
    return(
    <PageLayout avatar={accountData.avatar} title=<div>Welcome!<br/>Let's get your file signed.</div>>
      <Dropzone
        onDrop={onFileUpload}
        accept="application/pdf"
        minSize={0}
        maxSize={maxSize} >
        {({getRootProps, getInputProps, isDragActive, isDragReject, rejectedFiles}) => {
          //const isFileTooLarge = (typeof rejectedFiles !== "undefined") && rejectedFiles.length > 0 && rejectedFiles[0].size > maxSize; TODO
          return (
          <div class="dashed upload uploadbox">
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              {/*{!isDragActive && 'Click here or drop a file to upload!'}
              {isDragActive && !isDragReject && "Drop it like it's hot!"}*/}
              {isDragReject && "Only PDF files are accepted, sorry!"}

              <div class="center"><img src="../../images/upload.png" alt="Upload File" /></div>
              <p class="center upload">Drop your doc here, or <font color="#4d5dc1">browse</font></p>

              <ul class="center">
              <li><label class="upload grey">Supports: PDF files</label></li>
              </ul>

            </div>
          </div>
        )}
        }
      </Dropzone>

    </PageLayout>
      );
  }

export default UploadDoc;
