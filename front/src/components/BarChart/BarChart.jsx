import React from "react";
import '../BarChart/BarChart.css'

function BarChart(props){
    
    return (
        <div className="container podium">
            <div className="podium__item">
                <p className="podium__city">{props.second} - {props.secondscore}</p>
                <div className="podium__rank second">2</div>
            </div>
            <div className="podium__item">
            <div className="podium__item">
                <p className="podium__city">{props.first} - {props.firstscore}</p>
                <div className="podium__rank first">1</div>
            </div>
            </div>
            <div className="podium__item">
                <p className="podium__city">{props.third} - {props.thirdscore}</p>
                <div className="podium__rank third">3</div>
            </div>
        </div >
    );
};

export default BarChart;