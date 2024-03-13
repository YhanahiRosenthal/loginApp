import { useEffect, useState } from 'react';
import './App.css';
import ForgotPassword from './components/forgot-password/ForgotPassword';
import TermsAndConditions from './components/TermsAndConditions/TermsAndCoditions';
import SignInForm from './components/sign-in/SignInForm';
import SignUpForm from './components/sign-up/SignUpForm';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HttpMethods , useFetch } from './components/useHooks/UseFetch';


function App() {

  const fetchHandler = useFetch();
  const [apiToken, setApiToken] = useState<string>('');

  const callback = (data:string) => {
    if(data){
      setApiToken(data);
    }
  }

  useEffect(() => {
    fetchHandler.fetchData(
      `${process.env.REACT_APP_API_URL}/getToken/1`,
      HttpMethods.GET,
      {},
      {},
      callback
    );
  }, [])

  const actionHandler = ({type, payload}:{type:string, payload:any}) => {
    switch (type){
      case 'authoriseUser':{
        const {data, callback} = payload;
        fetchHandler.fetchData(
          `${process.env.REACT_APP_API_URL}/users/authorize`,
          HttpMethods.POST,
          {
              "X-APIKEY": apiToken
          },
          data,
          callback
        );
        break;
      }
      case 'createUser':{
        const {data, callback} = payload;
        fetchHandler.fetchData(
          `${process.env.REACT_APP_API_URL}/users`,
          HttpMethods.POST,
          {
              "X-APIKEY": apiToken
          },
          data,
          callback
        );
        break;
      }
    }
  }

  return (
    <>
      {/* {fetchHandler.isLoading && <Overlay><>loader here</></Overlay>} // fixed, z-index 999, height:100% to cover all the UI and stop actions while loading */}
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<SignInForm actionHandler={actionHandler} />} />
            {/* <Route path='/login' element={<SignInForm actionHandler={actionHandler} />} /> */}
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/signup' element={<SignUpForm actionHandler={actionHandler} />} />
            <Route path='/terms-and-coditions' element={<TermsAndConditions />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
