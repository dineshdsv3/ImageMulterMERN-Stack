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
				// console.log(this.arrayBufferToBase64(ele.productImage.data));
				this.setState({ imageData: [...this.state.imageData, ele] });
			});
			console.log(this.state.imageData);
		});
	}

	
	// onChangeHandler = (event) => {
	// 	this.setState({
	// 		selectedFile: event.target.files,
	// 		loaded: 0,
	// 	});
	// };

	// onClickHandler = (e) => {
	// 	e.preventDefault();
	// 	const data = new FormData();
	// 	for (var x = 0; x < this.state.selectedFile.length; x++) {
	// 		data.append('file', this.state.selectedFile[x]);
	// 	}
	// 	// console.log(data)
	// 	axios
	// 		.post('http://localhost:8000/upload', data, {
	// 			// receive two parameter endpoint url ,form data
	// 		})
	// 		.then((res) => {
	// 			// then print response status
	// 			console.log(res);
	// 		});
	// };
	onChangeHandlerBase64 = async (e) => {
		e.preventDefault();
		let result;
		let file = e.target.files[0];
		let reader = new FileReader();
		await reader.readAsDataURL(file);
		reader.onloadend = async () => {
			result = reader.result;
			//  console.log(reader.result);
			this.setState({ image: result });
		};
	};
	onClickHandlerBase64 = (e) => {
		e.preventDefault();
		const body = {
			id: 1,
			name: 'dinesh',
			image: this.state.image,
		};
		console.log(body);
		axios.post('http://localhost:8000/uploadBase64', { body }).then((res) => console.log(res));
	};

	render() {
		return (
			<div>
				<input type="file" name="file" multiple onChange={this.onChangeHandlerBase64} />
				<button type="button" onClick={this.onClickHandlerBase64}>
					Upload
				</button>

				<table>
					<thead>
						<tr>
							<th>Id</th>
							<th>Name</th>
							<th>Image</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><img src={this.state.image}/></td>
						</tr>
						{this.state.imageData.map((ele, ind) => (
							<tr key={ele._id}>
								<td>{ele._id}</td>
								<td>{ele.name}</td>
								<td>
									{/* {console.log(ele)} */}
									<img src={ele.productImage} alt="JIUBD"/>
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
