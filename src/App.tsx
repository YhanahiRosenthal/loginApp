import './App.css';
import ForgotPassword from './components/forgot-password/ForgotPassword';
import SignInForm from './components/sign-in/SignInForm';
import SignUpForm from './components/sign-up/SignUpForm';

function App() {
  return (
    <>
      <SignInForm onSignIn={() => {}}/>
      <SignUpForm />
      <ForgotPassword />
    </>
  );
}

export default App;
