import React, { Component } from 'react';
import './post.css'

class Post extends Component {
    render() {
        return (
            <div className="card">
                <a className="itemLink" href={'/front/singlepost:' + this.props.id}>
                    <h5 className="card-header">{this.props.author}</h5>
                    <div className="card-body postcard">
                        <h5 className="card-title">{this.props.title}</h5>
                    </div>
                </a>
            </div >

        );
    }
}

export default Post;