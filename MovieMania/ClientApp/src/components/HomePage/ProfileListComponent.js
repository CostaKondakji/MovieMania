import React from 'react'
import { ListGroupItem } from 'reactstrap';


function openProfile(profileId) {
    window.location.replace(`/profile/${profileId}`);
}

function ProfileListComponent(props) {

    return (
        <React.Fragment>
            <ListGroupItem style={{ cursor: "pointer" }} onClick={() => openProfile(props.profile.id)}>
                {props.profile.username}
            </ListGroupItem>
        </React.Fragment>
    );
}

export default ProfileListComponent;