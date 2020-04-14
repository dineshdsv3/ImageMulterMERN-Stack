import React from 'react';
import axios from 'axios';

class App extends React.Component {
	state = {
		selectedFile: null,
	};

	onChangeHandler = (event) => {
		this.setState({
			selectedFile: event.target.files[0],
			loaded: 0,
		});
  };
  
  onClickHandler = (e) => {
    e.preventDefault();
    const data = new FormData() 
    data.append('file', this.state.selectedFile)
    data.append('Count', 23)
    // console.log(data)
    axios.post("http://localhost:8000/upload", data, { // receive two parameter endpoint url ,form data 
      })
      .then(res => { // then print response status
        console.log(res)
      })
}
	render() {
		return (
			<div>
				<input type="file" name="file" onChange={this.onChangeHandler} />
        <button type="button" onClick={this.onClickHandler}>Upload</button> 

			</div>
		);
	}
}

export default App;
