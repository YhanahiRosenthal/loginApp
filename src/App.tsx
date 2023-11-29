import './App.css';
import SignInForm from './components/sign-in/SignInForm';
import SignUpForm from './components/sign-up/SignUpForm';

function App() {
  return (
    <>
      <SignInForm onSignIn={() => {}}/>
      <SignUpForm />
    </>
  );
}

export default App;
