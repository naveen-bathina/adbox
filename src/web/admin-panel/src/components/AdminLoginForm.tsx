import React, { useState } from 'react';
import { adminLogin } from '../api/admin';


interface AdminLoginFormProps {
    onSuccess?: () => void;
}

const AdminLoginForm: React.FC<AdminLoginFormProps> = ({ onSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        setSuccess(false);
        const result = await adminLogin(email, password);
        setLoading(false);
        if (result.token) {
            setSuccess(true);
            if (onSuccess) onSuccess();
        } else {
            setError(result.error || 'Login failed: Invalid credentials');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
            <button type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {success && <div style={{ color: 'green' }}>Login successful!</div>}
        </form>
    );
};

export default AdminLoginForm;
