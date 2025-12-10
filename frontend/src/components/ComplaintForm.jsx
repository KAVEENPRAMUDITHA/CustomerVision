import { useState } from 'react';
import axios from 'axios';
import MapSelector from './MapSelector';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const ComplaintForm = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        shopName: '',
        category: '',
        description: '',
    });
    const [location, setLocation] = useState({ lat: 7.8731, lng: 80.7718 });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/complaints', {
                ...formData,
                location,
            });
            setMessage('Complaint submitted successfully!');
            setFormData({ shopName: '', category: '', description: '' });
        } catch (error) {
            console.error(error);
            setMessage('Error submitting complaint.');
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-10 relative">
            <button onClick={handleLogout} className="absolute top-6 right-6 text-sm text-red-600 hover:underline">Logout</button>
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-6">Report a Violation</h2>

            {message && <div className="mb-4 p-3 bg-blue-100 text-blue-700 rounded">{message}</div>}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Shop Name</label>
                        <input
                            type="text"
                            name="shopName"
                            value={formData.shopName}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none transition"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Category</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none transition"
                            required
                        >
                            <option value="">Select Category</option>
                            <option value="High Prices">High Prices</option>
                            <option value="Hygiene Issues">Hygiene Issues</option>
                            <option value="Expired Products">Expired Products</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none transition h-32"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-2 px-4 rounded hover:shadow-lg transform hover:-translate-y-0.5 transition"
                    >
                        Submit Complaint
                    </button>
                </form>

                <div className="h-96 w-full">
                    <label className="block text-gray-700 font-medium mb-2">Pin Location</label>
                    <div className="h-full border border-gray-300 rounded overflow-hidden">
                        <MapSelector onLocationSelect={setLocation} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ComplaintForm;
