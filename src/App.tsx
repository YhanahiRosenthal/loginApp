import './App.css';
import TermsAndConditions from './components/TermsAndConditions/TermsAndCoditions';
import SignInForm from './components/sign-in/SignInForm';
import SignUpForm from './components/sign-up/SignUpForm';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<SignInForm onSignIn={() => {}}/>} />
          <Route path='/Login' element={<SignInForm onSignIn={() => {}}/>} />
          <Route path='/SignUp' element={<SignUpForm />} />
          <Route path='/TermsAndCoditions' element={<TermsAndConditions />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
