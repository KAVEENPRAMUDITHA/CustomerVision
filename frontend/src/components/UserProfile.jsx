import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
    const { user, logout } = useAuth(); // Assuming 'user' object in context may not have email details directly if only token/role stored. 
    // Actually AuthContext stores user as {token, role}. We might need to fetch user details.

    const [profileData, setProfileData] = useState(null);
    const [complaints, setComplaints] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Fetch User Details
                const userRes = await axios.get('http://localhost:5000/api/auth/user');
                setProfileData(userRes.data);

                // Fetch User Complaints
                const complaintsRes = await axios.get('http://localhost:5000/api/complaints/my-complaints');
                setComplaints(complaintsRes.data);
            } catch (error) {
                console.error("Error fetching profile data", error);
            }
        };
        fetchUserData();
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    if (!profileData) return <div className="p-10 text-center">Loading Profile...</div>;

    return (
        <div className="max-w-5xl mx-auto p-6">

            {/* Header Section */}
            <div className="flex justify-between items-end mb-8 border-b pb-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
                    <p className="text-gray-600 mt-1">Manage your account and view complaint history</p>
                </div>
                <div className="text-right">
                    <p className="font-semibold text-lg">{profileData.email}</p>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full uppercase font-bold">{profileData.role}</span>
                    <button onClick={handleLogout} className="block mt-3 text-red-500 hover:text-red-700 text-sm font-semibold underline ml-auto">
                        Logout
                    </button>
                    <button onClick={() => navigate('/report')} className="block mt-2 text-blue-600 hover:text-blue-800 text-sm font-semibold underline ml-auto">
                        Report New Issue
                    </button>
                </div>
            </div>

            {/* Complaints History Section */}
            <h2 className="text-xl font-bold mb-4 text-gray-700">My Complaints History</h2>

            {complaints.length === 0 ? (
                <div className="text-center py-10 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                    <p className="text-gray-500">You haven't reported any violations yet.</p>
                    <button onClick={() => navigate('/report')} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                        Report Now
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {complaints.map((complaint) => (
                        <div key={complaint._id} className={`bg-white p-5 rounded-lg shadow-sm border-l-4 ${complaint.status === 'Resolved' ? 'border-green-500' :
                                complaint.status === 'In Progress' ? 'border-yellow-500' : 'border-gray-400'
                            }`}>
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-bold text-lg">{complaint.shopName}</h3>
                                    <p className="text-sm text-gray-500">{complaint.category}</p>
                                    <p className="mt-2 text-gray-700">{complaint.description}</p>
                                    <p className="mt-2 text-xs text-gray-400">{new Date(complaint.createdAt).toLocaleDateString()}</p>
                                </div>
                                <div className="text-right min-w-[120px]">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${complaint.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                                            complaint.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                                        }`}>
                                        {complaint.status}
                                    </span>
                                    {complaint.actionTaken && (
                                        <div className="mt-3 text-xs text-start bg-gray-50 p-2 rounded">
                                            <strong>Action:</strong> {complaint.actionTaken}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserProfile;
