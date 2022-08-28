import { useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(
          '/geojson-data?bbox=13.336284,52.478776,13.336784,52.479029'
        );
        console.log('response: ', res.data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return <div className="App">React App</div>;
}

export default App;
