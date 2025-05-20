import "./App.css";
import Footer from "./Components/footer";
import Header from "./Components/header";


function App() {
  return (
    <>
      <div className="flex flex-col min-h-screen bg-black">
        <Header />
        <div className="flex-grow p-8 flex items-center justify-center">
          <div className="text-center max-w-xl">
            <h1 className="text-white text-5xl font-bold mb-4 dm-mono-medium">
              xRayDent
            </h1>
            <p className="text-gray-300 text-lg mb-6 dm-mono-light">
              Crystal-clear imaging at your fingertips
            </p>
            <button className="bg-white text-black px-8 py-4 rounded-xl text-xl font-semibold hover:bg-gray-200 transition duration-200 shadow-md">
              Select .dcm file
            </button>
            <div className="text-white m-2">or drop .dcm here</div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default App;
