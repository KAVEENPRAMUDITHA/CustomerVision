import { useEffect, useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import CreateAdminForm from './CreateAdminForm';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const AdminDashboard = () => {
    const [complaints, setComplaints] = useState([]);
    const { logout } = useAuth();
    const navigate = useNavigate();

    const fetchComplaints = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/complaints');
            setComplaints(res.data);
        } catch (error) {
            console.error('Error fetching complaints:', error);
        }
    };

    useEffect(() => {
        fetchComplaints();
    }, []);

    const handleUpdate = async (id, status, actionTaken) => {
        try {
            await axios.put(`http://localhost:5000/api/complaints/${id}`, { status, actionTaken });
            fetchComplaints(); // Refresh local state
        } catch (error) {
            console.error("Update failed", error);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const [showAdminForm, setShowAdminForm] = useState(false);
    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-orange-600">Authority Dashboard</h1>
                <div className="flex gap-3">
                    <button onClick={() => setShowAdminForm(!showAdminForm)} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                        {showAdminForm ? 'Close Admin Form' : 'Add New Admin'}
                    </button>
                    <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">Logout</button>
                </div>
            </div>

            {showAdminForm && <CreateAdminForm />}

            <div className="h-[600px] w-full border border-gray-300 rounded-xl shadow-lg overflow-hidden relative z-0 mb-8">
                <MapContainer center={[7.8731, 80.7718]} zoom={8} scrollWheelZoom={true} className="h-full w-full">
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {complaints.map((complaint) => (
                        <Marker
                            key={complaint._id}
                            position={[complaint.location.lat, complaint.location.lng]}
                        >
                            <Popup>
                                <div className="p-2 min-w-[200px]">
                                    <h3 className="font-bold text-lg">{complaint.shopName}</h3>
                                    <p className="text-sm text-gray-600 badge bg-gray-100 p-1 rounded inline-block mb-2">{complaint.category}</p>
                                    <p className="font-semibold mt-2">Status: <span className={complaint.status === 'Resolved' ? 'text-green-600' : 'text-red-500'}>{complaint.status}</span></p>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {complaints.map((complaint) => (
                    <ComplaintCard key={complaint._id} complaint={complaint} onUpdate={handleUpdate} />
                ))}
            </div>
        </div>
    );
};



const ComplaintCard = ({ complaint, onUpdate }) => {
    const [status, setStatus] = useState(complaint.status);
    const [action, setAction] = useState(complaint.actionTaken || '');
    const [isEditing, setIsEditing] = useState(false);

    const handleSave = () => {
        onUpdate(complaint._id, status, action);
        setIsEditing(false);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-red-500 flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="mb-4 md:mb-0 md:w-1/2">
                <h3 className="font-bold text-xl">{complaint.shopName}</h3>
                <p className="text-sm text-gray-500 mb-2">{complaint.category} • {new Date(complaint.createdAt).toLocaleDateString()}</p>
                <p className="text-gray-800">{complaint.description}</p>
                {complaint.actionTaken && !isEditing && (
                    <div className="mt-3 p-2 bg-gray-50 rounded text-sm text-gray-700">
                        <strong>Action Taken:</strong> {complaint.actionTaken}
                    </div>
                )}
            </div>

            <div className="w-full md:w-1/3 flex flex-col gap-3">
                <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm">Status:</span>
                    {isEditing ? (
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="border p-1 rounded"
                        >
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Resolved">Resolved</option>
                        </select>
                    ) : (
                        <span className={`px-2 py-1 rounded text-sm font-semibold ${status === 'Resolved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                            {status}
                        </span>
                    )}
                </div>

                {isEditing && (
                    <textarea
                        className="w-full border p-2 rounded text-sm"
                        placeholder="Describe action taken..."
                        value={action}
                        onChange={(e) => setAction(e.target.value)}
                    />
                )}

                {isEditing ? (
                    <div className="flex gap-2">
                        <button onClick={handleSave} className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700">Save</button>
                        <button onClick={() => setIsEditing(false)} className="bg-gray-400 text-white px-3 py-1 rounded text-sm">Cancel</button>
                    </div>
                ) : (
                    <button onClick={() => setIsEditing(true)} className="bg-yellow-500 text-white px-4 py-1 rounded text-sm hover:bg-yellow-600 w-full md:w-auto text-center flex items-center justify-center gap-2">
                        <span>Edit Status & Action</span>
                    </button>
                )}
            </div>
        </div>
    )
}

export default AdminDashboard;
