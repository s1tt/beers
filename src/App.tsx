import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import BeerDetails from './pages/BeerDetails/BeerDetails';
import Main from './pages/Main/Main';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/beers/:id' element={<BeerDetails />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
