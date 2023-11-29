import './App.css';
import ForgotPassword from './components/forgot-password/ForgotPassword';
import TermsAndConditions from './components/TermsAndConditions/TermsAndCoditions';
import SignInForm from './components/sign-in/SignInForm';
import SignUpForm from './components/sign-up/SignUpForm';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<SignInForm onSignIn={() => {}}/>} />
          <Route path='/login' element={<SignInForm onSignIn={() => {}}/>} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/signup' element={<SignUpForm />} />
          <Route path='/terms-and-coditions' element={<TermsAndConditions />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
