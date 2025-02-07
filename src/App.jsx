import "./App.css";
import Footer from "./components/footer";
import MainMovies from "./components/MainMovies";
import Navbar from "./components/navbar";

function App() {
  return (
    <>
      <Navbar />
      <div className="container mt-3">
        <MainMovies query="Lord of the Rings" />
        <MainMovies query="The Hobbit" />
        <MainMovies query="Dune" />
        <Footer />
      </div>
    </>
  );
}
export default App;
