import { Bar } from "react-chartjs-2";

const BarChart = ({ chartData }) => {
    return (
        <div className="chart-container">
            <h2 style={{ textAlign: "center" }}>Bar Chart</h2>
            <Bar
                data={chartData}
                options={{
                    plugins: {
                        title: {
                            display: true,
                            text: "RANKING OF THE BEST PLAYERS"
                        },
                        legend: {
                            display: false
                        }
                    }
                }}
            />
        </div>
    );
};

export default BarChart;