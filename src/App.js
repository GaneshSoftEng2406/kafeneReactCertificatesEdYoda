
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css';
import Header from './components/Header';
import HomePage from './pages/homepage/Homepage';
import Products from './pages/productspage/Products'
import Orders from './pages/orderspage/Orders'
import Users from './pages/userspage/Users'
import { Provider } from 'react-redux';
import  store  from './redux/store';
import ProtectedRoute from './ProtectedRoute';



function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
        <Header /> 
          <Routes>
            <Route exact path='/' element={<HomePage/>} />
            <Route exact path='/products' element={ <ProtectedRoute> <Products/> </ProtectedRoute> } />
            <Route exact path='/orders' element={ <ProtectedRoute> <Orders/> </ProtectedRoute>} />
            <Route exact path='/users' element={ <ProtectedRoute> <Users/> </ProtectedRoute>} />
            <Route exact path="*" element={<p>There's nothing here: 404!</p>} />
          </Routes>
    </BrowserRouter>
  
    </Provider>
  );
}

export default App;
