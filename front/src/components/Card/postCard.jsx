import React, { Component } from 'react';
import './post.css'

class Post extends Component {
    render() {
        return (
            <div className="card col-12 col-md-6 col-lg-3" >
                <a className="itemLink" href={'https://localhost:3000/singlepost:' + this.props.id}>
                    <h5 class="card-header">{this.props.author}</h5>
                    <div className="card-body postcard">
                        <h5 className="card-title">{this.props.title}</h5>
                    </div>
                </a>
            </div >

        );
    }
}

export default Post;