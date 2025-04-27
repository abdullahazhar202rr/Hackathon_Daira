import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Star, 
  Settings, 
  LogOut, 
  MessageSquare, 
  CreditCard,
  Bell
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('appointments');
  const [appointments, setAppointments] = useState<any[]>([]);

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };


  const fetchAppointments = async () => {
    try {
      const response = await axios.get('http://localhost:5000/appointments');
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []); 

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">


          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex flex-col items-center mb-6">
                <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                  <img 
                    src={user.avatar || 'https://images.pexels.com/photos/1438072/pexels-photo-1438072.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'} 
                    alt={user.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <p className="text-gray-600">{user.email}</p>
              </div>
              
              <nav className="space-y-1">
                <button 
                  onClick={() => setActiveTab('appointments')}
                  className={`flex items-center w-full px-3 py-2 text-left rounded-md ${
                    activeTab === 'appointments' 
                      ? 'bg-blue-50 text-blue-700' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Calendar className="h-5 w-5 mr-3" />
                  <span>My Appointments</span>
                </button>



                <button 
                  onClick={handleLogout}
                  className="flex items-center w-full px-3 py-2 text-left text-red-600 hover:bg-red-50 rounded-md"
                >
                  <LogOut className="h-5 w-5 mr-3" />
                  <span>Logout</span>
                </button>
              </nav>
            </div>
          </div>
          

          <div className="md:col-span-3">
            {activeTab === 'appointments' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">My Appointments</h2>
                  <div className="flex space-x-3">
                    <button className="bg-blue-50 text-blue-600 px-3 py-1 rounded-md font-medium">
                      Upcoming
                    </button>
                    <button className="text-gray-600 hover:bg-gray-100 px-3 py-1 rounded-md font-medium">
                      Completed
                    </button>
                    <button className="text-gray-600 hover:bg-gray-100 px-3 py-1 rounded-md font-medium">
                      Cancelled
                    </button>
                  </div>
                </div>
                
                <div className="space-y-6">
                  {appointments.filter(a => a.status === 'upcoming').map((appointment) => (
                    <div key={appointment.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex flex-col sm:flex-row">
                        <div className="sm:w-16 mb-3 sm:mb-0">
                          <img 
                            src={appointment.providerImg} 
                            alt={appointment.providerName} 
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        </div>
                        <div className="flex-grow">
                          <div className="flex flex-col sm:flex-row sm:justify-between mb-3">
                            <div>
                              <h3 className="font-semibold text-lg">{appointment.service}</h3>
                              <p className="text-gray-600">with {appointment.providerName}</p>
                            </div>
                            <div className="mt-2 sm:mt-0">
                              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                                Confirmed
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
                            <div className="flex items-center text-gray-700">
                              <Calendar className="h-4 w-4 mr-1" />
                              <span>{appointment.date}</span>
                            </div>
                            <div className="flex items-center text-gray-700">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>{appointment.time}</span>
                            </div>
                            <div className="flex items-center text-gray-700">
                              <MapPin className="h-4 w-4 mr-1" />
                              <span>{appointment.address}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex flex-wrap gap-3">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg">
                          Reschedule
                        </button>
                        <button className="border border-blue-600 text-blue-600 hover:bg-blue-50 text-sm px-4 py-2 rounded-lg">
                          Message Provider
                        </button>
                        <button className="border border-red-500 text-red-500 hover:bg-red-50 text-sm px-4 py-2 rounded-lg">
                          Cancel
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                {appointments.filter(a => a.status === 'upcoming').length === 0 && (
                  <div className="text-center py-10">
                    <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                    <h3 className="text-lg font-medium text-gray-900 mb-1">No upcoming appointments</h3>
                    <p className="text-gray-500 mb-6">You don't have any scheduled appointments.</p>
                    <button 
                      onClick={() => navigate('/search')}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg"
                    >
                      Book a Service
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
