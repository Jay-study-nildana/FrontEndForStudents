import ShowImageAgain from "./ShowImageAgain";
let simpleMessage = `Hello and Welcome to Home`

const Home = () => (
    <div className="text-center hero my-5">
        <p>{simpleMessage}</p>
        <ShowImageAgain />
  </div>
);

export default Home;