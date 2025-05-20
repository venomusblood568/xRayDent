import "./App.css";
import Footer from "./Components/footer";
import Header from "./Components/header";
import SelectButton from "./Components/select_button";


function App() {
  return (
    <>
      <div className="flex flex-col min-h-screen bg-black">
        <Header />
        <div className="flex-grow p-8 flex items-center justify-center">
          <div className="text-center max-w-xl p-9 border-2 border-dashed rounded-2xl border-gray-600">
            <h1 className="text-white text-5xl font-bold mb-4 dm-mono-medium">
              xRayDent
            </h1>
            <p className="text-gray-300 text-lg mb-6 dm-mono-light">
              Crystal-clear imaging at your fingertips
            </p>
            <SelectButton/>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default App;
