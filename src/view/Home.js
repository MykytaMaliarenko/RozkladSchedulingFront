import React from 'react';
import Search from "./components/Search";
import Container from "@material-ui/core/Container";

export default class Home extends React.Component {
    render() {
        return (
            <Container maxWidth={"sm"}>
                <Search />
            </Container>
        )
    }
}