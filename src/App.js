import './App.css';
import { BrowserRouter } from 'react-router-dom';
import WebRouter from './routes/index';
import Middleware from './components/middleware/middleware';

function App() {
  return (
    <div className='App w-screen'>
      <BrowserRouter>
      <Middleware>

          <WebRouter />
                </Middleware> 

      </BrowserRouter>
    </div>

  );
}

export default App;
