import { EthProvider } from "./contexts/EthContext";
import CM from "./components/CM";
// import Footer from "./components/Footer";

function App() {
  return (
    <EthProvider>
      <div id="App">
        <div className="container">
          <CM />
          {/* <hr /> */}
          {/* <Footer /> */}
        </div>
      </div>
    </EthProvider>
  );
}

export default App;
