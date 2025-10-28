import React, { useState, useEffect } from 'react';
import { Play, Pause, ShoppingCart, User, Moon, Sun, BookOpen, Clock, Award, Star, CheckCircle, Lock, Zap, TrendingUp, Heart, Users, Trash2, ArrowRight, Trophy, Menu, X, CreditCard, Calendar, Target, BarChart3, FileText, Settings, Bell, Search, Filter, Globe, Code, Palette, Database, Brain, Smartphone, Video, DollarSign, ChevronLeft, ChevronRight, Mail, Github, Chrome, Flame, Activity, BookMarked, GraduationCap, MessageCircle, Share2, Download, Eye, Bookmark, Plus, Sparkles, Rocket, Shield, Layers, Package, Briefcase, Coffee, Headphones, CheckCheck, XCircle, Infinity, Wifi } from 'lucide-react';

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
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentStep, setPaymentStep] = useState(1);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [paymentData, setPaymentData] = useState({ cardNumber: '', expiry: '', cvv: '', name: '', upiId: '' });
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [currentStreak, setCurrentStreak] = useState(12);
  const [activeTab, setActiveTab] = useState('ongoing');
  
  const [goals, setGoals] = useState([
    { id: 1, title: 'Complete Web Dev Bootcamp', progress: 75, target: 100, current: 75, icon: Code, color: 'from-blue-500 to-cyan-500' },
    { id: 2, title: 'Master 3 Programming Languages', progress: 66, target: 3, current: 2, icon: Brain, color: 'from-purple-500 to-pink-500' },
    { id: 3, title: 'Build 5 Real Projects', progress: 40, target: 5, current: 2, icon: Rocket, color: 'from-orange-500 to-red-500' }
  ]);

  const [weeklyActivity, setWeeklyActivity] = useState([
    { day: 'Mon', hours: 3.5 },
    { day: 'Tue', hours: 2.8 },
    { day: 'Wed', hours: 4.2 },
    { day: 'Thu', hours: 3.0 },
    { day: 'Fri', hours: 4.5 },
    { day: 'Sat', hours: 5.2 },
    { day: 'Sun', hours: 3.8 }
  ]);

  const courses = [
    {
      id: 1,
      title: "Complete Web Development Masterclass",
      instructor: "Rahul Sharma",
      rating: 4.8,
      reviews: 8234,
      students: 45678,
      price: 4999,
      originalPrice: 12999,
      duration: "52h",
      level: "Beginner to Advanced",
      category: "Web Development",
      gradient: "from-blue-600 via-blue-500 to-cyan-500",
      icon: Code,
      enrolled: false,
      progress: 0,
      modules: 18,
      bestseller: true,
      language: "Hindi + English",
      lastUpdated: "Oct 2024"
    },
    {
      id: 2,
      title: "AI & Machine Learning Full Course",
      instructor: "Dr. Priya Verma",
      rating: 4.9,
      reviews: 6543,
      students: 32456,
      price: 5999,
      originalPrice: 14999,
      duration: "68h",
      level: "Intermediate",
      category: "Data Science",
      gradient: "from-purple-600 via-purple-500 to-pink-500",
      icon: Brain,
      enrolled: false,
      progress: 0,
      modules: 22,
      bestseller: true,
      language: "Hindi + English",
      lastUpdated: "Nov 2024"
    },
    {
      id: 3,
      title: "UI/UX Design Pro Bootcamp",
      instructor: "Anjali Kapoor",
      rating: 4.7,
      reviews: 4321,
      students: 28934,
      price: 3999,
      originalPrice: 9999,
      duration: "38h",
      level: "Beginner",
      category: "Design",
      gradient: "from-pink-600 via-rose-500 to-orange-500",
      icon: Palette,
      enrolled: false,
      progress: 0,
      modules: 14,
      bestseller: true,
      language: "Hindi",
      lastUpdated: "Oct 2024"
    },
    {
      id: 4,
      title: "Full Stack JavaScript Development",
      instructor: "Arjun Singh",
      rating: 4.8,
      reviews: 5678,
      students: 34567,
      price: 4499,
      originalPrice: 11999,
      duration: "45h",
      level: "Advanced",
      category: "Web Development",
      gradient: "from-green-600 via-emerald-500 to-teal-500",
      icon: Code,
      enrolled: false,
      progress: 0,
      modules: 16
    },
    {
      id: 5,
      title: "Cloud Computing with AWS & Azure",
      instructor: "Vikram Patel",
      rating: 4.6,
      reviews: 3456,
      students: 23456,
      price: 6999,
      originalPrice: 16999,
      duration: "55h",
      level: "Advanced",
      category: "Cloud Computing",
      gradient: "from-orange-600 via-amber-500 to-yellow-500",
      icon: Database,
      enrolled: false,
      progress: 0,
      modules: 20
    },
    {
      id: 6,
      title: "Android App Development Masterclass",
      instructor: "Sneha Reddy",
      rating: 4.7,
      reviews: 4567,
      students: 31234,
      price: 4799,
      originalPrice: 12499,
      duration: "48h",
      level: "Intermediate",
      category: "Mobile Development",
      gradient: "from-indigo-600 via-blue-500 to-purple-500",
      icon: Smartphone,
      enrolled: false,
      progress: 0,
      modules: 17
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
      showToast('Course added to cart!');
    }
  };

  const removeFromCart = (courseId) => {
    setCart(cart.filter(item => item.id !== courseId));
    showToast('Removed from cart');
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
      avatar: (formData.name || formData.email).substring(0, 2).toUpperCase(),
      joinDate: 'Oct 2024',
      coursesCompleted: 5,
      hoursLearned: 87,
      certificates: 3
    });
    
    setIsAuthenticated(true);
    setShowAuthModal(false);
    setIsProcessing(false);
    setFormData({ name: '', email: '', password: '' });
    showToast('Welcome to EduStream!');
  };

  const handleSocialAuth = async (provider) => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setUser({
      name: `${provider} User`,
      email: `user@${provider.toLowerCase()}.com`,
      avatar: provider.substring(0, 2).toUpperCase(),
      joinDate: 'Oct 2024',
      coursesCompleted: 5,
      hoursLearned: 87,
      certificates: 3
    });
    
    setIsAuthenticated(true);
    setShowAuthModal(false);
    setIsProcessing(false);
    showToast(`Signed in with ${provider}!`);
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
        c.id === course.id ? { ...c, enrolled: true, progress: 5, lastAccessed: new Date().toISOString() } : c
      ));
    });
    
    setCart([]);
    setShowPaymentModal(false);
    setPaymentStep(1);
    setIsProcessing(false);
    showToast('Payment successful! Start learning now.');
    setCurrentPage('dashboard');
  };

  const filteredCourses = enrolledCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || course.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', 'Web Development', 'Data Science', 'Design', 'Cloud Computing', 'Mobile Development'];

  return (
    <div className={`${darkMode ? 'bg-slate-950 text-white' : 'bg-gray-50 text-gray-900'} min-h-screen transition-colors`} style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>
      {/* Modern Floating Navbar */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl">
        <div className={`${darkMode ? 'bg-slate-900/80 border-slate-700/50' : 'bg-white/80 border-gray-200'} backdrop-blur-2xl border rounded-3xl shadow-2xl shadow-black/10`}>
          <div className="px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => setCurrentPage('home')}>
                <div className="relative w-10 h-10">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl"></div>
                  <div className="absolute inset-0.5 bg-slate-950 rounded-xl flex items-center justify-center">
                    <Layers className="w-5 h-5 text-blue-400" />
                  </div>
                </div>
                <span className="text-xl font-black tracking-tight">EduStream</span>
              </div>
              
              <div className="hidden lg:flex items-center gap-1">
                {['home', 'courses', 'dashboard'].map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all ${
                      currentPage === page
                        ? darkMode ? 'bg-slate-800 text-white' : 'bg-gray-100 text-gray-900'
                        : darkMode ? 'text-slate-400 hover:text-white hover:bg-slate-800/50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    {page.charAt(0).toUpperCase() + page.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button onClick={() => setDarkMode(!darkMode)} className={`p-2.5 rounded-xl transition-all ${darkMode ? 'bg-slate-800 hover:bg-slate-700 text-yellow-400' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}>
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              <button onClick={() => setCurrentPage('cart')} className={`relative p-2.5 rounded-xl transition-all ${darkMode ? 'hover:bg-slate-800' : 'hover:bg-gray-100'}`}>
                <ShoppingCart className="w-4 h-4" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {cart.length}
                  </span>
                )}
              </button>

              {isAuthenticated ? (
                <button onClick={() => setCurrentPage('dashboard')} className="flex items-center gap-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-4 py-2 rounded-xl font-semibold text-sm shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all">
                  <div className="w-6 h-6 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center font-bold text-xs">
                    {user?.avatar}
                  </div>
                  <span className="hidden md:block">{user?.name.split(' ')[0]}</span>
                </button>
              ) : (
                <button onClick={() => setShowAuthModal(true)} className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-5 py-2 rounded-xl font-semibold text-sm shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all">
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Home Page */}
      {currentPage === 'home' && (
        <div className="pt-24">
          {/* Hero Section */}
          <div className="relative overflow-hidden py-20">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10"></div>
            <div className="absolute inset-0" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23${darkMode ? '3b82f6' : '3b82f6'}' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`}}></div>
            
            <div className="relative max-w-7xl mx-auto px-6">
              <div className="text-center space-y-8 max-w-4xl mx-auto">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-blue-500/20 px-5 py-2.5 rounded-full">
                  <Sparkles className="w-4 h-4 text-blue-400" />
                  <span className="text-sm font-bold text-blue-400">Trusted by 2 Lakh+ Students Across India</span>
                </div>
                
                <h1 className="text-6xl md:text-7xl font-black leading-[1.1] tracking-tight">
                  Learn Today,
                  <br />
                  <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    Lead Tomorrow
                  </span>
                </h1>
                
                <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                  Master in-demand skills with expert-led courses. Learn at your own pace, build real projects, and advance your career.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                  <button onClick={() => setCurrentPage('courses')} className="group bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-8 py-4 rounded-2xl font-bold shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 transition-all inline-flex items-center gap-3">
                    <span>Start Learning</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button className={`px-8 py-4 rounded-2xl font-bold border-2 ${darkMode ? 'border-slate-700 hover:bg-slate-800/50 text-white' : 'border-gray-300 hover:bg-gray-100 text-gray-900'} transition-all inline-flex items-center gap-2`}>
                    <Play className="w-5 h-5" />
                    Watch Demo
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: Users, label: 'Active Learners', value: '2L+', color: 'from-blue-500 to-cyan-500' },
                { icon: BookOpen, label: 'Total Courses', value: '350+', color: 'from-purple-500 to-pink-500' },
                { icon: Award, label: 'Certificates Issued', value: '75K+', color: 'from-orange-500 to-red-500' },
                { icon: Star, label: 'Average Rating', value: '4.8', color: 'from-green-500 to-teal-500' }
              ].map((stat, idx) => (
                <div key={idx} className={`relative p-6 rounded-2xl ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'} border overflow-hidden group hover:scale-105 transition-transform`}>
                  <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${stat.color} opacity-10 blur-2xl`}></div>
                  <stat.icon className={`w-7 h-7 mb-3 bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`} />
                  <div className="text-3xl font-black mb-1">{stat.value}</div>
                  <div className={`text-sm font-semibold ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Courses */}
          <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="text-4xl font-black mb-2 tracking-tight">Top Rated Courses</h2>
                <p className={`text-lg ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>Start your learning journey with our bestsellers</p>
              </div>
              <button onClick={() => setCurrentPage('courses')} className="text-blue-500 font-bold flex items-center gap-2 hover:gap-3 transition-all">
                View All <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
              {enrolledCourses.filter(c => c.bestseller).map((course) => {
                const Icon = course.icon;
                const discount = Math.round((1 - course.price / course.originalPrice) * 100);
                return (
                  <div key={course.id} className={`group rounded-2xl overflow-hidden ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'} border hover:shadow-2xl hover:shadow-purple-500/10 transition-all cursor-pointer hover:scale-[1.02]`} onClick={() => { setSelectedCourse(course); setCurrentPage('courseDetail'); }}>
                    <div className={`relative h-48 bg-gradient-to-br ${course.gradient} p-6 flex flex-col justify-between overflow-hidden`}>
                      <div className="absolute top-4 right-4 flex flex-col gap-2">
                        {course.bestseller && (
                          <span className="bg-yellow-400 text-black text-xs font-black px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                            <Trophy className="w-3 h-3" />
                            BESTSELLER
                          </span>
                        )}
                        <button onClick={(e) => { e.stopPropagation(); toggleWishlist(course); }} className="w-9 h-9 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-all">
                          <Heart className={`w-4 h-4 ${wishlist.find(item => item.id === course.id) ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                        </button>
                      </div>
                      <div>
                        <Icon className="w-12 h-12 text-white/90 drop-shadow-lg" />
                      </div>
                    </div>
                    
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${darkMode ? 'bg-slate-800 text-slate-300' : 'bg-gray-100 text-gray-700'}`}>
                          {course.level}
                        </span>
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${darkMode ? 'bg-slate-800 text-slate-300' : 'bg-gray-100 text-gray-700'}`}>
                          {course.language}
                        </span>
                      </div>
                      
                      <h3 className="text-lg font-black mb-2 line-clamp-2 group-hover:text-blue-500 transition-colors">{course.title}</h3>
                      <p className={`text-sm mb-3 ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>{course.instructor}</p>
                      
                      <div className="flex items-center gap-4 mb-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-bold">{course.rating}</span>
                          <span className={`text-xs ${darkMode ? 'text-slate-500' : 'text-gray-400'}`}>({course.reviews})</span>
                        </div>
                        <div className="flex items-center gap-1 text-slate-500">
                          <Users className="w-4 h-4" />
                          <span className="text-xs">{(course.students / 1000).toFixed(0)}K</span>
                        </div>
                        <div className="flex items-center gap-1 text-slate-500">
                          <Clock className="w-4 h-4" />
                          <span className="text-xs">{course.duration}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-black">₹{course.price.toLocaleString()}</span>
                          <span className={`text-sm line-through ${darkMode ? 'text-slate-600' : 'text-gray-400'}`}>₹{course.originalPrice.toLocaleString()}</span>
                          <span className="text-xs font-black text-green-500">{discount}% OFF</span>
                        </div>
                        <button onClick={(e) => { e.stopPropagation(); addToCart(course); }} className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-xl font-bold text-sm hover:shadow-lg hover:shadow-purple-500/30 transition-all">
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-black mb-3 tracking-tight">Why Choose EduStream?</h2>
              <p className={`text-lg ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>Everything you need to succeed in your learning journey</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Infinity, title: 'Lifetime Access', desc: 'Learn at your own pace with unlimited access to all courses', color: 'from-blue-500 to-cyan-500' },
                { icon: Award, title: 'Industry Certificates', desc: 'Get recognized certificates to showcase your skills', color: 'from-purple-500 to-pink-500' },
                { icon: Users, title: 'Expert Instructors', desc: 'Learn from industry professionals with years of experience', color: 'from-orange-500 to-red-500' },
                { icon: Headphones, title: '24/7 Support', desc: 'Get help whenever you need with our dedicated support team', color: 'from-green-500 to-teal-500' },
                { icon: Smartphone, title: 'Mobile Learning', desc: 'Study anywhere, anytime on your mobile or tablet', color: 'from-pink-500 to-rose-500' },
                { icon: Rocket, title: 'Career Growth', desc: 'Advance your career with in-demand skills and projects', color: 'from-indigo-500 to-purple-500' }
              ].map((feature, idx) => (
                <div key={idx} className={`relative p-6 rounded-2xl ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'} border overflow-hidden group hover:scale-105 transition-transform`}>
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.color} opacity-10 blur-3xl`}></div>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-black mb-2">{feature.title}</h3>
                  <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Courses Page */}
      {currentPage === 'courses' && (
        <div className="pt-24 min-h-screen">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="mb-10">
              <h1 className="text-4xl font-black mb-6 tracking-tight">All Courses</h1>
              
              <div className="flex flex-col md:flex-row gap-4">
                <div className={`flex-1 flex items-center gap-3 px-5 py-3.5 rounded-2xl ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'} border`}>
                  <Search className="w-5 h-5 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Search for courses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 bg-transparent outline-none text-sm"
                  />
                </div>
                
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className={`px-5 py-3.5 rounded-2xl font-semibold text-sm ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'} border outline-none cursor-pointer`}
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
              {filteredCourses.map(course => {
                const Icon = course.icon;
                const discount = Math.round((1 - course.price / course.originalPrice) * 100);
                return (
                  <div key={course.id} className={`group rounded-2xl overflow-hidden ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'} border hover:shadow-2xl hover:shadow-purple-500/10 transition-all hover:scale-[1.02]`}>
                    <div className={`relative h-44 bg-gradient-to-br ${course.gradient} p-5 flex flex-col justify-between overflow-hidden cursor-pointer`} onClick={() => { setSelectedCourse(course); setCurrentPage('courseDetail'); }}>
                      <div className="flex items-start justify-between">
                        {course.bestseller && (
                          <span className="bg-yellow-400 text-black text-xs font-black px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                            <Trophy className="w-3 h-3" />
                            TOP
                          </span>
                        )}
                        <button onClick={(e) => { e.stopPropagation(); toggleWishlist(course); }} className="w-9 h-9 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-all">
                          <Heart className={`w-4 h-4 ${wishlist.find(item => item.id === course.id) ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                        </button>
                      </div>
                      <Icon className="w-12 h-12 text-white/90 drop-shadow-lg" />
                    </div>
                    
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${darkMode ? 'bg-slate-800 text-slate-300' : 'bg-gray-100 text-gray-700'}`}>
                          {course.level}
                        </span>
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${darkMode ? 'bg-slate-800 text-slate-300' : 'bg-gray-100 text-gray-700'}`}>
                          {course.language}
                        </span>
                      </div>
                      
                      <h3 className="text-lg font-black mb-2 line-clamp-2 group-hover:text-blue-500 transition-colors cursor-pointer" onClick={() => { setSelectedCourse(course); setCurrentPage('courseDetail'); }}>{course.title}</h3>
                      <p className={`text-sm mb-3 ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>{course.instructor}</p>
                      
                      <div className="flex items-center gap-4 mb-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-bold">{course.rating}</span>
                        </div>
                        <div className="flex items-center gap-1 text-slate-500">
                          <Users className="w-4 h-4" />
                          <span className="text-xs">{(course.students / 1000).toFixed(0)}K</span>
                        </div>
                        <div className="flex items-center gap-1 text-slate-500">
                          <Clock className="w-4 h-4" />
                          <span className="text-xs">{course.duration}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-black">₹{course.price.toLocaleString()}</span>
                          <span className={`text-sm line-through ${darkMode ? 'text-slate-600' : 'text-gray-400'}`}>₹{course.originalPrice.toLocaleString()}</span>
                        </div>
                        <button onClick={(e) => { e.stopPropagation(); addToCart(course); }} className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-xl font-bold text-sm hover:shadow-lg hover:shadow-purple-500/30 transition-all">
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
        <div className="min-h-screen flex items-center justify-center pt-24">
          <div className="text-center max-w-md">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-purple-500/30">
              <Lock className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-3xl font-black mb-3">Sign In Required</h2>
            <p className="text-slate-400 mb-8 text-lg">Please sign in to access your personalized dashboard</p>
            <button onClick={() => setShowAuthModal(true)} className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-8 py-4 rounded-2xl font-bold shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 transition-all">
              Sign In Now
            </button>
          </div>
        </div>
      ) : currentPage === 'dashboard' && (
        <div className="pt-24 min-h-screen pb-12">
          <div className="max-w-7xl mx-auto px-6 py-8">
            {/* Dashboard Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
              <div>
                <h1 className="text-4xl font-black mb-2 tracking-tight">Hey {user?.name}! 👋</h1>
                <p className="text-lg text-slate-400">Ready to continue your learning journey?</p>
              </div>
              <div className="flex items-center gap-3">
                <button className={`p-3 rounded-xl ${darkMode ? 'bg-slate-900 border-slate-800 hover:bg-slate-800' : 'bg-white border-gray-200 hover:bg-gray-50'} border transition-all`}>
                  <Bell className="w-5 h-5" />
                </button>
                <button className={`p-3 rounded-xl ${darkMode ? 'bg-slate-900 border-slate-800 hover:bg-slate-800' : 'bg-white border-gray-200 hover:bg-gray-50'} border transition-all`}>
                  <Settings className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Streak & Quick Stats */}
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              {/* Streak Card */}
              <div className="md:col-span-2 relative rounded-2xl overflow-hidden shadow-2xl shadow-orange-500/20">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-red-500 to-pink-600"></div>
                <div className="relative z-10 p-8 flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
                      <Flame className="w-10 h-10 text-white drop-shadow-2xl" />
                    </div>
                    <div>
                      <div className="text-5xl font-black text-white mb-1">{currentStreak} Days</div>
                      <div className="text-white/90 text-lg font-bold">Learning Streak 🔥</div>
                      <div className="text-white/70 text-sm mt-1">Keep it up! You're doing amazing</div>
                    </div>
                  </div>
                  <button className="bg-white/20 backdrop-blur-md text-white px-5 py-3 rounded-xl font-bold hover:bg-white/30 transition-all hidden md:block">
                    View Progress
                  </button>
                </div>
              </div>

              {/* Quick Stat */}
              <div className={`p-6 rounded-2xl ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'} border`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-3xl font-black">{user?.certificates || 3}</div>
                    <div className={`text-sm font-semibold ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>Certificates</div>
                  </div>
                </div>
                <div className={`text-xs ${darkMode ? 'text-slate-500' : 'text-gray-500'}`}>Earned this month</div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid md:grid-cols-4 gap-6 mb-10">
              {[
                { icon: BookOpen, label: "Active Courses", value: enrolledCourses.filter(c => c.enrolled).length, gradient: "from-blue-500 to-cyan-500" },
                { icon: Clock, label: "Learning Hours", value: `${user?.hoursLearned || 87}h`, gradient: "from-purple-500 to-pink-500" },
                { icon: CheckCheck, label: "Completed", value: `${user?.coursesCompleted || 5}`, gradient: "from-green-500 to-teal-500" },
                { icon: Target, label: "Goal Progress", value: "75%", gradient: "from-orange-500 to-red-500" }
              ].map((stat, idx) => (
                <div key={idx} className={`relative p-6 rounded-2xl overflow-hidden ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'} border hover:scale-105 transition-transform group`}>
                  <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${stat.gradient} opacity-10 blur-2xl`}></div>
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mb-3 relative z-10`}>
                    <stat.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-3xl font-black mb-1 relative z-10">{stat.value}</div>
                  <div className={`text-sm font-semibold ${darkMode ? 'text-slate-400' : 'text-gray-600'} relative z-10`}>{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-3 gap-8 mb-10">
              {/* Learning Goals */}
              <div className="lg:col-span-2">
                <div className={`p-8 rounded-2xl ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'} border`}>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-black flex items-center gap-3">
                      <Target className="w-7 h-7 text-blue-500" />
                      Your Goals
                    </h2>
                    <button className="text-blue-500 font-bold text-sm hover:text-blue-400 transition-colors">Edit</button>
                  </div>
                  <div className="space-y-5">
                    {goals.map(goal => {
                      const GoalIcon = goal.icon;
                      return (
                        <div key={goal.id} className={`p-5 rounded-xl ${darkMode ? 'bg-slate-800' : 'bg-gray-50'}`}>
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 bg-gradient-to-br ${goal.color} rounded-lg flex items-center justify-center`}>
                                <GoalIcon className="w-5 h-5 text-white" />
                              </div>
                              <span className="font-bold">{goal.title}</span>
                            </div>
                            <span className="text-sm font-black text-blue-500">{goal.current}/{goal.target}</span>
                          </div>
                          <div className={`h-2.5 rounded-full ${darkMode ? 'bg-slate-700' : 'bg-gray-200'} overflow-hidden`}>
                            <div className={`h-2.5 bg-gradient-to-r ${goal.color} rounded-full transition-all`} style={{ width: `${goal.progress}%` }}></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Weekly Activity */}
              <div className={`p-8 rounded-2xl ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'} border`}>
                <h2 className="text-xl font-black mb-6 flex items-center gap-2">
                  <Activity className="w-6 h-6 text-blue-500" />
                  This Week
                </h2>
                <div className="space-y-3">
                  {weeklyActivity.map((day, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <span className={`text-sm font-semibold ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>{day.day}</span>
                      <div className="flex items-center gap-2 flex-1 mx-4">
                        <div className={`flex-1 h-2 rounded-full ${darkMode ? 'bg-slate-800' : 'bg-gray-200'} overflow-hidden`}>
                          <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" style={{ width: `${(day.hours / 6) * 100}%` }}></div>
                        </div>
                      </div>
                      <span className="text-sm font-black">{day.hours}h</span>
                    </div>
                  ))}
                </div>
                <div className={`mt-6 pt-6 border-t ${darkMode ? 'border-slate-800' : 'border-gray-200'}`}>
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>Total this week</span>
                    <span className="text-2xl font-black text-blue-500">{weeklyActivity.reduce((sum, day) => sum + day.hours, 0).toFixed(1)}h</span>
                  </div>
                </div>
              </div>
            </div>

            {/* My Courses */}
            <div className={`p-8 rounded-2xl ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'} border`}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black flex items-center gap-3">
                  <GraduationCap className="w-7 h-7 text-blue-500" />
                  My Courses
                </h2>
                <div className="flex items-center gap-2">
                  <button onClick={() => setActiveTab('ongoing')} className={`px-4 py-2 rounded-xl font-bold text-sm transition-all ${activeTab === 'ongoing' ? 'bg-blue-500 text-white' : darkMode ? 'bg-slate-800 text-slate-400' : 'bg-gray-100 text-gray-600'}`}>
                    Ongoing
                  </button>
                  <button onClick={() => setActiveTab('completed')} className={`px-4 py-2 rounded-xl font-bold text-sm transition-all ${activeTab === 'completed' ? 'bg-blue-500 text-white' : darkMode ? 'bg-slate-800 text-slate-400' : 'bg-gray-100 text-gray-600'}`}>
                    Completed
                  </button>
                </div>
              </div>

              {enrolledCourses.filter(c => c.enrolled).length > 0 ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {enrolledCourses.filter(c => c.enrolled).map(course => {
                    const Icon = course.icon;
                    return (
                      <div key={course.id} className={`p-5 rounded-xl ${darkMode ? 'bg-slate-800 hover:bg-slate-750' : 'bg-gray-50 hover:bg-gray-100'} flex items-center gap-5 cursor-pointer hover:scale-[1.02] transition-all group`} onClick={() => { setSelectedCourse(course); setCurrentPage('courseDetail'); }}>
                        <div className={`w-20 h-20 rounded-xl bg-gradient-to-br ${course.gradient} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                          <Icon className="w-10 h-10 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-black text-base mb-1 truncate group-hover:text-blue-500 transition-colors">{course.title}</h3>
                          <p className={`text-xs mb-3 ${darkMode ? 'text-slate-500' : 'text-gray-500'}`}>Last active: 2h ago</p>
                          <div className="space-y-2">
                            <div className="flex justify-between text-xs">
                              <span className={darkMode ? 'text-slate-400' : 'text-gray-600'}>Progress</span>
                              <span className="font-black text-blue-500">{course.progress}%</span>
                            </div>
                            <div className={`h-1.5 rounded-full ${darkMode ? 'bg-slate-700' : 'bg-gray-200'} overflow-hidden`}>
                              <div className="h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" style={{ width: `${course.progress}%` }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-purple-500/30">
                    <BookOpen className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-black mb-2">No enrolled courses yet</h3>
                  <p className="text-slate-400 mb-6">Start your learning journey today!</p>
                  <button onClick={() => setCurrentPage('courses')} className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-8 py-4 rounded-2xl font-bold shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 transition-all">
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
        <div className="pt-24 min-h-screen pb-12">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <h1 className="text-4xl font-black mb-10 flex items-center gap-4 tracking-tight">
              <ShoppingCart className="w-10 h-10 text-blue-500" />
              Shopping Cart ({cart.length} items)
            </h1>

            {cart.length > 0 ? (
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-5">
                  {cart.map(course => {
                    const Icon = course.icon;
                    const discount = Math.round((1 - course.price / course.originalPrice) * 100);
                    return (
                      <div key={course.id} className={`p-6 rounded-2xl ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'} border hover:shadow-xl transition-all`}>
                        <div className="flex items-center gap-5">
                          <div className={`w-28 h-28 rounded-xl bg-gradient-to-br ${course.gradient} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                            <Icon className="w-14 h-14 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-xl font-black mb-2 truncate">{course.title}</h3>
                            <p className={`text-sm mb-3 ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>By {course.instructor}</p>
                            <div className="flex items-center gap-4 text-sm">
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <span className="font-bold">{course.rating}</span>
                              </div>
                              <span className={darkMode ? 'text-slate-500' : 'text-gray-400'}>{course.duration}</span>
                              <span className={darkMode ? 'text-slate-500' : 'text-gray-400'}>{course.modules} modules</span>
                            </div>
                          </div>
                          <div className="text-right flex flex-col items-end gap-4">
                            <div>
                              <div className="text-3xl font-black mb-1">₹{course.price.toLocaleString()}</div>
                              <div className="flex items-center gap-2">
                                <span className={`text-sm line-through ${darkMode ? 'text-slate-600' : 'text-gray-400'}`}>₹{course.originalPrice.toLocaleString()}</span>
                                <span className="text-xs font-black text-green-500">{discount}% OFF</span>
                              </div>
                            </div>
                            <button onClick={() => removeFromCart(course.id)} className="text-red-500 hover:text-red-600 p-2 hover:bg-red-500/10 rounded-lg transition-all">
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className={`p-8 rounded-2xl ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'} border h-fit sticky top-24 shadow-xl`}>
                  <h3 className="text-2xl font-black mb-6">Order Summary</h3>
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className={darkMode ? 'text-slate-400' : 'text-gray-600'}>Subtotal</span>
                      <span className="font-bold">₹{cart.reduce((sum, item) => sum + item.price, 0).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={darkMode ? 'text-slate-400' : 'text-gray-600'}>You Save</span>
                      <span className="font-bold text-green-500">₹{cart.reduce((sum, item) => sum + (item.originalPrice - item.price), 0).toLocaleString()}</span>
                    </div>
                    <div className={`h-px ${darkMode ? 'bg-slate-800' : 'bg-gray-200'}`}></div>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold">Total</span>
                      <span className="text-4xl font-black bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                        ₹{cart.reduce((sum, item) => sum + item.price, 0).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <button onClick={() => {
                    if (!isAuthenticated) {
                      setShowAuthModal(true);
                    } else {
                      setShowPaymentModal(true);
                    }
                  }} className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white py-5 rounded-2xl font-bold shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 transition-all flex items-center justify-center gap-2">
                    <Shield className="w-5 h-5" />
                    Proceed to Checkout
                  </button>
                  <p className={`text-xs text-center mt-4 ${darkMode ? 'text-slate-500' : 'text-gray-400'} flex items-center justify-center gap-1`}>
                    <Lock className="w-3 h-3" />
                    Secure payment with 256-bit encryption
                  </p>
                </div>
              </div>
            ) : (
              <div className={`rounded-2xl p-20 text-center ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'} border`}>
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-purple-500/30">
                  <ShoppingCart className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-3xl font-black mb-3">Your cart is empty</h2>
                <p className="text-slate-400 text-lg mb-8">Add courses to get started with learning</p>
                <button onClick={() => setCurrentPage('courses')} className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-8 py-4 rounded-2xl font-bold shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 transition-all">
                  Browse Courses
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Course Detail Page */}
      {currentPage === 'courseDetail' && selectedCourse && (
        <div className="pt-24 min-h-screen pb-12">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <button onClick={() => setCurrentPage('courses')} className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors font-semibold">
              <ChevronLeft className="w-5 h-5" />
              Back to Courses
            </button>

            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className={`rounded-2xl overflow-hidden ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'} border shadow-xl`}>
                  <div className={`h-80 bg-gradient-to-br ${selectedCourse.gradient} p-12 flex items-center justify-center relative overflow-hidden`}>
                    {React.createElement(selectedCourse.icon, { className: "w-40 h-40 text-white/90 drop-shadow-2xl" })}
                  </div>
                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-4 flex-wrap">
                      <span className={`px-4 py-2 rounded-xl text-sm font-bold ${darkMode ? 'bg-slate-800 text-slate-300' : 'bg-gray-100 text-gray-700'}`}>
                        {selectedCourse.level}
                      </span>
                      <span className={`px-4 py-2 rounded-xl text-sm font-bold ${darkMode ? 'bg-slate-800 text-slate-300' : 'bg-gray-100 text-gray-700'}`}>
                        {selectedCourse.category}
                      </span>
                      <span className={`px-4 py-2 rounded-xl text-sm font-bold ${darkMode ? 'bg-slate-800 text-slate-300' : 'bg-gray-100 text-gray-700'}`}>
                        {selectedCourse.language}
                      </span>
                      {selectedCourse.bestseller && (
                        <span className="px-4 py-2 rounded-xl text-sm font-bold bg-yellow-400 text-black flex items-center gap-1">
                          <Trophy className="w-4 h-4" />
                          BESTSELLER
                        </span>
                      )}
                    </div>
                    <h1 className="text-4xl font-black mb-4 tracking-tight">{selectedCourse.title}</h1>
                    <p className="text-lg text-slate-400 mb-6">Taught by {selectedCourse.instructor}</p>
                    
                    <div className="flex items-center gap-8 mb-8 flex-wrap">
                      <div className="flex items-center gap-2">
                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        <span className="text-xl font-bold">{selectedCourse.rating}</span>
                        <span className="text-slate-400">({selectedCourse.reviews.toLocaleString()} ratings)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-slate-400" />
                        <span className="font-bold">{selectedCourse.students.toLocaleString()}</span>
                        <span className="text-slate-400">students</span>
                      </div>
                    </div>

                    <div className={`p-6 rounded-xl ${darkMode ? 'bg-slate-800' : 'bg-gray-50'}`}>
                      <h3 className="text-xl font-black mb-4 flex items-center gap-2">
                        <CheckCircle className="w-6 h-6 text-green-500" />
                        What you'll learn
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {[
                          'Master the fundamentals and advanced concepts',
                          'Build 10+ real-world projects from scratch',
                          'Learn industry best practices and standards',
                          'Get hands-on experience with latest tools',
                          'Prepare for job interviews and certifications',
                          'Lifetime access to all course materials'
                        ].map((point, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-sm">{point}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className={`p-8 rounded-2xl ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'} border sticky top-24 shadow-xl`}>
                  <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-3 mb-3">
                      <span className="text-5xl font-black">₹{selectedCourse.price.toLocaleString()}</span>
                      <div className="text-left">
                        <div className={`text-lg line-through ${darkMode ? 'text-slate-600' : 'text-gray-400'}`}>₹{selectedCourse.originalPrice.toLocaleString()}</div>
                        <div className="text-sm font-black text-green-500">{Math.round((1 - selectedCourse.price / selectedCourse.originalPrice) * 100)}% OFF</div>
                      </div>
                    </div>
                    <p className="text-slate-400 text-sm">Limited time offer • Lifetime access</p>
                  </div>

                  {selectedCourse.enrolled ? (
                    <button className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white py-5 rounded-2xl font-bold shadow-2xl mb-4 flex items-center justify-center gap-2">
                      <Play className="w-5 h-5" />
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
                      }} className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white py-5 rounded-2xl font-bold shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 transition-all flex items-center justify-center gap-2">
                        <Zap className="w-5 h-5" />
                        Buy Now
                      </button>
                      <button onClick={() => addToCart(selectedCourse)} className={`w-full py-5 rounded-2xl font-bold border-2 ${darkMode ? 'border-slate-700 hover:bg-slate-800' : 'border-gray-300 hover:bg-gray-50'} transition-all`}>
                        Add to Cart
                      </button>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Total Duration
                      </span>
                      <span className="font-bold">{selectedCourse.duration}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 flex items-center gap-2">
                        <BookOpen className="w-4 h-4" />
                        Modules
                      </span>
                      <span className="font-bold">{selectedCourse.modules}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 flex items-center gap-2">
                        <BarChart3 className="w-4 h-4" />
                        Skill Level
                      </span>
                      <span className="font-bold">{selectedCourse.level}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 flex items-center gap-2">
                        <Award className="w-4 h-4" />
                        Certificate
                      </span>
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 flex items-center gap-2">
                        <Wifi className="w-4 h-4" />
                        Access
                      </span>
                      <span className="font-bold">Lifetime</span>
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
          <div className={`max-w-md w-full rounded-2xl ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'} border p-10 relative shadow-2xl`}>
            <button onClick={() => setShowAuthModal(false)} className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors">
              <X className="w-6 h-6" />
            </button>

            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-purple-500/30">
                <User className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-black mb-2">
                {authMode === 'login' ? 'Welcome Back!' : 'Join EduStream'}
              </h2>
              <p className="text-slate-400">
                {authMode === 'login' ? 'Sign in to continue learning' : 'Create your account to get started'}
              </p>
            </div>

            {/* Social Auth Buttons */}
            <div className="space-y-3 mb-6">
              <button onClick={() => handleSocialAuth('Google')} className={`w-full flex items-center justify-center gap-3 px-5 py-4 rounded-xl font-semibold ${darkMode ? 'bg-slate-800 hover:bg-slate-750 border-slate-700' : 'bg-white hover:bg-gray-50 border-gray-200'} border-2 transition-all group`}>
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span>Continue with Google</span>
              </button>
              
              <button onClick={() => handleSocialAuth('Github')} className={`w-full flex items-center justify-center gap-3 px-5 py-4 rounded-xl font-semibold ${darkMode ? 'bg-slate-800 hover:bg-slate-750 border-slate-700' : 'bg-white hover:bg-gray-50 border-gray-200'} border-2 transition-all`}>
                <Github className="w-5 h-5" />
                <span>Continue with Github</span>
              </button>

              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => handleSocialAuth('Facebook')} className={`flex items-center justify-center gap-2 px-4 py-4 rounded-xl font-semibold ${darkMode ? 'bg-slate-800 hover:bg-slate-750 border-slate-700' : 'bg-white hover:bg-gray-50 border-gray-200'} border-2 transition-all`}>
                  <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span>Facebook</span>
                </button>
                <button onClick={() => handleSocialAuth('Apple')} className={`flex items-center justify-center gap-2 px-4 py-4 rounded-xl font-semibold ${darkMode ? 'bg-slate-800 hover:bg-slate-750 border-slate-700' : 'bg-white hover:bg-gray-50 border-gray-200'} border-2 transition-all`}>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                  </svg>
                  <span>Apple</span>
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className={`flex-1 h-px ${darkMode ? 'bg-slate-800' : 'bg-gray-200'}`}></div>
              <span className="text-sm text-slate-500 font-semibold">OR</span>
              <div className={`flex-1 h-px ${darkMode ? 'bg-slate-800' : 'bg-gray-200'}`}></div>
            </div>

            <form onSubmit={handleAuth} className="space-y-4">
              {authMode === 'signup' && (
                <div>
                  <label className="block text-sm font-bold mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className={`w-full px-4 py-3.5 rounded-xl ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-gray-50 border-gray-200'} border-2 outline-none focus:border-blue-500 transition-colors`}
                    placeholder="Rahul Sharma"
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
                  className={`w-full px-4 py-3.5 rounded-xl ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-gray-50 border-gray-200'} border-2 outline-none focus:border-blue-500 transition-colors`}
                  placeholder="rahul@example.com"
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
                  className={`w-full px-4 py-3.5 rounded-xl ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-gray-50 border-gray-200'} border-2 outline-none focus:border-blue-500 transition-colors`}
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white py-4 rounded-xl font-bold shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 transition-all flex items-center justify-center gap-3"
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

            <div className="mt-6 text-center">
              <button
                onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
                className="text-blue-500 font-bold hover:text-blue-400 transition-colors"
              >
                {authMode === 'login' ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className={`max-w-2xl w-full rounded-2xl ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'} border p-10 relative shadow-2xl my-8`}>
            <button onClick={() => { setShowPaymentModal(false); setPaymentStep(1); }} className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors">
              <X className="w-6 h-6" />
            </button>

            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-purple-500/30">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-black mb-2">Secure Checkout</h2>
              <p className="text-slate-400 flex items-center justify-center gap-2">
                <Lock className="w-4 h-4" />
                256-bit SSL encrypted payment
              </p>
            </div>

            {paymentStep === 1 ? (
              <div>
                <div className="space-y-4 mb-8">
                  {cart.map(course => (
                    <div key={course.id} className={`p-4 rounded-xl ${darkMode ? 'bg-slate-800' : 'bg-gray-50'} flex items-center justify-between`}>
                      <span className="font-bold">{course.title}</span>
                      <span className="text-xl font-black">₹{course.price.toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                <div className={`p-6 rounded-xl ${darkMode ? 'bg-slate-800' : 'bg-gray-50'} mb-8`}>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold">Total Amount</span>
                    <span className="text-4xl font-black bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                      ₹{cart.reduce((sum, item) => sum + item.price, 0).toLocaleString()}
                    </span>
                  </div>
                </div>

                <button onClick={() => setPaymentStep(2)} className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white py-5 rounded-xl font-bold shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 transition-all flex items-center justify-center gap-3">
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div>
                {/* Payment Method Selection */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4">Select Payment Method</h3>
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <button
                      onClick={() => setPaymentMethod('card')}
                      className={`p-4 rounded-xl font-semibold border-2 transition-all ${
                        paymentMethod === 'card'
                          ? 'border-blue-500 bg-blue-500/10'
                          : darkMode ? 'border-slate-700 hover:border-slate-600' : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <CreditCard className="w-6 h-6 mx-auto mb-2" />
                      <div className="text-sm">Card</div>
                    </button>
                    <button
                      onClick={() => setPaymentMethod('upi')}
                      className={`p-4 rounded-xl font-semibold border-2 transition-all ${
                        paymentMethod === 'upi'
                          ? 'border-blue-500 bg-blue-500/10'
                          : darkMode ? 'border-slate-700 hover:border-slate-600' : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <Smartphone className="w-6 h-6 mx-auto mb-2" />
                      <div className="text-sm">UPI</div>
                    </button>
                    <button
                      onClick={() => setPaymentMethod('wallet')}
                      className={`p-4 rounded-xl font-semibold border-2 transition-all ${
                        paymentMethod === 'wallet'
                          ? 'border-blue-500 bg-blue-500/10'
                          : darkMode ? 'border-slate-700 hover:border-slate-600' : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <DollarSign className="w-6 h-6 mx-auto mb-2" />
                      <div className="text-sm">Wallet</div>
                    </button>
                  </div>
                </div>

                <form onSubmit={(e) => { e.preventDefault(); handlePayment(); }}>
                  {paymentMethod === 'card' ? (
                    <div className="space-y-4 mb-8">
                      <div>
                        <label className="block text-sm font-bold mb-2">Cardholder Name</label>
                        <input
                          type="text"
                          value={paymentData.name}
                          onChange={(e) => setPaymentData({...paymentData, name: e.target.value})}
                          className={`w-full px-4 py-3.5 rounded-xl ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-gray-50 border-gray-200'} border-2 outline-none focus:border-blue-500 transition-colors`}
                          placeholder="Rahul Sharma"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold mb-2">Card Number</label>
                        <input
                          type="text"
                          value={paymentData.cardNumber}
                          onChange={(e) => setPaymentData({...paymentData, cardNumber: e.target.value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim()})}
                          className={`w-full px-4 py-3.5 rounded-xl ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-gray-50 border-gray-200'} border-2 outline-none focus:border-blue-500 transition-colors`}
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
                            className={`w-full px-4 py-3.5 rounded-xl ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-gray-50 border-gray-200'} border-2 outline-none focus:border-blue-500 transition-colors`}
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
                            className={`w-full px-4 py-3.5 rounded-xl ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-gray-50 border-gray-200'} border-2 outline-none focus:border-blue-500 transition-colors`}
                            placeholder="123"
                            maxLength={3}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  ) : paymentMethod === 'upi' ? (
                    <div className={`p-8 rounded-xl ${darkMode ? 'bg-slate-800' : 'bg-gray-50'} text-center mb-8`}>
                      <Smartphone className="w-16 h-16 mx-auto mb-4 text-blue-500" />
                      <p className="font-bold text-lg mb-4">Pay with UPI</p>
                      <input
                        type="text"
                        value={paymentData.upiId}
                        onChange={(e) => setPaymentData({...paymentData, upiId: e.target.value})}
                        className={`w-full px-4 py-3.5 rounded-xl ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-200'} border-2 outline-none focus:border-blue-500 transition-colors mb-4`}
                        placeholder="yourname@upi"
                        required
                      />
                    </div> // This was missing a closing tag in your original paste
                  ) : (
                    <div className={`p-8 rounded-xl ${darkMode ? 'bg-slate-800' : 'bg-gray-50'} text-center mb-8`}>
                      <DollarSign className="w-16 h-16 mx-auto mb-4 text-blue-500" />
                      <p className="font-bold text-lg mb-4">Pay with Wallet</p>
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { name: 'Paytm', icon: '💳' },
                          { name: 'PhonePe', icon: '📱' },
                          { name: 'Amazon Pay', icon: '🛒' },
                          { name: 'Mobikwik', icon: '💰' }
                        ].map((wallet) => (
                          <button
                            key={wallet.name}
                            type="button"
                            className={`p-4 rounded-xl border-2 ${darkMode ? 'border-slate-700 hover:border-blue-500 bg-slate-900' : 'border-gray-300 hover:border-blue-500 bg-white'} transition-all`}
                          >
                            <div className="text-3xl mb-2">{wallet.icon}</div>
                            <div className="text-sm font-bold">{wallet.name}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white py-5 rounded-xl font-bold shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 transition-all flex items-center justify-center gap-3"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Processing Payment...</span>
                      </>
                    ) : (
                      <>
                        <Shield className="w-5 h-5" />
                        <span>Pay ₹{cart.reduce((sum, item) => sum + item.price, 0).toLocaleString()}</span>
                      </>
                    )}
                  </button>
                  <p className={`text-xs text-center mt-4 ${darkMode ? 'text-slate-500' : 'text-gray-400'}`}>
                    🔒 Your payment information is encrypted and secure
                  </p>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Notification Toast */}
      {showNotification && (
        <div className="fixed bottom-8 right-8 z-50 animate-slide-in">
          <div className={`rounded-xl p-5 shadow-2xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'} flex items-center gap-4 min-w-[320px]`}>
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-bold">Success!</h4>
              <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>{notificationMessage}</p>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className={`border-t ${darkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-gray-200'} mt-32`}>
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2.5 mb-6">
                <div className="relative w-12 h-12">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl"></div>
                  <div className="absolute inset-0.5 bg-slate-950 rounded-xl flex items-center justify-center">
                    <Layers className="w-6 h-6 text-blue-400" />
                  </div>
                </div>
                <span className="text-2xl font-black">EduStream</span>
              </div>
              <p className={`text-base mb-6 ${darkMode ? 'text-slate-400' : 'text-gray-600'} max-w-md`}>
                India's leading online learning platform. Master new skills, advance your career, and achieve your goals with expert-led courses.
              </p>
              <div className="flex items-center gap-3">
                {[
                  { icon: '📱', name: 'App Store' },
                  { icon: '🤖', name: 'Play Store' }
                ].map((store) => (
                  <button key={store.name} className={`px-4 py-2 rounded-xl border-2 ${darkMode ? 'border-slate-800 hover:border-slate-700' : 'border-gray-200 hover:border-gray-300'} transition-all flex items-center gap-2`}>
                    <span className="text-xl">{store.icon}</span>
                    <span className="text-xs font-bold">{store.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-black text-base mb-5">Company</h4>
              <ul className="space-y-3">
                {['About Us', 'Careers', 'Press', 'Blog', 'Affiliate'].map((item, idx) => (
                  <li key={idx}>
                    <button className={`text-sm ${darkMode ? 'text-slate-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-black text-base mb-5">Support</h4>
              <ul className="space-y-3">
                {['Help Center', 'Contact Us', 'FAQs', 'Terms', 'Privacy'].map((item, idx) => (
                  <li key={idx}>
                    <button className={`text-sm ${darkMode ? 'text-slate-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className={`border-t ${darkMode ? 'border-slate-800' : 'border-gray-200'} pt-8 flex flex-col md:flex-row items-center justify-between gap-4`}>
            <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
              © 2025 EduStream. All rights reserved. Made with ❤️ in Ahmedabad
            </p>
            <div className="flex items-center gap-4">
              {['Twitter', 'Facebook', 'Instagram', 'LinkedIn', 'YouTube'].map((social) => (
                <button key={social} className={`w-9 h-9 rounded-lg ${darkMode ? 'bg-slate-800 hover:bg-slate-700' : 'bg-gray-100 hover:bg-gray-200'} flex items-center justify-center transition-all`}>
                  <span className="text-xs font-bold">{social[0]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default EduStream;
