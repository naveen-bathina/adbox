import React, { useState } from 'react';

const SignupForm: React.FC = () => {
    const [form, setForm] = useState({
        name: '',
        age: '',
        gender: '',
        location: '',
        phone: '',
        email: '',
        password: ''
    });
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');
        const newErrors: { [key: string]: string } = {};
        if (!form.name) newErrors.name = 'Name is required';
        if (!form.age) newErrors.age = 'Age is required';
        if (!form.gender) newErrors.gender = 'Gender is required';
        if (!form.email) newErrors.email = 'Email is required';
        if (!form.password) newErrors.password = 'Password is required';
        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return;
        try {
            const res = await fetch('http://localhost:5096/api/users/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: form.name,
                    age: parseInt(form.age, 10),
                    gender: form.gender,
                    location: form.location,
                    phone: form.phone,
                    email: form.email,
                    password: form.password
                })
            });
            if (res.ok) {
                setMessage('Signup successful!');
            } else {
                const text = await res.text();
                setMessage('Signup failed: ' + text);
            }
        } catch (err) {
            setMessage('Network error');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input id="name" name="name" value={form.name} onChange={handleChange} />
            {errors.name && <div style={{ color: 'red' }}>{errors.name}</div>}
            <label htmlFor="age">Age</label>
            <input id="age" name="age" type="number" value={form.age} onChange={handleChange} />
            {errors.age && <div style={{ color: 'red' }}>{errors.age}</div>}
            <label htmlFor="gender">Gender</label>
            <input id="gender" name="gender" value={form.gender} onChange={handleChange} />
            {errors.gender && <div style={{ color: 'red' }}>{errors.gender}</div>}
            <label htmlFor="location">Location</label>
            <input id="location" name="location" value={form.location} onChange={handleChange} />
            <label htmlFor="phone">Phone</label>
            <input id="phone" name="phone" value={form.phone} onChange={handleChange} />
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" value={form.email} onChange={handleChange} />
            {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" value={form.password} onChange={handleChange} />
            {errors.password && <div style={{ color: 'red' }}>{errors.password}</div>}
            <button type="submit">Sign Up</button>
            {message && <div>{message}</div>}
        </form>
    );
};

export default SignupForm;
