import React, { Component } from 'react';
import AudioAnalyser from './AudioAnalyser.js';
import AudioVisualiser from './AudioVisualiser.js';

class App extends Component {
  constructor(...args){
    super(...args);
    this.state = {
      audio: null
    }
    this.getMicrophone = this.getMicrophone.bind(this);
    this.toggleMicrophone = this.toggleMicrophone.bind(this);
    this.stopMicrophone = this.stopMicrophone.bind(this);
  }

  async getMicrophone() {
    const audio = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false
    });
    this.setState({ audio });
  }

  stopMicrophone() {
    this.state.audio.getTracks().forEach(track => track.stop());
    this.setState({ audio: null });
  }

  toggleMicrophone() {
    if (this.state.audio) {
      this.stopMicrophone();
    } else {
      this.getMicrophone();
    }
  }

  render() {
    return (
        <div className="App">
          <div className="controls">
            <button onClick={this.toggleMicrophone}>
              {this.state.audio ? 'Stop microphone' : 'Get microphone input'}
            </button>
          </div>
          {this.state.audio ? <AudioAnalyser audio={this.state.audio} /> : ''}

        </div>
    );
  }
  // render() {
  //   return (
  //       <div className="App">
  //         <main>
  //           <div className="controls">
  //             <button onClick={this.toggleMicrophone}>
  //               {this.state.audio ? 'Stop microphone' : 'Get microphone input'}
  //             </button>
  //           </div>
  //         </main>
  //       </div>
  //   );
  // }
}

export default App;
