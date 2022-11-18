import React from 'react';
import Button from 'react-bootstrap/Button';


function ServiceCard(props) {

    return (
            <div className="card col-12 col-md-6 col-lg-3">
                <div className="card-body">
                    <h5 className="card-title">{props.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{props.subtitle}</h6>
                    <p className="card-text">{props.description}</p>
                    <a href={'http://localhost:3000/singleservice:' + props.id}> 
                        <div>
                            <Button variant="primary">
                                DISCOVER MORE
                            </Button>
                        </div>
                    </a>
                </div>
            </div>
    );

}

export default ServiceCard;
