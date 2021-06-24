import React from 'react'
import { Card, CardTitle, CardText, CardImg, CardBody } from 'reactstrap';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function MovieListComponent(props) {


    return (
        <Card className="movie-card">
            <CardImg top width="100%" height="300px" src={`data:image/png;base64,${props.movie.image}`} />
            <CardBody>
                <CardTitle tag="h5">{props.movie.name}</CardTitle>
                <CardText>{props.movie.description}</CardText>
                <CardText style={{ display: "flex", justifyContent: "space-between" }}>
                    <small className="text-muted">Genre: {props.movie.genre}</small>
                    {props.status === "added" ?
                        <i className="fa fa-trash" onClick={()=> props.onClick(props.movie.id)}></i>
                        :
                        <i className="fa fa-plus" onClick={() => props.onClick(props.movie.id)}></i>
                    }
                </CardText>
                {props.status === "added" &&
                    <Box component="fieldset" mb={3} borderColor="transparent">
                        <Typography component="legend">Rating</Typography>
                        <Rating
                        name="simple-controlled"
                        value={props.movie.rating}
                        onChange={(event, newValue) => {
                            props.ratingHandler(props.movie.id, newValue)
                        }}
                        />
                    </Box>
                }
            </CardBody>
        </Card>
    );
}

export default MovieListComponent;
