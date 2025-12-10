import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [isRegister, setIsRegister] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { login, register } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let role;
            if (isRegister) {
                role = await register(formData.email, formData.password, 'user');
            } else {
                role = await login(formData.email, formData.password);
            }

            if (role === 'admin') navigate('/admin');
            else navigate('/report');

        } catch (err) {
            const serverMsg = err.response?.data?.msg || err.response?.data || 'Authentication failed';
            setError(serverMsg);
            console.error(err);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="md:w-1/3 max-w-sm w-full bg-white shadow-md rounded-lg p-8">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">{isRegister ? 'Register' : 'Login'}</h2>
                {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700">Email</label>
                        <input type="text" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" required />
                    </div>
                    <div>
                        <label className="block text-gray-700">Password</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" required />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200">
                        {isRegister ? 'Register' : 'Login'}
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <button onClick={() => setIsRegister(!isRegister)} className="text-blue-500 hover:underline text-sm">
                        {isRegister ? 'Already have an account? Login' : "Don't have an account? Register"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
