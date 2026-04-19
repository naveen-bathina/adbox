import React from 'react';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import AdminLoginForm from './components/AdminLoginForm';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
    const [view, setView] = React.useState<'login' | 'signup' | 'admin' | 'dashboard'>('login');
    const [adminLoggedIn, setAdminLoggedIn] = React.useState(false);

    // Simple prop drilling for demo; in real app, use context or state management
    const handleAdminLoginSuccess = () => {
        setAdminLoggedIn(true);
        setView('dashboard');
    };

    return (
        <div>
            <button onClick={() => setView('login')}>Login</button>
            <button onClick={() => setView('signup')}>Sign Up</button>
            <button onClick={() => setView('admin')}>Admin Login</button>
            {view === 'login' && <LoginForm />}
            {view === 'signup' && <SignupForm />}
            {view === 'admin' && <AdminLoginForm onSuccess={handleAdminLoginSuccess} />}
            {view === 'dashboard' && adminLoggedIn && <Dashboard />}
        </div>
    );
};

export default App;
