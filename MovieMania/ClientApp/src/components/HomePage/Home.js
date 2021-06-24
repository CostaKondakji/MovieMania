/* Libaries */
import React, { Component } from 'react';
import ProfileListComponent from './ProfileListComponent';
import { Container, Card, Button, CardTitle, CardText, ListGroup, Form, FormGroup, Input, FormFeedback, Spinner } from 'reactstrap'
import Swal from 'sweetalert2';
/* Assets */
import './Home.css'

export class Home extends Component {
	static displayName = Home.name;

	constructor(props) {
		super(props);

		this.state = {
			profiles: [],
			username: '',
			touched: false,
			hideForm: true,
			unique: true,
		}

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
	}

	componentDidMount() {
		this.getProfiles();
	}

	async getProfiles() {
		//Fectches a list of all profiles
		await fetch(`api/Profile/List`, {
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

				if (result.profiles.length > 0) {
					this.setState({ profiles: result.profiles });
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

	handleBlur = () => (evt) => {
		this.setState({ touched: true });

	}

	validate(username) {
		//Real time validation since it's called in the render method (updating lifecycle method)
		let error = '';

		if (this.state.touched && username === "")
			error = "Please fill out this field";
		else if (this.state.unique === false)
			error = "Username already exists.";

		return error;
	}

	handleSubmit(event) {

		document.getElementById("submit").disabled = true;	//To prevent multiple API calls
		this.checkSingularity(this.state.username);	//Make sure that the new username is unique
		document.getElementById("submit").disabled = false;
		event.preventDefault();
	}

	checkSingularity(username) {
		/* Checks if username is unique in the database */
		console.log("Sing")
		this.setState({ loadingFeedback: true })	//Starts Spinner
		fetch(`api/Profile/Singularity/${username}`, {
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
				console.log("Sing Done")
				if (result.result === false)
					this.setState({ unique: false })
				else {
					this.setState({ unique: true })
					this.addProfile(this.state.username);	//Adds the profile to the Database
				}
				setTimeout(() => this.setState({ loadingFeedback: false }), 1500);
			})
			.catch(error => {
				setTimeout(() => this.setState({ loadingFeedback: false }), 1500);
			})
	}

	addProfile(username) {
		console.log("Add")
		fetch('api/Profile/Add', {
			method: 'POST',
			body: JSON.stringify(username),
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
			.then(result => {
				this.setState({ hideForm: true, username: '' })
				Swal.fire({
					icon: 'success',
					title: 'Profile Added',
					showCloseButton: false,
					showCancelButton: false,
					showConfirmButton: false,
					timer: 2000,
				});
				this.getProfiles();
			})
			.catch(error => {
				Swal.fire({
					icon: 'error',
					title: 'Unexptected Error',
					showCloseButton: false,
					showCancelButton: false,
					showConfirmButton: false
				});
			})
	}

	render() {

		const profiles = this.state.profiles;
		const error = this.validate(this.state.username);

		return (
			<section className="overlay">
				<Container>
					<Card className="profile-card" body>
						<CardTitle tag="h3">PROFILES</CardTitle>

						<Button color="primary" onClick={() => this.setState({ hideForm: false })}>Add Profile</Button>
						<Form onSubmit={this.handleSubmit} hidden={this.state.hideForm} className="profile-form">
							<FormGroup >
								<Input type="text" name="username" placeholder="Username" value={this.state.username} onChange={(e) => { this.setState({ username: e.target.value }) }} valid={error === ''} invalid={error !== ''} onBlur={this.handleBlur()} required />
								{this.state.loadingFeedback === true ?
									<Spinner size="sm" color="dark" />
									:
									<FormFeedback style={{ textAlign: "center" }}>
										{error}
									</FormFeedback>
								}
							</FormGroup>
							<div className="button-container">
								<Button id="exit" color="primary" onClick={() => { this.setState({ hideForm: true, username: '' }); }}>Exit</Button>
								<Button id="submit" type="submit" color="success" style={{ marginLeft: "1em" }}>Save</Button>

							</div>
							<hr />
						</Form>

						{profiles.length > 0 ?
							<ListGroup flush className="profile-list">
								{profiles.map((profile, index) =>
									<div key={index}>
										<ProfileListComponent profile={profile} />
									</div>
								)}
							</ListGroup>
							:
							<CardText className="profile-unavailable-users" >No profiles available</CardText>
						}
					</Card>
				</Container>
			</section>
		);
	}
}
