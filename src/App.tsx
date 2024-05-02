import { useEffect, useState } from 'react';
import './App.css';
import ForgotPassword from './components/forgot-password/ForgotPassword';
import TermsAndConditions from './components/TermsAndConditions/TermsAndCoditions';
import SignInForm from './components/sign-in/SignInForm';
import SignUpForm from './components/sign-up/SignUpForm';
import CircularProgress from '@mui/material/CircularProgress';
import { HttpMethods , useFetch } from './components/useHooks/UseFetch';
import { useHasher } from './components/useHooks/useThemeLabel';

enum FormType {
  SIGN_IN,
  SIGN_UP,
  FORGOT_PASSWORD,
  TERMS_AND_CONDITIONS
}

function App() {

  const fetchHandler = useFetch();
  const passHasher = useHasher();
  const [apiToken, setApiToken] = useState<string>('');
  const [error, setError] = useState();
  const [activeForm, setActiveForm] = useState(FormType.SIGN_IN);

  const callback = (data: any) => {
    if(data.success){
      setApiToken(data.responseData);
    }else{
      setError(data.errorMessage.message);
      console.log(error);
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

  const actionHandler = async ({type, payload}:{type:string, payload:any}) => {
    switch (type){
      case 'authoriseUser':{
        const {data, callback} = payload;
        if(data.password){
          const hashedPass = await passHasher(data.password);
          data.password = hashedPass;
        }
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
        if(data.password){
          const hashedPass = await passHasher(data.password);
          data.password = hashedPass;
        }
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
      case 'activeSignIn':{
        setActiveForm(FormType.SIGN_IN);
        break;
      }
      case 'activeSignUp':{
        setActiveForm(FormType.SIGN_UP);
        break;
      }
      case 'activeForgotPassword':{
        setActiveForm(FormType.FORGOT_PASSWORD);
        break;
      }
      case 'activeTermsAndConditions':{
        setActiveForm(FormType.TERMS_AND_CONDITIONS);
        break;
      }
    }
  }

  const renderActiveForm = () => {
    switch (activeForm) {
      case FormType.SIGN_IN:
        return <SignInForm actionHandler={actionHandler} />;
      case FormType.SIGN_UP:
        return <SignUpForm actionHandler={actionHandler} />;
      case FormType.FORGOT_PASSWORD:
        return <ForgotPassword actionHandler={actionHandler} />;
      case FormType.TERMS_AND_CONDITIONS:
        return <TermsAndConditions actionHandler={actionHandler} />;
      default:
        return null;
    }
  }

  return (
    <>
      {fetchHandler.isLoading &&
        <div style={{
          display: 'flex',
          position: 'fixed',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          zIndex: '10',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <CircularProgress color="success" style={{ zIndex: '999' }} />
        </div>
      }
      {renderActiveForm()}
    </>
  );
}

export default App;
