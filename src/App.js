import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageURL: '',
      file_name: ''
    };
    this.handleUploadImage = this.handleUploadImage.bind(this);
  }

  handleUploadImage(ev) {
    ev.preventDefault();
    
    const data = new FormData();
    data.append('file', this.uploadInput.files[0]);
    data.append('filename', this.fileName.value);
    
    fetch('http://localhost:4000/upload', {
      method: 'POST',
      body: data
      }).then(response => {
        console.log("response");
        console.log(response);
        response.json().then(body => {
        this.setState({ 
          imageURL: `http://localhost:4000/${body.file}` ,
          file_name: body.filename
        });
      });
    });
  }

  render() {
    return (
      <div className="App">
        <h1>FileUpload</h1>
        <form onSubmit={this.handleUploadImage}>
        <div>
          <input ref={ref => {this.uploadInput = ref;}} 
          type="file"/>
        </div>
        <br />
        <div>
          <input ref={ref => {this.fileName = ref;}}
          type="text"
          placeholder="Enter the desired name of file"/>
        </div>
        <br />
        <div>
          <button>Upload</button>
        </div>
        <hr />
        <p>Uploaded Image: {this.state.file_name}</p>
        <img src={this.state.imageURL} alt="img" />
        </form>
      </div>
    );
  }
}

export default App;
