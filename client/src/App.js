import { Landing, Error, Register, ProtectedRoute } from './pages';
import { AddJob, AllJob, Profile, SharedLayout, Stats } from './pages/dashboard';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ProtectedRoute><SharedLayout /></ProtectedRoute>}>
          <Route path='add-job' element={<AddJob />} />
          <Route path='all-jobs' element={<AllJob />} />
          <Route path='profile' element={<Profile />} />
          <Route path='/' element={<Stats />} />
        </Route>
        <Route path='/landing' element={<Landing />} />
        <Route path='/register' element={<Register />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
