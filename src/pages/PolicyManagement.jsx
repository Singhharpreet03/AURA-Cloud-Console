import React, { useState } from 'react';
import { Shield, Lock, User, Users, Eye, EyeOff, AlertTriangle, CheckCircle, X, GripVertical, Search } from 'lucide-react';

const PolicyManagement = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authForm, setAuthForm] = useState({ userId: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [toast, setToast] = useState(null);
  const [draggedRight, setDraggedRight] = useState(null);
  const [searchUser, setSearchUser] = useState('');
  const [searchRight, setSearchRight] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

const [users, setUsers] = useState([
  { 
    id: 1, 
    name: 'Rahul Sharma', 
    email: 'rahul.sharma@company.com', 
    role: 'Administrator', 
    assignedRights: ['patch-deploy', 'system-config', 'user-management', 'view-logs'] 
  },
  { 
    id: 2, 
    name: 'Priya Verma', 
    email: 'priya.verma@company.com', 
    role: 'IT Manager', 
    assignedRights: ['patch-deploy', 'view-logs', 'resource-monitor'] 
  },
  { 
    id: 3, 
    name: 'Amit Patel', 
    email: 'amit.patel@company.com', 
    role: 'Security Analyst', 
    assignedRights: ['view-logs', 'security-scan', 'alert-management'] 
  },
  { 
    id: 4, 
    name: 'Neha Singh', 
    email: 'neha.singh@company.com', 
    role: 'Developer', 
    assignedRights: ['view-logs', 'resource-monitor'] 
  },
  { 
    id: 5, 
    name: 'Arjun Mehta', 
    email: 'arjun.mehta@company.com', 
    role: 'Operations', 
    assignedRights: ['patch-deploy', 'resource-monitor', 'backup-restore'] 
  }
]);

  const [availableRights] = useState([
    { id: 'patch-deploy', name: 'Patch Deployment', description: 'Deploy and manage system patches', category: 'System' },
    { id: 'system-config', name: 'System Configuration', description: 'Configure system settings and policies', category: 'System' },
    { id: 'user-management', name: 'User Management', description: 'Create, edit, and manage user accounts', category: 'Admin' },
    { id: 'view-logs', name: 'View System Logs', description: 'Access and view system logs', category: 'Monitoring' },
    { id: 'resource-monitor', name: 'Resource Monitoring', description: 'Monitor system resources and performance', category: 'Monitoring' },
    { id: 'security-scan', name: 'Security Scanning', description: 'Perform security scans and audits', category: 'Security' },
    { id: 'alert-management', name: 'Alert Management', description: 'Manage and respond to system alerts', category: 'Monitoring' },
    { id: 'backup-restore', name: 'Backup & Restore', description: 'Backup and restore system configurations', category: 'System' },
    { id: 'drift-management', name: 'Drift Management', description: 'Manage configuration drift detection', category: 'Security' },
    { id: 'workflow-creation', name: 'Workflow Creation', description: 'Create and manage automated workflows', category: 'Admin' }
  ]);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleAuthentication = () => {
    if (authForm.userId === 'superuser' && authForm.password === '1111') {
      setIsAuthenticated(true);
      setAuthError('');
      showToast('Authentication successful', 'success');
    } else {
      setAuthError('Invalid credentials. Please try again.');
      showToast('Authentication failed', 'error');
    }
  };

  const handleDragStart = (e, right) => {
    setDraggedRight(right);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDropOnUser = (e, userId) => {
    e.preventDefault();
    if (!draggedRight) return;

    setUsers(users.map(user => {
      if (user.id === userId && !user.assignedRights.includes(draggedRight.id)) {
        return { ...user, assignedRights: [...user.assignedRights, draggedRight.id] };
      }
      return user;
    }));

    showToast(`${draggedRight.name} assigned successfully`, 'success');
    setDraggedRight(null);
  };

  const handleRemoveRight = (userId, rightId) => {
    setUsers(users.map(user => {
      if (user.id === userId) {
        return { ...user, assignedRights: user.assignedRights.filter(r => r !== rightId) };
      }
      return user;
    }));
    showToast('Right removed successfully', 'success');
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchUser.toLowerCase()) ||
    user.email.toLowerCase().includes(searchUser.toLowerCase()) ||
    user.role.toLowerCase().includes(searchUser.toLowerCase())
  );

  const filteredRights = availableRights.filter(right =>
    right.name.toLowerCase().includes(searchRight.toLowerCase()) ||
    right.description.toLowerCase().includes(searchRight.toLowerCase()) ||
    right.category.toLowerCase().includes(searchRight.toLowerCase())
  );

  const getRightDetails = (rightId) => {
    return availableRights.find(r => r.id === rightId);
  };

  const getCategoryColor = (category) => {
    switch(category) {
      case 'System': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Admin': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Monitoring': return 'bg-green-100 text-green-800 border-green-200';
      case 'Security': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#F1EFEC' }}>
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-4" style={{ backgroundColor: '#123458' }}>
              <Shield className="w-10 h-10" style={{ color: '#F1EFEC' }} />
            </div>
            <h1 className="text-3xl font-bold mb-2" style={{ color: '#123458' }}>Policy Management</h1>
            <p className="text-sm" style={{ color: '#123458', opacity: 0.7 }}>Super User Authentication Required</p>
          </div>

          <div className="rounded-xl shadow-lg p-8" style={{ backgroundColor: '#FFFFFF' }}>
            <div className="mb-6 p-4 rounded-lg border" style={{ backgroundColor: '#FFF9E6', borderColor: '#F2E6B8' }}>
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#A37A00' }} />
                <div>
                  <h4 className="font-semibold text-sm mb-1" style={{ color: '#6B4A00' }}>Security Notice</h4>
                  <p className="text-xs" style={{ color: '#6B4A00', opacity: 0.8 }}>
                    You must be a Super User to access this page. This area contains sensitive system configurations and user permissions.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#123458' }}>
                  Super User ID *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: '#123458', opacity: 0.5 }} />
                  <input
                    type="text"
                    value={authForm.userId}
                    onChange={(e) => setAuthForm({ ...authForm, userId: e.target.value })}
                    onKeyPress={(e) => e.key === 'Enter' && handleAuthentication()}
                    placeholder="Enter your super user ID"
                    className="w-full pl-10 pr-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ borderColor: '#D4C9BE' }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#123458' }}>
                  Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: '#123458', opacity: 0.5 }} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={authForm.password}
                    onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
                    onKeyPress={(e) => e.key === 'Enter' && handleAuthentication()}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-12 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ borderColor: '#D4C9BE' }}
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" style={{ color: '#123458', opacity: 0.5 }} /> : <Eye className="w-5 h-5" style={{ color: '#123458', opacity: 0.5 }} />}
                  </button>
                </div>
              </div>

              {authError && (
                <div className="p-3 rounded-lg border" style={{ backgroundColor: '#FEE2E2', borderColor: '#FCA5A5' }}>
                  <p className="text-sm text-red-800">{authError}</p>
                </div>
              )}

              <button
                onClick={handleAuthentication}
                className="w-full py-3 rounded-lg font-medium text-sm transition-colors hover:opacity-90"
                style={{ backgroundColor: '#123458', color: '#F1EFEC' }}
              >
                Authenticate
              </button>
            </div>
{/* 
            <div className="mt-6 p-3 rounded-lg" style={{ backgroundColor: '#F1EFEC' }}>
              <p className="text-xs text-center" style={{ color: '#123458', opacity: 0.6 }}>
                Demo credentials: <span className="font-mono">superuser</span> / <span className="font-mono">admin123</span>
              </p>
            </div> */}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F1EFEC' }}>
      {toast && (
        <div className={`fixed top-4 right-4 z-50 flex items-center p-4 rounded-lg border shadow-lg animate-slide-in ${
          toast.type === 'success' ? 'bg-green-50 border-green-200' :
          toast.type === 'error' ? 'bg-red-50 border-red-200' :
          'bg-blue-50 border-blue-200'
        }`}>
          {toast.type === 'success' ? <CheckCircle className="w-5 h-5 text-green-600" /> : <AlertTriangle className="w-5 h-5 text-red-600" />}
          <span className={`ml-3 text-sm font-medium ${toast.type === 'success' ? 'text-green-800' : 'text-red-800'}`}>{toast.message}</span>
          <button onClick={() => setToast(null)} className="ml-4 text-gray-400 hover:text-gray-600">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold" style={{ color: '#123458' }}>Policy Management</h1>
              <p className="mt-2" style={{ color: '#123458', opacity: 0.7 }}>Manage user roles and access rights</p>
            </div>
            <button
              onClick={() => {
                setIsAuthenticated(false);
                setAuthForm({ userId: '', password: '' });
                showToast('Logged out successfully', 'success');
              }}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:opacity-80"
              style={{ backgroundColor: '#D4C9BE', color: '#123458' }}
            >
              Sign Out
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="p-4 rounded-xl shadow-sm" style={{ backgroundColor: '#FFFFFF' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium" style={{ color: '#123458', opacity: 0.6 }}>Total Users</p>
                <p className="text-2xl font-bold" style={{ color: '#123458' }}>{users.length}</p>
              </div>
              <Users className="w-6 h-6" style={{ color: '#123458', opacity: 0.6 }} />
            </div>
          </div>
          <div className="p-4 rounded-xl shadow-sm" style={{ backgroundColor: '#FFFFFF' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium" style={{ color: '#123458', opacity: 0.6 }}>Available Rights</p>
                <p className="text-2xl font-bold" style={{ color: '#123458' }}>{availableRights.length}</p>
              </div>
              <Shield className="w-6 h-6" style={{ color: '#123458', opacity: 0.6 }} />
            </div>
          </div>
          <div className="p-4 rounded-xl shadow-sm" style={{ backgroundColor: '#FFFFFF' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium" style={{ color: '#123458', opacity: 0.6 }}>Administrators</p>
                <p className="text-2xl font-bold text-purple-600">{users.filter(u => u.role === 'Administrator').length}</p>
              </div>
              <User className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="p-4 rounded-xl shadow-sm" style={{ backgroundColor: '#FFFFFF' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium" style={{ color: '#123458', opacity: 0.6 }}>Total Assignments</p>
                <p className="text-2xl font-bold text-blue-600">{users.reduce((sum, u) => sum + u.assignedRights.length, 0)}</p>
              </div>
              <CheckCircle className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 rounded-xl shadow-sm" style={{ backgroundColor: '#FFFFFF' }}>
            <div className="p-4 border-b" style={{ borderColor: '#D4C9BE' }}>
              <h3 className="text-lg font-semibold" style={{ color: '#123458' }}>Available Rights</h3>
              <p className="text-xs mt-1" style={{ color: '#123458', opacity: 0.6 }}>Drag rights to assign them to users</p>
            </div>
            
            <div className="p-4">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: '#123458', opacity: 0.5 }} />
                <input
                  type="text"
                  placeholder="Search rights..."
                  value={searchRight}
                  onChange={(e) => setSearchRight(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{ borderColor: '#D4C9BE' }}
                />
              </div>

              <div className="space-y-2 max-h-96 overflow-y-auto">
                {filteredRights.map(right => (
                  <div
                    key={right.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, right)}
                    className="p-3 rounded-lg border cursor-move hover:shadow-md transition-shadow"
                    style={{ borderColor: '#D4C9BE', backgroundColor: '#F1EFEC' }}
                  >
                    <div className="flex items-start space-x-2">
                      <GripVertical className="w-4 h-4 mt-0.5" style={{ color: '#123458', opacity: 0.4 }} />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold text-sm" style={{ color: '#123458' }}>{right.name}</h4>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getCategoryColor(right.category)}`}>
                            {right.category}
                          </span>
                        </div>
                        <p className="text-xs" style={{ color: '#123458', opacity: 0.6 }}>{right.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 rounded-xl shadow-sm" style={{ backgroundColor: '#FFFFFF' }}>
            <div className="p-4 border-b" style={{ borderColor: '#D4C9BE' }}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold" style={{ color: '#123458' }}>Users & Assigned Rights</h3>
                  <p className="text-xs mt-1" style={{ color: '#123458', opacity: 0.6 }}>Drop rights here to assign permissions</p>
                </div>
              </div>
            </div>

            <div className="p-4">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: '#123458', opacity: 0.5 }} />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchUser}
                  onChange={(e) => setSearchUser(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{ borderColor: '#D4C9BE' }}
                />
              </div>

              <div className="space-y-4 max-h-96 overflow-y-auto">
                {filteredUsers.map(user => (
                  <div
                    key={user.id}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDropOnUser(e, user.id)}
                    className={`p-4 rounded-lg border-2 border-dashed transition-all ${
                      selectedUser === user.id ? 'bg-blue-50' : ''
                    }`}
                    style={{ borderColor: selectedUser === user.id ? '#3B82F6' : '#D4C9BE' }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#123458' }}>
                          <span className="text-sm font-medium" style={{ color: '#F1EFEC' }}>
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-semibold" style={{ color: '#123458' }}>{user.name}</h4>
                          <p className="text-xs" style={{ color: '#123458', opacity: 0.6 }}>{user.email}</p>
                          <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
                            {user.role}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-xs font-medium" style={{ color: '#123458', opacity: 0.6 }}>
                          Assigned Rights ({user.assignedRights.length})
                        </p>
                      </div>
                      {user.assignedRights.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {user.assignedRights.map(rightId => {
                            const rightDetails = getRightDetails(rightId);
                            return rightDetails ? (
                              <div
                                key={rightId}
                                className="group flex items-center space-x-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors hover:bg-red-50"
                                style={{ borderColor: '#D4C9BE', backgroundColor: '#FFFFFF' }}
                              >
                                <span style={{ color: '#123458' }}>{rightDetails.name}</span>
                                <button
                                  onClick={() => handleRemoveRight(user.id, rightId)}
                                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <X className="w-3 h-3 text-red-600" />
                                </button>
                              </div>
                            ) : null;
                          })}
                        </div>
                      ) : (
                        <div className="p-4 rounded-lg border border-dashed text-center" style={{ borderColor: '#D4C9BE' }}>
                          <p className="text-xs" style={{ color: '#123458', opacity: 0.5 }}>
                            Drop rights here to assign permissions
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slide-in {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default PolicyManagement;