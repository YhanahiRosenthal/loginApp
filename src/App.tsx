import { useEffect, useState } from 'react';
import './App.css';
import ForgotPassword from './components/forgot-password/ForgotPassword';
import TermsAndConditions from './components/TermsAndConditions/TermsAndCoditions';
import SignInForm from './components/sign-in/SignInForm';
import SignUpForm from './components/sign-up/SignUpForm';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HttpMethods , useFetch } from './components/useHooks/UseFetch';


function App() {

  const { fetchData: fetchToken, apiData, error } = useFetch();
  const [apiToken, setApiToken] = useState<string>('');

  useEffect(() => {
    fetchToken(
      `${process.env.REACT_APP_API_URL}/getToken/1`,
      HttpMethods.GET,
    );
  }, [])


  useEffect(() => {
    if(apiData){
      setApiToken(apiData);
    }
    if(error){
      setApiToken(error);
    }
  }, [apiData, error])
  
  console.log(apiToken);

  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<SignInForm apiToken={apiToken} />} />
          <Route path='/login' element={<SignInForm apiToken={apiToken} />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/signup' element={<SignUpForm apiToken={apiToken} />} />
          <Route path='/terms-and-coditions' element={<TermsAndConditions />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
