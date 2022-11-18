import React, { Component } from 'react';
import styled from 'styled-components';

const MyCard = styled.div`
    margin: 2em;

`

class Comment extends Component {
    render() {
        return (
                <MyCard className="card">
                    <div className="card-header">
                        {this.props.title}
                    </div>
                    <div className="card-body">
                        <blockquote className="blockquote mb-0">
                            <p> {this.props.text} </p>
                            <footer className="blockquote-footer"> {this.props.author} </footer>
                            <footer className="blockquote-footer"> {this.props.data} </footer>
                        </blockquote>
                    </div>
                </MyCard>
        );
    }
}

export default Comment;
