import React, { useState, useEffect } from 'react';
import { Play, Pause, Volume2, ShoppingCart, User, Moon, Sun, BookOpen, Clock, Award, Star, CheckCircle, Lock, Zap, TrendingUp, Heart, Users, Trash2, ArrowRight, Trophy, Menu, X, CreditCard, Calendar, Target, BarChart3, FileText, Settings, Bell, Search, Filter, Globe, Code, Palette, Database, Brain, Smartphone, Video, DollarSign, ChevronLeft, ChevronRight } from 'lucide-react';

const EduStream = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentStep, setPaymentStep] = useState(1);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [paymentData, setPaymentData] = useState({ cardNumber: '', expiry: '', cvv: '', name: '' });
  const [isProcessing, setIsProcessing] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [goals, setGoals] = useState([
    { id: 1, title: 'Complete 5 courses', progress: 60, target: 5, current: 3 },
    { id: 2, title: 'Study 20 hours/week', progress: 75, target: 20, current: 15 },
    { id: 3, title: 'Earn 3 certificates', progress: 33, target: 3, current: 1 }
  ]);

  const courses = [
    {
      id: 1,
      title: "Full Stack Web Development 2025",
      instructor: "Sarah Johnson",
      rating: 4.9,
      reviews: 15234,
      students: 52341,
      price: 89.99,
      duration: "48h",
      level: "Beginner",
      category: "Web Development",
      gradient: "from-violet-600 to-purple-600",
      icon: Code,
      enrolled: false,
      progress: 0,
      modules: 12,
      bestseller: true
    },
    {
      id: 2,
      title: "AI & Machine Learning Mastery",
      instructor: "Dr. Michael Chen",
      rating: 4.9,
      reviews: 12890,
      students: 38567,
      price: 99.99,
      duration: "56h",
      level: "Advanced",
      category: "Data Science",
      gradient: "from-cyan-500 to-blue-600",
      icon: Brain,
      enrolled: false,
      progress: 0,
      modules: 15,
      bestseller: true
    },
    {
      id: 3,
      title: "Modern UI/UX Design",
      instructor: "Emma Williams",
      rating: 4.8,
      reviews: 9876,
      students: 31245,
      price: 79.99,
      duration: "32h",
      level: "Intermediate",
      category: "Design",
      gradient: "from-pink-500 to-rose-600",
      icon: Palette,
      enrolled: false,
      progress: 0,
      modules: 10,
      bestseller: true
    },
    {
      id: 4,
      title: "Advanced React & Next.js",
      instructor: "Alex Rodriguez",
      rating: 4.9,
      reviews: 8234,
      students: 28900,
      price: 94.99,
      duration: "40h",
      level: "Advanced",
      category: "Web Development",
      gradient: "from-emerald-500 to-teal-600",
      icon: Code,
      enrolled: false,
      progress: 0,
      modules: 14
    },
    {
      id: 5,
      title: "Cloud Architecture AWS",
      instructor: "James Martinez",
      rating: 4.8,
      reviews: 7654,
      students: 24567,
      price: 109.99,
      duration: "44h",
      level: "Advanced",
      category: "Cloud Computing",
      gradient: "from-orange-500 to-red-600",
      icon: Database,
      enrolled: false,
      progress: 0,
      modules: 13
    },
    {
      id: 6,
      title: "Mobile App Development",
      instructor: "Lisa Thompson",
      rating: 4.7,
      reviews: 6543,
      students: 21890,
      price: 84.99,
      duration: "36h",
      level: "Intermediate",
      category: "Mobile Development",
      gradient: "from-indigo-500 to-purple-600",
      icon: Smartphone,
      enrolled: false,
      progress: 0,
      modules: 11
    },
    {
      id: 7,
      title: "Data Science with Python",
      instructor: "Dr. Rachel Kim",
      rating: 4.9,
      reviews: 11234,
      students: 35678,
      price: 94.99,
      duration: "52h",
      level: "Intermediate",
      category: "Data Science",
      gradient: "from-yellow-500 to-orange-600",
      icon: BarChart3,
      enrolled: false,
      progress: 0,
      modules: 16
    },
    {
      id: 8,
      title: "Blockchain Development",
      instructor: "David Wang",
      rating: 4.8,
      reviews: 5432,
      students: 18900,
      price: 119.99,
      duration: "38h",
      level: "Advanced",
      category: "Blockchain",
      gradient: "from-blue-600 to-indigo-700",
      icon: Globe,
      enrolled: false,
      progress: 0,
      modules: 12
    },
    {
      id: 9,
      title: "Video Production Mastery",
      instructor: "Maria Garcia",
      rating: 4.7,
      reviews: 4567,
      students: 16780,
      price: 74.99,
      duration: "28h",
      level: "Beginner",
      category: "Content Creation",
      gradient: "from-red-500 to-pink-600",
      icon: Video,
      enrolled: false,
      progress: 0,
      modules: 9
    }
  ];

  const [enrolledCourses, setEnrolledCourses] = useState(courses);

  const showToast = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const addToCart = (course) => {
    if (!cart.find(item => item.id === course.id)) {
      setCart([...cart, course]);
      showToast('Added to cart!');
    }
  };

  const removeFromCart = (courseId) => {
    setCart(cart.filter(item => item.id !== courseId));
  };

  const toggleWishlist = (course) => {
    const exists = wishlist.find(item => item.id === course.id);
    setWishlist(exists ? wishlist.filter(item => item.id !== course.id) : [...wishlist, course]);
    showToast(exists ? 'Removed from wishlist' : 'Added to wishlist!');
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setUser({
      name: formData.name || formData.email.split('@')[0],
      email: formData.email,
      avatar: (formData.name || formData.email).substring(0, 2).toUpperCase()
    });
    
    setIsAuthenticated(true);
    setShowAuthModal(false);
    setIsProcessing(false);
    setFormData({ name: '', email: '', password: '' });
    showToast('Welcome back!');
  };

  const handlePayment = async () => {
    if (paymentStep === 1) {
      setPaymentStep(2);
      return;
    }
    
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    cart.forEach(course => {
      setEnrolledCourses(prev => prev.map(c =>
        c.id === course.id ? { ...c, enrolled: true, progress: 5 } : c
      ));
    });
    
    setCart([]);
    setShowPaymentModal(false);
    setPaymentStep(1);
    setIsProcessing(false);
    showToast('Payment successful! Courses enrolled.');
    setCurrentPage('dashboard');
  };

  const filteredCourses = enrolledCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || course.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', 'Web Development', 'Data Science', 'Design', 'Cloud Computing', 'Mobile Development', 'Blockchain', 'Content Creation'];

  return (
    <div className={`${darkMode ? 'bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'} min-h-screen font-sans`}>
      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-50 backdrop-blur-2xl ${darkMode ? 'bg-gray-950/90 border-gray-800' : 'bg-white/90 border-gray-200'} border-b`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentPage('home')}>
              <div className="w-12 h-12 bg-gradient-to-br from-violet-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/50">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                EduStream
              </span>
            </div>
            
            <div className="hidden lg:flex items-center gap-2">
              {['home', 'courses', 'dashboard'].map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-5 py-2.5 rounded-xl font-semibold transition-all ${
                    currentPage === page
                      ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg'
                      : darkMode ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {page.charAt(0).toUpperCase() + page.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => setDarkMode(!darkMode)} className={`p-3 rounded-xl ${darkMode ? 'bg-gray-800 text-yellow-400' : 'bg-gray-100 text-gray-700'}`}>
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button onClick={() => setCurrentPage('cart')} className={`relative p-3 rounded-xl ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}>
              <ShoppingCart className="w-5 h-5" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-violet-600 to-purple-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {cart.length}
                </span>
              )}
            </button>

            {isAuthenticated ? (
              <button onClick={() => setCurrentPage('dashboard')} className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-purple-600 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold">
                  {user?.avatar}
                </div>
                <span className="hidden md:block">{user?.name.split(' ')[0]}</span>
              </button>
            ) : (
              <button onClick={() => setShowAuthModal(true)} className="bg-gradient-to-r from-violet-600 to-purple-600 text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg">
                Sign In
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Home Page */}
      {currentPage === 'home' && (
        <div className="pt-20">
          {/* Hero */}
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 via-purple-600/20 to-pink-600/20"></div>
            <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)'}}></div>
            
            <div className="relative max-w-7xl mx-auto px-6 py-32">
              <div className="text-center space-y-8 max-w-4xl mx-auto">
                <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 px-6 py-3 rounded-full">
                  <Trophy className="w-5 h-5 text-violet-400" />
                  <span className="text-sm font-semibold text-violet-400">Join 150,000+ Students</span>
                </div>
                
                <h1 className="text-7xl font-black leading-tight">
                  Master Skills That
                  <span className="block bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Define Tomorrow
                  </span>
                </h1>
                
                <p className="text-2xl text-gray-400 max-w-2xl mx-auto">
                  Learn from industry experts with hands-on projects and real-world experience
                </p>
                
                <div className="flex items-center justify-center gap-4 pt-4">
                  <button onClick={() => setCurrentPage('courses')} className="group bg-gradient-to-r from-violet-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-violet-500/50 transition-all inline-flex items-center gap-3">
                    <span>Explore Courses</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button className={`px-8 py-4 rounded-2xl font-bold text-lg border-2 ${darkMode ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-300 hover:bg-gray-100'} transition-all`}>
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="max-w-7xl mx-auto px-6 py-20">
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { icon: Users, label: 'Active Students', value: '150K+' },
                { icon: BookOpen, label: 'Course Library', value: '500+' },
                { icon: Award, label: 'Certificates', value: '50K+' },
                { icon: Star, label: 'Average Rating', value: '4.8' }
              ].map((stat, idx) => (
                <div key={idx} className={`p-8 rounded-2xl ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border`}>
                  <stat.icon className="w-8 h-8 text-violet-600 mb-4" />
                  <div className="text-4xl font-black mb-2">{stat.value}</div>
                  <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Courses */}
          <div className="max-w-7xl mx-auto px-6 py-20">
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="text-5xl font-black mb-3">Featured Courses</h2>
                <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Handpicked bestsellers to kickstart your journey</p>
              </div>
              <button onClick={() => setCurrentPage('courses')} className="text-violet-600 font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                View All <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8">
              {enrolledCourses.filter(c => c.bestseller).map((course) => {
                const Icon = course.icon;
                return (
                  <div key={course.id} className={`group rounded-3xl overflow-hidden ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border hover:shadow-2xl transition-all cursor-pointer`} onClick={() => { setSelectedCourse(course); setCurrentPage('courseDetail'); }}>
                    <div className={`h-64 bg-gradient-to-br ${course.gradient} p-8 flex flex-col justify-between relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-black/20"></div>
                      <div className="relative z-10">
                        {course.bestseller && (
                          <span className="inline-flex items-center gap-1 bg-yellow-500 text-black text-xs font-bold px-3 py-1.5 rounded-full">
                            <Star className="w-3 h-3 fill-black" />
                            BESTSELLER
                          </span>
                        )}
                      </div>
                      <div className="relative z-10">
                        <Icon className="w-16 h-16 text-white/80" />
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-violet-600 transition-colors">{course.title}</h3>
                      <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{course.instructor}</p>
                      
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-bold">{course.rating}</span>
                          <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>({course.reviews})</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className={`w-4 h-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                          <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{course.students.toLocaleString()}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-3xl font-black bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">${course.price}</span>
                        <button onClick={(e) => { e.stopPropagation(); addToCart(course); }} className="bg-gradient-to-r from-violet-600 to-purple-600 text-white px-5 py-2.5 rounded-xl font-bold hover:shadow-lg transition-all">
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Courses Page */}
      {currentPage === 'courses' && (
        <div className="pt-20 min-h-screen">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="mb-12">
              <h1 className="text-5xl font-black mb-6">Explore Courses</h1>
              
              <div className="flex flex-col md:flex-row gap-4">
                <div className={`flex-1 flex items-center gap-3 px-5 py-3 rounded-2xl ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border`}>
                  <Search className="w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search courses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 bg-transparent outline-none"
                  />
                </div>
                
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className={`px-5 py-3 rounded-2xl font-semibold ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border outline-none`}
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
              {filteredCourses.map(course => {
                const Icon = course.icon;
                return (
                  <div key={course.id} className={`group rounded-3xl overflow-hidden ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border hover:shadow-2xl transition-all`}>
                    <div className={`h-56 bg-gradient-to-br ${course.gradient} p-6 flex flex-col justify-between relative overflow-hidden cursor-pointer`} onClick={() => { setSelectedCourse(course); setCurrentPage('courseDetail'); }}>
                      <div className="absolute inset-0 bg-black/20"></div>
                      <div className="relative z-10 flex items-start justify-between">
                        {course.bestseller && (
                          <span className="inline-flex items-center gap-1 bg-yellow-500 text-black text-xs font-bold px-3 py-1.5 rounded-full">
                            <Star className="w-3 h-3 fill-black" />
                            BEST
                          </span>
                        )}
                        <button onClick={(e) => { e.stopPropagation(); toggleWishlist(course); }} className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/30 transition-all">
                          <Heart className={`w-5 h-5 ${wishlist.find(item => item.id === course.id) ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                        </button>
                      </div>
                      <Icon className="w-14 h-14 text-white/80 relative z-10" />
                    </div>
                    
                    <div className="p-6">
                      <div className={`inline-block px-3 py-1 rounded-lg text-xs font-bold mb-3 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                        {course.level}
                      </div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-violet-600 transition-colors">{course.title}</h3>
                      <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{course.instructor}</p>
                      
                      <div className="flex items-center gap-4 mb-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-bold">{course.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-500">{course.students.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-500">{course.duration}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                        <span className="text-2xl font-black">${course.price}</span>
                        <button onClick={(e) => { e.stopPropagation(); addToCart(course); }} className="bg-gradient-to-r from-violet-600 to-purple-600 text-white px-5 py-2.5 rounded-xl font-bold hover:shadow-lg transition-all">
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Dashboard */}
      {currentPage === 'dashboard' && !isAuthenticated ? (
        <div className="min-h-screen flex items-center justify-center pt-20">
          <div className="text-center">
            <Lock className="w-20 h-20 mx-auto mb-6 text-gray-600" />
            <h2 className="text-4xl font-black mb-4">Sign In Required</h2>
            <p className="text-gray-400 mb-8">Please sign in to access your dashboard</p>
            <button onClick={() => setShowAuthModal(true)} className="bg-gradient-to-r from-violet-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold shadow-lg">
              Sign In Now
            </button>
          </div>
        </div>
      ) : currentPage === 'dashboard' && (
        <div className="pt-20 min-h-screen">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h1 className="text-5xl font-black mb-2">Welcome Back, {user?.name}!</h1>
                <p className="text-xl text-gray-400">Continue your learning journey</p>
              </div>
              <button className={`px-5 py-3 rounded-xl font-semibold ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border`}>
                <Settings className="w-5 h-5" />
              </button>
            </div>
            
            {/* Stats */}
            <div className="grid md:grid-cols-4 gap-6 mb-12">
              {[
                { icon: BookOpen, label: "Courses", value: enrolledCourses.filter(c => c.enrolled).length, gradient: "from-violet-600 to-purple-600" },
                { icon: Clock, label: "Hours Learned", value: "48", gradient: "from-cyan-600 to-blue-600" },
                { icon: Award, label: "Certificates", value: "3", gradient: "from-pink-600 to-rose-600" },
                { icon: TrendingUp, label: "Avg Progress", value: "67%", gradient: "from-emerald-600 to-teal-600" }
              ].map((stat, idx) => (
                <div key={idx} className={`relative p-8 rounded-3xl overflow-hidden ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-5`}></div>
                  <stat.icon className={`w-8 h-8 bg-gradient-to-br ${stat.gradient} bg-clip-text text-transparent mb-4 relative z-10`} style={{WebkitTextFillColor: 'transparent', WebkitBackgroundClip: 'text'}} />
                  <div className="text-4xl font-black mb-2 relative z-10">{stat.value}</div>
                  <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} relative z-10`}>{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Goals */}
            <div className={`p-8 rounded-3xl ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border mb-12`}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-black">Learning Goals</h2>
                <button className="text-violet-600 font-semibold text-sm">Edit Goals</button>
              </div>
              <div className="space-y-6">
                {goals.map(goal => (
                  <div key={goal.id}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Target className="w-5 h-5 text-violet-600" />
                        <span className="font-bold">{goal.title}</span>
                      </div>
                      <span className="text-sm font-bold text-violet-600">{goal.current}/{goal.target}</span>
                    </div>
                    <div className={`h-3 rounded-full ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
                      <div className="h-3 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full transition-all" style={{ width: `${goal.progress}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Enrolled Courses */}
            <div className={`p-8 rounded-3xl ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border`}>
              <h2 className="text-3xl font-black mb-6">Your Courses</h2>
              {enrolledCourses.filter(c => c.enrolled).length > 0 ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {enrolledCourses.filter(c => c.enrolled).map(course => {
                    const Icon = course.icon;
                    return (
                      <div key={course.id} className={`p-6 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} flex items-center gap-6 cursor-pointer hover:scale-[1.02] transition-transform`} onClick={() => { setSelectedCourse(course); setCurrentPage('courseDetail'); }}>
                        <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${course.gradient} flex items-center justify-center flex-shrink-0`}>
                          <Icon className="w-12 h-12 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-lg mb-3">{course.title}</h3>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Progress</span>
                              <span className="font-bold text-violet-600">{course.progress}%</span>
                            </div>
                            <div className={`h-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                              <div className="h-2 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full" style={{ width: `${course.progress}%` }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-20">
                  <BookOpen className="w-20 h-20 mx-auto mb-6 text-gray-600" />
                  <h3 className="text-2xl font-bold mb-2">No enrolled courses yet</h3>
                  <p className="text-gray-400 mb-8">Start learning today and unlock your potential</p>
                  <button onClick={() => setCurrentPage('courses')} className="bg-gradient-to-r from-violet-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold shadow-lg">
                    Browse Courses
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Cart Page */}
      {currentPage === 'cart' && (
        <div className="pt-20 min-h-screen">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <h1 className="text-5xl font-black mb-12">Shopping Cart ({cart.length})</h1>

            {cart.length > 0 ? (
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  {cart.map(course => {
                    const Icon = course.icon;
                    return (
                      <div key={course.id} className={`p-6 rounded-3xl ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border`}>
                        <div className="flex items-center gap-6">
                          <div className={`w-32 h-32 rounded-2xl bg-gradient-to-br ${course.gradient} flex items-center justify-center flex-shrink-0`}>
                            <Icon className="w-16 h-16 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-2xl font-bold mb-2">{course.title}</h3>
                            <p className={`text-sm mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>By {course.instructor}</p>
                            <div className="flex items-center gap-4 text-sm">
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <span className="font-bold">{course.rating}</span>
                              </div>
                              <span className={darkMode ? 'text-gray-500' : 'text-gray-400'}>{course.duration}</span>
                              <span className={darkMode ? 'text-gray-500' : 'text-gray-400'}>{course.modules} modules</span>
                            </div>
                          </div>
                          <div className="text-right flex flex-col items-end gap-4">
                            <span className="text-3xl font-black">${course.price}</span>
                            <button onClick={() => removeFromCart(course.id)} className="text-red-500 hover:text-red-600 p-2 hover:bg-red-500/10 rounded-xl transition-all">
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className={`p-8 rounded-3xl ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border h-fit sticky top-24`}>
                  <h3 className="text-2xl font-black mb-6">Order Summary</h3>
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Subtotal</span>
                      <span className="font-bold">${cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Discount</span>
                      <span className="font-bold text-green-500">-$0.00</span>
                    </div>
                    <div className={`h-px ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}></div>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold">Total</span>
                      <span className="text-4xl font-black bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                        ${cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <button onClick={() => {
                    if (!isAuthenticated) {
                      setShowAuthModal(true);
                    } else {
                      setShowPaymentModal(true);
                    }
                  }} className="w-full bg-gradient-to-r from-violet-600 to-purple-600 text-white py-5 rounded-2xl font-bold shadow-2xl hover:shadow-violet-500/50 transition-all">
                    Checkout Now
                  </button>
                </div>
              </div>
            ) : (
              <div className={`rounded-3xl p-20 text-center ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border`}>
                <ShoppingCart className="w-24 h-24 mx-auto mb-6 text-gray-600" />
                <h2 className="text-4xl font-black mb-4">Your cart is empty</h2>
                <p className="text-gray-400 text-xl mb-8">Discover amazing courses to start learning</p>
                <button onClick={() => setCurrentPage('courses')} className="bg-gradient-to-r from-violet-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold shadow-lg">
                  Browse Courses
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Course Detail */}
      {currentPage === 'courseDetail' && selectedCourse && (
        <div className="pt-20 min-h-screen">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <button onClick={() => setCurrentPage('courses')} className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
              <ChevronLeft className="w-5 h-5" />
              <span className="font-semibold">Back to Courses</span>
            </button>

            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <div className={`rounded-3xl overflow-hidden ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border`}>
                  <div className={`h-96 bg-gradient-to-br ${selectedCourse.gradient} p-12 flex items-center justify-center relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/20"></div>
                    {React.createElement(selectedCourse.icon, { className: "w-48 h-48 text-white/80 relative z-10" })}
                  </div>
                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`px-4 py-2 rounded-xl text-sm font-bold ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                        {selectedCourse.level}
                      </span>
                      <span className={`px-4 py-2 rounded-xl text-sm font-bold ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                        {selectedCourse.category}
                      </span>
                    </div>
                    <h1 className="text-5xl font-black mb-4">{selectedCourse.title}</h1>
                    <p className="text-xl text-gray-400 mb-6">Learn from {selectedCourse.instructor}</p>
                    
                    <div className="flex items-center gap-8 mb-8">
                      <div className="flex items-center gap-2">
                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        <span className="text-xl font-bold">{selectedCourse.rating}</span>
                        <span className="text-gray-400">({selectedCourse.reviews.toLocaleString()} reviews)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-gray-400" />
                        <span className="font-bold">{selectedCourse.students.toLocaleString()}</span>
                        <span className="text-gray-400">students</span>
                      </div>
                    </div>

                    <div className={`p-6 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                      <h3 className="text-2xl font-bold mb-4">What you'll learn</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {['Master core concepts and fundamentals', 'Build real-world projects', 'Industry best practices', 'Advanced techniques and tips', 'Portfolio-ready work', 'Certificate of completion'].map((point, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                            <span>{point}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className={`p-8 rounded-3xl ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border sticky top-24`}>
                  <div className="text-center mb-8">
                    <div className="text-6xl font-black bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-2">
                      ${selectedCourse.price}
                    </div>
                    <p className="text-gray-400">One-time payment</p>
                  </div>

                  {selectedCourse.enrolled ? (
                    <button className="w-full bg-gradient-to-r from-violet-600 to-purple-600 text-white py-5 rounded-2xl font-bold shadow-2xl mb-4">
                      Continue Learning
                    </button>
                  ) : (
                    <div className="space-y-4 mb-8">
                      <button onClick={() => {
                        if (!isAuthenticated) {
                          setShowAuthModal(true);
                        } else {
                          addToCart(selectedCourse);
                          setShowPaymentModal(true);
                        }
                      }} className="w-full bg-gradient-to-r from-violet-600 to-purple-600 text-white py-5 rounded-2xl font-bold shadow-2xl hover:shadow-violet-500/50 transition-all">
                        Buy Now
                      </button>
                      <button onClick={() => addToCart(selectedCourse)} className={`w-full py-5 rounded-2xl font-bold border-2 ${darkMode ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-300 hover:bg-gray-50'} transition-all`}>
                        Add to Cart
                      </button>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Duration</span>
                      <span className="font-bold">{selectedCourse.duration}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Modules</span>
                      <span className="font-bold">{selectedCourse.modules}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Level</span>
                      <span className="font-bold">{selectedCourse.level}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Certificate</span>
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className={`max-w-md w-full rounded-3xl ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border p-10 relative shadow-2xl`}>
            <button onClick={() => setShowAuthModal(false)} className="absolute top-6 right-6 text-gray-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>

            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-violet-600 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
                <User className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-4xl font-black mb-2">
                {authMode === 'login' ? 'Welcome Back' : 'Get Started'}
              </h2>
              <p className="text-gray-400">
                {authMode === 'login' ? 'Sign in to continue learning' : 'Create account to start learning'}
              </p>
            </div>

            <form onSubmit={handleAuth} className="space-y-5">
              {authMode === 'signup' && (
                <div>
                  <label className="block text-sm font-bold mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className={`w-full px-5 py-4 rounded-2xl ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'} border-2 outline-none focus:border-violet-600 transition-colors`}
                    placeholder="John Doe"
                    required
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-bold mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className={`w-full px-5 py-4 rounded-2xl ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'} border-2 outline-none focus:border-violet-600 transition-colors`}
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className={`w-full px-5 py-4 rounded-2xl ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'} border-2 outline-none focus:border-violet-600 transition-colors`}
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-violet-600 to-purple-600 text-white py-5 rounded-2xl font-bold shadow-2xl hover:shadow-violet-500/50 transition-all flex items-center justify-center gap-3"
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>{authMode === 'login' ? 'Sign In' : 'Create Account'}</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <button
                onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
                className="text-violet-600 font-semibold hover:text-violet-500 transition-colors"
              >
                {authMode === 'login' ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className={`max-w-2xl w-full rounded-3xl ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border p-10 relative shadow-2xl`}>
            <button onClick={() => { setShowPaymentModal(false); setPaymentStep(1); }} className="absolute top-6 right-6 text-gray-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>

            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-violet-600 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
                <CreditCard className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-4xl font-black mb-2">Complete Payment</h2>
              <p className="text-gray-400">Secure checkout powered by EduStream</p>
            </div>

            {paymentStep === 1 ? (
              <div>
                <div className="space-y-4 mb-8">
                  {cart.map(course => (
                    <div key={course.id} className={`p-4 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} flex items-center justify-between`}>
                      <span className="font-bold">{course.title}</span>
                      <span className="text-xl font-black">${course.price}</span>
                    </div>
                  ))}
                </div>

                <div className={`p-6 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} mb-8`}>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold">Total Amount</span>
                    <span className="text-4xl font-black bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                      ${cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
                    </span>
                  </div>
                </div>

                <button onClick={() => setPaymentStep(2)} className="w-full bg-gradient-to-r from-violet-600 to-purple-600 text-white py-5 rounded-2xl font-bold shadow-2xl hover:shadow-violet-500/50 transition-all flex items-center justify-center gap-3">
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); handlePayment(); }}>
                <div className="space-y-5 mb-8">
                  <div>
                    <label className="block text-sm font-bold mb-2">Cardholder Name</label>
                    <input
                      type="text"
                      value={paymentData.name}
                      onChange={(e) => setPaymentData({...paymentData, name: e.target.value})}
                      className={`w-full px-5 py-4 rounded-2xl ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'} border-2 outline-none focus:border-violet-600 transition-colors`}
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2">Card Number</label>
                    <input
                      type="text"
                      value={paymentData.cardNumber}
                      onChange={(e) => setPaymentData({...paymentData, cardNumber: e.target.value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim()})}
                      className={`w-full px-5 py-4 rounded-2xl ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'} border-2 outline-none focus:border-violet-600 transition-colors`}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold mb-2">Expiry Date</label>
                      <input
                        type="text"
                        value={paymentData.expiry}
                        onChange={(e) => setPaymentData({...paymentData, expiry: e.target.value})}
                        className={`w-full px-5 py-4 rounded-2xl ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'} border-2 outline-none focus:border-violet-600 transition-colors`}
                        placeholder="MM/YY"
                        maxLength={5}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-2">CVV</label>
                      <input
                        type="text"
                        value={paymentData.cvv}
                        onChange={(e) => setPaymentData({...paymentData, cvv: e.target.value})}
                        className={`w-full px-5 py-4 rounded-2xl ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'} border-2 outline-none focus:border-violet-600 transition-colors`}
                        placeholder="123"
                        maxLength={3}
                        required
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-gradient-to-r from-violet-600 to-purple-600 text-white py-5 rounded-2xl font-bold shadow-2xl hover:shadow-violet-500/50 transition-all flex items-center justify-center gap-3"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Processing Payment...</span>
                    </>
                  ) : (
                    <>
                      <DollarSign className="w-5 h-5" />
                      <span>Pay ${cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Notification Toast */}
      {showNotification && (
        <div className="fixed top-24 right-6 z-50 animate-slide-in">
          <div className={`rounded-2xl p-5 shadow-2xl border ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} flex items-center gap-4 min-w-[300px]`}>
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-bold">Success!</h4>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{notificationMessage}</p>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className={`border-t ${darkMode ? 'bg-gray-950 border-gray-800' : 'bg-white border-gray-200'} mt-32`}>
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-violet-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <span className="text-3xl font-black">EduStream</span>
              </div>
              <p className={`text-lg mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Empowering learners worldwide with cutting-edge education and industry-leading courses.
              </p>
            </div>

            <div>
              <h4 className="font-black text-lg mb-5">Platform</h4>
              <ul className="space-y-3">
                {['About Us', 'Careers', 'Blog', 'Press Kit'].map((item, idx) => (
                  <li key={idx}>
                    <button className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-black text-lg mb-5">Support</h4>
              <ul className="space-y-3">
                {['Help Center', 'Contact', 'FAQ', 'Community'].map((item, idx) => (
                  <li key={idx}>
                    <button className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className={`border-t ${darkMode ? 'border-gray-800' : 'border-gray-200'} pt-8 text-center`}>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              © 2025 EduStream. All rights reserved. Built with passion for learners everywhere.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EduStream;
