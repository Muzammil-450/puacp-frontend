import { useState, useEffect } from "react";
import { 
  BookOpen, 
  Calendar, 
  Users, 
  Award, 
  TrendingUp,
  Home,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
  MapPin,
  Clock,
  Mail,
  GraduationCap,
  FileText,
  MessageSquare,
  Activity
} from "lucide-react";

// Mock user data for demonstration
const mockUser = {
  name: "John Doe",
  email: "john.doe@univercity.edu",
  department: "Computer Science",
  year: "Senior",
  studentId: "CS2021001"
};

// Announcement Component
import AnnouncementBanner from "./components/AnnouncementBanner"

// Department Quick Links Component
function DepartmentLinks({ userRole }) {
  const departments = {
    "Computer Science": {
      icon: "💻",
      color: "from-purple-400 to-purple-600",
      links: ["Course Materials", "Assignment Portal", "Lab Schedule", "Faculty Contact"]
    },
    "Engineering": {
      icon: "⚙️",
      color: "from-orange-400 to-orange-600", 
      links: ["Project Hub", "Workshop Booking", "Equipment Request", "Industry Connect"]
    },
    "Business": {
      icon: "📊",
      color: "from-blue-400 to-blue-600",
      links: ["Case Studies", "Internship Portal", "Career Center", "Alumni Network"]
    },
    "Medicine": {
      icon: "🏥",
      color: "from-green-400 to-green-600",
      links: ["Clinical Rotations", "Medical Library", "Research Projects", "Residency Info"]
    }
  };

  const currentDept = departments[userRole] || departments["Computer Science"];

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 hover:shadow-2xl transition-all duration-300">
      <div className="flex items-center space-x-3 mb-4">
        <div className={`bg-gradient-to-r ${currentDept.color} p-3 rounded-xl shadow-lg`}>
          <span className="text-2xl">{currentDept.icon}</span>
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800">Department of {userRole}</h2>
          <p className="text-gray-600 text-sm">Quick access to your department resources</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {currentDept.links.map((link, index) => (
          <button
            key={index}
            className="flex items-center justify-between p-4 bg-gradient-to-br from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 rounded-xl transition-all duration-200 group transform hover:scale-105 hover:shadow-md"
          >
            <span className="text-sm font-medium text-gray-700 group-hover:text-gray-800">{link}</span>
            <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-200" />
          </button>
        ))}
      </div>
    </div>
  );
}

