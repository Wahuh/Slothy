import React from "react";
import "./AddGroupButton.scss";
import "./AddGroupIcon.scss"
import "./AddGroupIcon.svg";
import Button from "../../../../pureComponents/Button";

const AddGroupButton = (props) => {
    return (
        <Button style="AddGroupButton" onClick={props.onClick}>
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <title>plus</title>
                <path d="M19 11h-6v-6c0-0.6-0.4-1-1-1s-1 0.4-1 1v6h-6c-0.6 0-1 0.4-1 1s0.4 1 1 1h6v6c0 0.6 0.4 1 1 1s1-0.4 1-1v-6h6c0.6 0 1-0.4 1-1s-0.4-1-1-1z"></path>
            </svg>
        </Button>
    );
}

export default AddGroupButton;