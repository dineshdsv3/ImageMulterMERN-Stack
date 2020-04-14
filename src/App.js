import React from 'react';
import axios from 'axios';

class App extends React.Component {
	state = {
		selectedFile: null,
		imageData: [],
	};

	componentDidMount() {
		this.getImages();
	}

	getImages() {
		axios.get('http://localhost:8000/allImages').then((res) => {
			res.data.map((ele) => {
				this.setState({ imageData: [...this.state.imageData, ele] });
			});
			console.log(this.state.imageData);
		});
	}

	onChangeHandler = (event) => {
		this.setState({
			selectedFile: event.target.files,
			loaded: 0,
		});
	};

	onClickHandler = (e) => {
		e.preventDefault();
		const data = new FormData();
		for (var x = 0; x < this.state.selectedFile.length; x++) {
			data.append('file', this.state.selectedFile[x]);
		}
		// console.log(data)
		axios
			.post('http://localhost:8000/upload', data, {
				// receive two parameter endpoint url ,form data
			})
			.then((res) => {
				// then print response status
				console.log(res);
			});
	};
	render() {
		return (
			<div>
				<input type="file" name="file" multiple onChange={this.onChangeHandler} />
				<button type="button" onClick={this.onClickHandler}>
					Upload
				</button>

				<table>
					<thead>
						<tr>
							<th>Name</th>
							<th>Image</th>
						</tr>
					</thead>
					<tbody>
						{this.state.imageData.map((ele, ind) => (
							<tr key={ele._id}>
								<td>{ele._id}</td>
								<td>
									<img src={`http://localhost:8000/${ele.productImage}`} />
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		);
	}
}

export default App;
