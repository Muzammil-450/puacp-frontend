import { 
  Calendar, 
  Home,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  GraduationCap,
} from "lucide-react";
import logo from "../../../assets/logo.png"

export default function Header({ 
  user, 
  isMobileMenuOpen, 
  setIsMobileMenuOpen, 
  currentPage, 
  setCurrentPage 
}) {
  

  return (
    <header className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo and University Name */}
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              {logo ? (
                <img
                  src={logo}
                  alt="PUACP Logo"
                  className="h-14 w-14 rounded-full border-2 border-blue-600 shadow-lg object-cover"
                />
              ) : (
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-full shadow-lg">
                  <GraduationCap className="h-8 w-8 text-white" />
                </div>
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">PUACP</h1>
              <p className="text-sm text-gray-600">
                Punjab University Affiliated Colleges Program
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {[
              { key: "dashboard", label: "Dashboard", icon: Home },
              { key: "calendar", label: "Calendar", icon: Calendar },
              { key: "settings", label: "Settings", icon: Settings },
              { key: "profile", label: "Profile", icon: User },
            ].map((item) => {
              const Icon = item.icon;
              const active = currentPage === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => setCurrentPage(item.key)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    active
                      ? "bg-blue-50 text-yellow-800 border-b-2 border-blue-700 shadow-sm"
                      : "text-gray-700 hover:text-yellow-600 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* User Info + Logout */}
          <div className="flex items-center space-x-5">
            <div className="hidden md:block text-right">
              <p className="px-4 py-1 rounded-full bg-blue-50 text-blue-700 font-semibold shadow-sm text-sm">
    {user?.name}
  </p>
            </div>
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Accent bar under header */}
      <div className="h-1 bg-gradient-to-r from-blue-500 via-yellow-600 to-yellow-800"></div>
    </header>
  );
}
