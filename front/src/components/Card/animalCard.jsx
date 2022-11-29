import React, { Component } from 'react';
import dogimg from '../../img/dog.jpg'


class AnimalCard extends Component {

    render() {
        return (
            <div className="min-h-screen w-full bg-gray-300" style={{ margin: "1em", width: "90%"}}>
                <div className="max-w-screen-md mx-auto px-10 pt-20">
                    <div className="bg-white md:h-48 rounded-lg shadow-md flex flex-wrap flex-col-reverse md:flex-col" style={{display: "flex"}}>
                        <div className="col-lg-6" style={{padding: '2em'}}>
                            <h5>{this.props.name}</h5>
                            <div> Breed: {this.props.breed} </div>
                            <div> Sex: {this.props.sex} </div>
                            <div> Age: {this.props.age} </div>
                        </div>
                        <div className="col-lg-6" style={{alignItems: "flex-end"}}>
                            <img src={dogimg} className="card-img-top" alt="..." />
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default AnimalCard;
