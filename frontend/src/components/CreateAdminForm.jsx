import { useState } from 'react';
import axios from 'axios';

const CreateAdminForm = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [message, setMessage] = useState('');

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:5000/api/auth/create-admin', formData, {
                headers: { 'x-auth-token': token }
            });
            setMessage('New Admin created successfully!');
            setFormData({ email: '', password: '' });
        } catch (error) {
            setMessage(error.response?.data?.msg || 'Error creating admin');
        }
    };

    return (
        <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-bold text-lg mb-3">Add New Authority Admin</h3>
            {message && <p className="mb-2 text-sm font-semibold text-blue-800">{message}</p>}
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
                <input
                    type="text"
                    name="email"
                    placeholder="Admin Username/Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="p-2 border rounded flex-1"
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="p-2 border rounded flex-1"
                    required
                />
                <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">Create Admin</button>
            </form>
        </div>
    );
};

export default CreateAdminForm;
