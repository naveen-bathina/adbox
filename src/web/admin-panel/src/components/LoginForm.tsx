import React, { useState } from 'react';


const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');
        const newErrors: { email?: string; password?: string } = {};
        if (!email) newErrors.email = 'Email is required';
        if (!password) newErrors.password = 'Password is required';
        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return;
        try {
            const res = await fetch('http://localhost:5096/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            if (res.ok) {
                setMessage('Login successful!');
            } else {
                const text = await res.text();
                setMessage('Login failed: ' + text);
            }
        } catch (err) {
            setMessage('Network error');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
            {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
            {errors.password && <div style={{ color: 'red' }}>{errors.password}</div>}
            <button type="submit">Login</button>
            {message && <div>{message}</div>}
        </form>
    );
};

export default LoginForm;
