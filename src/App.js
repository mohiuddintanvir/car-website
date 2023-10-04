import logo from './logo.svg';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './component/Router/Router';
import Home from './component/Pages/Home/Home';

function App() {
  return (
    <div className="App">
    <Home></Home>
    </div>
  );
}

export default App;
