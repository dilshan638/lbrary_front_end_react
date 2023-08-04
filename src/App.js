import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Home from './Components/Home/Home';
import Author from './Components/Author/Authorlist';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import Store from './Redux/Store';

function App() {
  return (
    <Provider store={Store}>
       <div className="App">
        <BrowserRouter>
            <Routes>
              <Route path='/' element={<Home></Home>}></Route>
              <Route path='/author' element={<Author></Author>}></Route>
            </Routes>
          </BrowserRouter>
          <ToastContainer className="toast-position"
            position="bottom-right"></ToastContainer>
    </div>
    </Provider>
   
  );
}

export default App;
