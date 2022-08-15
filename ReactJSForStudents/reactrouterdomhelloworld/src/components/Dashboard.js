import localImage from "../images/dollar-gill-3B7FLkIFTvA-unsplash.jpg";

let simpleMessage = `Welcome to the dashboard`
let simpleMessage2 = `This is the greatest table ever created`

const Dashboard = () => (
    <div className="text-center hero my-5">
        <p>{simpleMessage}</p>
        <p>{simpleMessage2}</p>
        <table className="table">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Handle</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                </tr>
                <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
                </tr>
                <tr>
                <th scope="row">3</th>
                <td colspan="2">Larry the Bird</td>
                <td>@twitter</td>
                </tr>
            </tbody>
        </table>
        <img src={localImage} className="img-fluid" alt="..."></img>
    </div>
);

export default Dashboard;