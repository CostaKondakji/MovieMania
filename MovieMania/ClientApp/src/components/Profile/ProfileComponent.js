/* Libraries */
import React, { Component } from 'react'
import { Container, Input } from 'reactstrap'
import MovieListComponent from './MovieListComponent'
import Swal from 'sweetalert2';
/* Assets */
import './Profile.css'

class ProfileComponent extends Component {

	constructor(props) {
		super(props);

		this.state = {
			movies: [],
			backUp: [],
			profileMovies: [],
		};
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	componentDidMount() {
		this.getMovies();	//gets the movies that don't belong to the current profile

	}

	async getMovies() {
		await fetch(`api/Movie/List/${this.props.profileId}/`, {
			method: 'GET',
			headers: {
				"Content-type": "application/json; charset=UTF-8"
			}
		})
			.then(response => {
				if (response.ok) {
					return response;
				}
				else {
					var error = new Error('Error ' + response.status + ': ' + response.statusText)
					error.response = response;
					throw error;
				}
			},
				error => {
					var errmess = new Error(error.message);
					throw errmess;
				})
			.then(response => response.json())
			.then(result => {
				if (result.movies.length > 0) {
					this.setState({ movies: result.movies, backUp: result.movies });
					this.getProfileMovies();	//gets the movies that belong to the current profile
				}
				else {
					var error = new Error('Unexpeced Error');
					throw error;
				}
			})
			.catch(error => {
				this.setState({ loginError: true, loginErrorMessage: "Unexpected error, please try again." })
				console.log("Error", error)
			})
	}

	async getProfileMovies() {
		await fetch(`api/ProfileMovie/List/${this.props.profileId}/`, {
			method: 'GET',
			headers: {
				"Content-type": "application/json; charset=UTF-8"
			}
		})
			.then(response => {
				if (response.ok) {
					return response;
				}
				else {
					var error = new Error('Error ' + response.status + ': ' + response.statusText)
					error.response = response;
					throw error;
				}
			},
				error => {
					var errmess = new Error(error.message);
					throw errmess;
				})
			.then(response => response.json())
			.then(result => {
				if (result.profileMovies.length > 0) {
					this.setState({ profileMovies: result.profileMovies });
				}
				else {
					this.setState({ profileMovies: [] });
				}
			})
			.catch(error => {
				this.setState({ loginError: true, loginErrorMessage: "Unexpected error, please try again." })
				console.log("Error", error)
			})
	}

	async addMovie(movieId) {

		let inputs = {
			"ProfileId": this.props.profileId,
			"MovieId": movieId,
		}
		await fetch(`api/ProfileMovie/Add`, {
			method: 'POST',
			body: JSON.stringify(inputs),
			headers: {
				"Content-type": "application/json; charset=UTF-8"
			}
		})
			.then(response => {
				if (response.ok) {
					return response;
				}
				else {
					var error = new Error('Error ' + response.status + ': ' + response.statusText)
					error.response = response;
					throw error;
				}
			},
				error => {
					var errmess = new Error(error.message);
					throw errmess;
				})
			.then(response => response.json())
			.then(result => {
				if (result.result === true) {
					Swal.fire({
						icon: 'success',
						title: 'Movie Added',
						showCloseButton: false,
						showCancelButton: false,
						showConfirmButton: false,
						timer: 2000,
					});
					this.getMovies();
				}
				else {
					var error = new Error('Unexpeced Error');
					throw error;
				}
			})
			.catch(error => {
				this.setState({ loginError: true, loginErrorMessage: "Unexpected error, please try again." })
				console.log("Error", error)
			})
	}

	async deleteMovie(movieId) {

		let inputs = {
			"ProfileId": this.props.profileId,
			"MovieId": movieId,
		}
		await fetch(`api/ProfileMovie/Delete`, {
			method: 'DELETE',
			body: JSON.stringify(inputs),
			headers: {
				"Content-type": "application/json; charset=UTF-8"
			}
		})
			.then(response => {
				if (response.ok) {
					return response;
				}
				else {
					var error = new Error('Error ' + response.status + ': ' + response.statusText)
					error.response = response;
					throw error;
				}
			},
				error => {
					var errmess = new Error(error.message);
					throw errmess;
				})
			.then(response => response.json())
			.then(result => {
				if (result.result === true) {
					Swal.fire({
						icon: 'success',
						title: 'Movie Deleted from profile',
						showCloseButton: false,
						showCancelButton: false,
						showConfirmButton: false,
						timer: 2000,
					});
					this.getMovies();
				}
				else {
					var error = new Error('Unexpeced Error');
					throw error;
				}
			})
			.catch(error => {
				this.setState({ loginError: true, loginErrorMessage: "Unexpected error, please try again." })
				console.log("Error", error)
			})
	}

	async giveRating(movieId, rating) {

		console.log("arrived: ", movieId);
		let inputs = {
			"ProfileId": this.props.profileId,
			"MovieId": movieId,
			"Rating": rating
		}
		await fetch(`api/ProfileMovie/Rate`, {
			method: 'PUT',
			body: JSON.stringify(inputs),
			headers: {
				"Content-type": "application/json; charset=UTF-8"
			}
		})
			.then(response => {
				if (response.ok) {
					return response;
				}
				else {
					var error = new Error('Error ' + response.status + ': ' + response.statusText)
					error.response = response;
					throw error;
				}
			},
				error => {
					var errmess = new Error(error.message);
					throw errmess;
				})
			.then(response => response.json())
			.then(result => {
				if (result.result === true) {
					Swal.fire({
						icon: 'success',
						title: 'Thank you for submitting your rating!',
						showCloseButton: false,
						showCancelButton: false,
						showConfirmButton: false,
						timer: 2000,
					});
					this.getMovies();
				}
				else {
					var error = new Error('Unexpeced Error');
					throw error;
				}
			})
			.catch(error => {
				this.setState({ loginError: true, loginErrorMessage: "Unexpected error, please try again." })
				console.log("Error", error)
			})
	}

	handleInputChange(e) {
		//Search function, filters the input of the text field and changes state accordingly
		const searchValue = e.target.value;
		const searchResults = this.state.backUp.filter(movie => movie.name.toLowerCase().includes(searchValue.toLowerCase()));

		this.setState({ movies: searchResults });
	}

	render() {
		const movies = this.state.movies;
		const profileMovie = this.state.profileMovies;
		return (
			<Container>
				<h2>Library</h2>
				<Input type="text" name="searc" placeholder="Search movie" onChange={this.handleInputChange} style={{ margin: "2em 0" }} />
				<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gridGap: "2em" }}>
					{movies.map((movie, index) =>
						<div key={index}>
							<MovieListComponent movie={movie} onClick={(movieId) => this.addMovie(movieId)} />
						</div>
					)}
				</div>

				<hr />
				<h2>My movies</h2>
				{profileMovie.length > 0 ?
					<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gridGap: "2em" }}>
						{profileMovie.map((movie, index) =>
							<div key={index}>
								<MovieListComponent movie={movie} status="added" onClick={(movieId) => this.deleteMovie(movieId)} ratingHandler={(movieId, rating) => this.giveRating(movieId, rating)} />
							</div>
						)}
					</div>
					:
					<p>You have no movies, feel free to add one from the list above</p>
				}
			</Container>
		);
	}

}

export default ProfileComponent