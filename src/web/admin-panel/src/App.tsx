import React from 'react';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';

const App: React.FC = () => {
    const [showLogin, setShowLogin] = React.useState(true);
    return (
        <div>
            <button onClick={() => setShowLogin(true)}>Login</button>
            <button onClick={() => setShowLogin(false)}>Sign Up</button>
            {showLogin ? <LoginForm /> : <SignupForm />}
        </div>
    );
};

export default App;