// Header Component
function Header({ user, onLogout, isMobileMenuOpen, setIsMobileMenuOpen, currentPage, setCurrentPage }) {
  return (
    <header className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo and University Name */}
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl shadow-lg">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <div className="hidden md:block">
              <h1 className="text-xl font-bold text-gray-800">UniverCity</h1>
              <p className="text-xs text-gray-600">Excellence in Education</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => setCurrentPage('dashboard')}
              className={`flex items-center space-x-2 transition-colors ${
                currentPage === 'dashboard' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              <Home className="h-4 w-4" />
              <span>Dashboard</span>
            </button>
            <button 
              onClick={() => setCurrentPage('profile')}
              className={`flex items-center space-x-2 transition-colors ${
                currentPage === 'profile' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              <User className="h-4 w-4" />
              <span>Profile</span>
            </button>
            <button 
              onClick={() => setCurrentPage('calendar')}
              className={`flex items-center space-x-2 transition-colors ${
                currentPage === 'calendar' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              <Calendar className="h-4 w-4" />
              <span>Calendar</span>
            </button>
            <button 
              onClick={() => setCurrentPage('settings')}
              className={`flex items-center space-x-2 transition-colors ${
                currentPage === 'settings' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </button>
          </nav>

          {/* User Info and Logout */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:block text-right">
              <p className="text-sm font-medium text-gray-800">Welcome back,</p>
              <p className="text-xs text-gray-600">{user?.name}</p>
            </div>
            <button
              onClick={onLogout}
              className="hidden md:flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-4 py-3 space-y-3">
            <div className="pb-3 border-b border-gray-200">
              <p className="font-medium text-gray-800">{user?.name}</p>
              <p className="text-sm text-gray-600">{user?.email}</p>
            </div>
            <button 
              onClick={() => {setCurrentPage('dashboard'); setIsMobileMenuOpen(false);}}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 w-full text-left"
            >
              <Home className="h-5 w-5 text-gray-600" />
              <span>Dashboard</span>
            </button>
            <button 
              onClick={() => {setCurrentPage('profile'); setIsMobileMenuOpen(false);}}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 w-full text-left"
            >
              <User className="h-5 w-5 text-gray-600" />
              <span>Profile</span>
            </button>
            <button 
              onClick={() => {setCurrentPage('calendar'); setIsMobileMenuOpen(false);}}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 w-full text-left"
            >
              <Calendar className="h-5 w-5 text-gray-600" />
              <span>Calendar</span>
            </button>
            <button 
              onClick={() => {setCurrentPage('settings'); setIsMobileMenuOpen(false);}}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 w-full text-left"
            >
              <Settings className="h-5 w-5 text-gray-600" />
              <span>Settings</span>
            </button>
            <button
              onClick={onLogout}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-red-50 text-red-600 w-full text-left"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-12">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <GraduationCap className="h-6 w-6" />
              <span className="font-bold text-lg">UniverCity</span>
            </div>
            <p className="text-gray-400 text-sm">
              Empowering minds, shaping futures through excellence in education and research.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><button className="hover:text-white transition-colors text-left">Academics</button></li>
              <li><button className="hover:text-white transition-colors text-left">Admissions</button></li>
              <li><button className="hover:text-white transition-colors text-left">Research</button></li>
              <li><button className="hover:text-white transition-colors text-left">Campus Life</button></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3">Student Services</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><button className="hover:text-white transition-colors text-left">Library</button></li>
              <li><button className="hover:text-white transition-colors text-left">Career Services</button></li>
              <li><button className="hover:text-white transition-colors text-left">Counseling</button></li>
              <li><button className="hover:text-white transition-colors text-left">Financial Aid</button></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3">Contact Info</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>123 University Ave, City</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>info@univercity.edu</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>Mon-Fri: 8AM-6PM</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-6 pt-6 text-center text-sm text-gray-400">
          <p>&copy; 2025 UniverCity. All rights reserved. | Privacy Policy | Terms of Service</p>
        </div>
      </div>
    </footer>
  );
}

// Mobile Bottom Navigation
function MobileBottomNav({ currentPage, setCurrentPage }) {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="grid grid-cols-4 gap-1">
        <button
          onClick={() => setCurrentPage('dashboard')}
          className={`flex flex-col items-center py-2 px-1 transition-colors ${
            currentPage === 'dashboard' ? 'text-blue-600' : 'text-gray-600'
          }`}
        >
          <Home className="h-5 w-5" />
          <span className="text-xs mt-1">Home</span>
        </button>
        <button
          onClick={() => setCurrentPage('profile')}
          className={`flex flex-col items-center py-2 px-1 transition-colors ${
            currentPage === 'profile' ? 'text-blue-600' : 'text-gray-600'
          }`}
        >
          <User className="h-5 w-5" />
          <span className="text-xs mt-1">Profile</span>
        </button>
        <button
          onClick={() => setCurrentPage('calendar')}
          className={`flex flex-col items-center py-2 px-1 transition-colors ${
            currentPage === 'calendar' ? 'text-blue-600' : 'text-gray-600'
          }`}
        >
          <Calendar className="h-5 w-5" />
          <span className="text-xs mt-1">Calendar</span>
        </button>
        <button
          onClick={() => setCurrentPage('settings')}
          className={`flex flex-col items-center py-2 px-1 transition-colors ${
            currentPage === 'settings' ? 'text-blue-600' : 'text-gray-600'
          }`}
        >
          <Settings className="h-5 w-5" />
          <span className="text-xs mt-1">Settings</span>
        </button>
      </div>
    </div>
  );
}

// Dashboard Content
function DashboardContent({ user, userRole }) {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 text-white rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative z-10">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Welcome back, {user?.name}!</h1>
          <p className="text-blue-100 mb-4">Ready to continue your academic journey?</p>
          <div className="flex flex-wrap gap-2 text-sm">
            <span className="bg-white/20 px-3 py-1 rounded-full">{user?.department}</span>
            <span className="bg-white/20 px-3 py-1 rounded-full">{user?.year}</span>
            <span className="bg-white/20 px-3 py-1 rounded-full">ID: {user?.studentId}</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">GPA</p>
              <p className="text-3xl font-bold text-green-600">3.85</p>
            </div>
            <Award className="h-12 w-12 text-green-500 bg-green-100 p-2 rounded-xl" />
          </div>
          <p className="text-xs text-gray-500 mt-2 flex items-center">
            <TrendingUp className="h-3 w-3 mr-1" />
            0.15 from last semester
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Courses</p>
              <p className="text-3xl font-bold text-blue-600">6</p>
            </div>
            <BookOpen className="h-12 w-12 text-blue-500 bg-blue-100 p-2 rounded-xl" />
          </div>
          <p className="text-xs text-gray-500 mt-2">2 in progress</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Credits</p>
              <p className="text-3xl font-bold text-purple-600">120</p>
            </div>
            <FileText className="h-12 w-12 text-purple-500 bg-purple-100 p-2 rounded-xl" />
          </div>
          <p className="text-xs text-gray-500 mt-2">18 this semester</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Events</p>
              <p className="text-3xl font-bold text-orange-600">8</p>
            </div>
            <Calendar className="h-12 w-12 text-orange-500 bg-orange-100 p-2 rounded-xl" />
          </div>
          <p className="text-xs text-gray-500 mt-2">3 this week</p>
        </div>
      </div>

      {/* Recent Activity & Upcoming Deadlines */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800">Recent Activity</h3>
            <Activity className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border-l-4 border-blue-500">
              <div className="bg-blue-500 p-2 rounded-lg">
                <BookOpen className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Assignment submitted</p>
                <p className="text-xs text-gray-600">Data Structures - 2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border-l-4 border-green-500">
              <div className="bg-green-500 p-2 rounded-lg">
                <Award className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Grade received</p>
                <p className="text-xs text-gray-600">Web Development - A+ (95%)</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl border-l-4 border-purple-500">
              <div className="bg-purple-500 p-2 rounded-lg">
                <Calendar className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Event registered</p>
                <p className="text-xs text-gray-600">Tech Conference 2025</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800">Upcoming Deadlines</h3>
            <Clock className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-red-50 to-red-100 rounded-xl border-l-4 border-red-500">
              <div>
                <p className="text-sm font-medium text-red-800">Database Project</p>
                <p className="text-xs text-red-600">Due in 2 days</p>
              </div>
              <span className="text-red-500 font-bold text-sm">Sep 14</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl border-l-4 border-orange-500">
              <div>
                <p className="text-sm font-medium text-orange-800">Math Quiz</p>
                <p className="text-xs text-orange-600">Due in 5 days</p>
              </div>
              <span className="text-orange-500 font-bold text-sm">Sep 17</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border-l-4 border-blue-500">
              <div>
                <p className="text-sm font-medium text-blue-800">Research Paper</p>
                <p className="text-xs text-blue-600">Due in 1 week</p>
              </div>
              <span className="text-blue-500 font-bold text-sm">Sep 19</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 rounded-xl transition-all duration-200 transform hover:scale-105">
            <BookOpen className="h-8 w-8 text-blue-600 mb-2" />
            <span className="text-sm font-medium text-gray-700">View Courses</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 rounded-xl transition-all duration-200 transform hover:scale-105">
            <FileText className="h-8 w-8 text-green-600 mb-2" />
            <span className="text-sm font-medium text-gray-700">Assignments</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 rounded-xl transition-all duration-200 transform hover:scale-105">
            <Award className="h-8 w-8 text-purple-600 mb-2" />
            <span className="text-sm font-medium text-gray-700">Grades</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200 rounded-xl transition-all duration-200 transform hover:scale-105">
            <MessageSquare className="h-8 w-8 text-orange-600 mb-2" />
            <span className="text-sm font-medium text-gray-700">Messages</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// Simple placeholder pages for other sections
function ProfilePage({ user }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Student Profile</h2>
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="bg-blue-500 p-4 rounded-full">
            <User className="h-8 w-8 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold">{user?.name}</h3>
            <p className="text-gray-600">{user?.email}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="p-4 bg-gray-50 rounded-xl">
            <p className="text-sm text-gray-600">Department</p>
            <p className="font-semibold">{user?.department}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl">
            <p className="text-sm text-gray-600">Year</p>
            <p className="font-semibold">{user?.year}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl">
            <p className="text-sm text-gray-600">Student ID</p>
            <p className="font-semibold">{user?.studentId}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl">
            <p className="text-sm text-gray-600">GPA</p>
            <p className="font-semibold">3.85</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CalendarPage() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Academic Calendar</h2>
      <div className="space-y-4">
        <div className="p-4 border-l-4 border-blue-500 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-800">September 30, 2025</h3>
          <p className="text-blue-600">Fall Semester Registration Deadline</p>
        </div>
        <div className="p-4 border-l-4 border-green-500 bg-green-50 rounded-lg">
          <h3 className="font-semibold text-green-800">October 15-16, 2025</h3>
          <p className="text-green-600">Annual Career Fair</p>
        </div>
        <div className="p-4 border-l-4 border-purple-500 bg-purple-50 rounded-lg">
          <h3 className="font-semibold text-purple-800">November 20, 2025</h3>
          <p className="text-purple-600">Mid-term Examinations Begin</p>
        </div>
      </div>
    </div>
  );
}

function SettingsPage() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Settings</h2>
      <div className="space-y-6">
        <div>
          <h3 className="font-semibold mb-3">Notifications</h3>
          <div className="space-y-2">
            <label className="flex items-center space-x-3">
              <input type="checkbox" className="rounded" defaultChecked />
              <span>Email notifications for assignments</span>
            </label>
            <label className="flex items-center space-x-3">
              <input type="checkbox" className="rounded" defaultChecked />
              <span>SMS alerts for important announcements</span>
            </label>
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-3">Privacy</h3>
          <div className="space-y-2">
            <label className="flex items-center space-x-3">
              <input type="checkbox" className="rounded" />
              <span>Show profile to other students</span>
            </label>
            <label className="flex items-center space-x-3">
              <input type="checkbox" className="rounded" defaultChecked />
              <span>Allow faculty to contact me</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MainPage({ user = mockUser }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');

  const handleLogout = () => {
    // Note: In Claude artifacts, localStorage is not supported
    // In your actual app, you would use: localStorage.removeItem("user");
    alert("Logged out successfully!");
    // window.location.href = "/";
  };

  const userRole = user?.department || "Computer Science";

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'profile':
        return <ProfilePage user={user} />;
      case 'calendar':
        return <CalendarPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return (
          <>
            <DepartmentLinks userRole={userRole} />
            <DashboardContent user={user} userRole={userRole} />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Announcement Banner */}
      
      
      {/* Header */}
      <Header 
        user={user} 
        onLogout={handleLogout} 
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <AnnouncementBanner />

      {/* Main Content */}
      <main className="pb-20 md:pb-8">
        <div className="max-w-6xl mx-auto px-4 py-6">
          {renderCurrentPage()}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {/* Footer */}
      <Footer />
    </div>
  );
}