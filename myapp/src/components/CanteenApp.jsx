import React, { useState, useEffect } from 'react';
import { Sun, Moon, User, ShoppingBag, LogOut, Plus, Minus } from 'lucide-react';

// Toast Component
function Toast({ message, type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8';

  return (
    <div style={{
      position: 'fixed',
      top: '100px',
      right: '20px',
      backgroundColor: bgColor,
      color: '#fff',
      padding: '1rem 1.5rem',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
      zIndex: 10000,
      minWidth: '250px',
      animation: 'slideIn 0.3s ease'
    }}>
      {message}
    </div>
  );
}

// Sample Data
const SAMPLE_USERS = [
  { email: 'shyam@gmail.com', password: '123', name: 'Shyam', role: 'user' },
  { email: 'admin@gmail.com', password: 'admin123', name: 'Admin', role: 'admin' }
];

const INITIAL_MENU_ITEMS = [
  { id: 1, category: 'Veg', name: 'Paneer Butter Masala', price: 120, image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400', description: 'Rich and creamy paneer curry' },
  { id: 2, category: 'Veg', name: 'Veg Biryani', price: 100, image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400', description: 'Aromatic rice with vegetables' },
  { id: 3, category: 'Veg', name: 'Dal Tadka', price: 80, image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400', description: 'Yellow lentils tempered with spices' },
  { id: 4, category: 'Non-Veg', name: 'Chicken Biryani', price: 150, image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400', description: 'Spicy chicken biryani' },
  { id: 5, category: 'Non-Veg', name: 'Butter Chicken', price: 180, image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400', description: 'Creamy tomato-based chicken curry' },
  { id: 6, category: 'Non-Veg', name: 'Egg Curry', price: 90, image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400', description: 'Boiled eggs in spicy gravy' },
  { id: 7, category: 'Snacks', name: 'Samosa', price: 20, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400', description: 'Crispy fried pastry with filling' },
  { id: 8, category: 'Snacks', name: 'Vada Pav', price: 25, image: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?w=400', description: 'Mumbai street food special' },
  { id: 9, category: 'Snacks', name: 'French Fries', price: 50, image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400', description: 'Crispy golden fries' },
  { id: 10, category: 'Beverages', name: 'Masala Chai', price: 15, image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400', description: 'Indian spiced tea' },
  { id: 11, category: 'Beverages', name: 'Cold Coffee', price: 40, image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400', description: 'Chilled coffee with ice cream' },
  { id: 12, category: 'Beverages', name: 'Mango Lassi', price: 50, image: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=400', description: 'Sweet yogurt drink with mango' },
  { id: 13, category: 'Cakes & Chocolates', name: 'Chocolate Cake', price: 60, image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400', description: 'Rich chocolate sponge cake' },
  { id: 14, category: 'Cakes & Chocolates', name: 'KitKat', price: 30, image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=400', description: 'Crispy wafer chocolate bar' },
  { id: 15, category: 'Cakes & Chocolates', name: 'Brownie', price: 50, image: 'https://images.unsplash.com/photo-1607920591413-4ec007e70023?w=400', description: 'Fudgy chocolate brownie' },
  { id: 16, category: 'Fresh Juice', name: 'Orange Juice', price: 40, image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400', description: 'Freshly squeezed orange juice' },
  { id: 17, category: 'Fresh Juice', name: 'Watermelon Juice', price: 35, image: 'https://images.unsplash.com/photo-1597306691227-59c87f9c7f68?w=400', description: 'Refreshing watermelon juice' },
  { id: 18, category: 'Fresh Juice', name: 'Mixed Fruit Juice', price: 50, image: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=400', description: 'Blend of seasonal fruits' },
];

const CATEGORIES = [
  { name: 'Veg', description: 'Pure vegetarian delights made with fresh ingredients' },
  { name: 'Non-Veg', description: 'Delicious chicken and egg dishes' },
  { name: 'Snacks', description: 'Quick bites and finger foods' },
  { name: 'Beverages', description: 'Hot and cold drinks to refresh you' },
  { name: 'Cakes & Chocolates', description: 'Sweet treats to satisfy your cravings' },
  { name: 'Fresh Juice', description: 'Natural fruit juices without preservatives' }
];

export default function CanteenApp() {
  const [currentPage, setCurrentPage] = useState('home');
  const [darkMode, setDarkMode] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState(SAMPLE_USERS);
  const [menuItems, setMenuItems] = useState(INITIAL_MENU_ITEMS);
  const [orders, setOrders] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterPrice, setFilterPrice] = useState('All');
  const [toast, setToast] = useState(null);

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? '#1a1a1a' : '#f8f9fa';
    document.body.style.color = darkMode ? '#ffffff' : '#000000';
  }, [darkMode]);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  const handleLogin = (email, password) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      showToast(`Welcome ${user.name}!`, 'success');
      setTimeout(() => {
        setCurrentPage('home');
      }, 100);
      return true;
    }
    showToast('Invalid credentials!', 'error');
    return false;
  };

  const handleRegister = (name, email, password) => {
    if (users.find(u => u.email === email)) {
      showToast('Email already exists!', 'error');
      return false;
    }
    const newUser = { email, password, name, role: 'user' };
    setUsers([...users, newUser]);
    showToast('Registration successful! Please login.', 'success');
    return true;
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('home');
    showToast('Logged out successfully!', 'info');
  };

  const handleAddToOrders = (item, quantity) => {
    const orderNumber = Math.floor(100000 + Math.random() * 900000);
    const newOrder = {
      id: Date.now(),
      orderNumber,
      item,
      quantity,
      total: item.price * quantity,
      userEmail: currentUser.email,
      userName: currentUser.name,
      date: new Date().toLocaleString()
    };
    setOrders([...orders, newOrder]);
    showToast(`Order placed! Order #${orderNumber}`, 'success');
    setCurrentPage('orders');
  };

  const handleAddMenuItem = (newItem) => {
    const item = {
      ...newItem,
      id: menuItems.length + 1
    };
    setMenuItems([...menuItems, item]);
    showToast('Menu item added successfully!', 'success');
    setCurrentPage('menu');
  };

  const userOrders = orders.filter(o => o.userEmail === currentUser?.email);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: darkMode ? '#1a1a1a' : '#f8f9fa' }}>
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
      
      <Navbar 
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        currentUser={currentUser}
        setCurrentPage={setCurrentPage}
        handleLogout={handleLogout}
        orderCount={userOrders.length}
      />
      
      <div style={{ paddingTop: '80px' }}>
        {currentPage === 'home' && (
          <HomePage setCurrentPage={setCurrentPage} darkMode={darkMode} />
        )}
        {currentPage === 'login' && (
          <LoginPage 
            handleLogin={handleLogin}
            handleRegister={handleRegister}
            darkMode={darkMode}
          />
        )}
        {currentPage === 'menu' && (
          <MenuPage
            menuItems={menuItems}
            darkMode={darkMode}
            setSelectedItem={setSelectedItem}
            setCurrentPage={setCurrentPage}
            currentUser={currentUser}
            filterCategory={filterCategory}
            setFilterCategory={setFilterCategory}
            filterPrice={filterPrice}
            setFilterPrice={setFilterPrice}
            showToast={showToast}
          />
        )}
        {currentPage === 'payment' && selectedItem && (
          <PaymentPage
            item={selectedItem}
            darkMode={darkMode}
            handleAddToOrders={handleAddToOrders}
          />
        )}
        {currentPage === 'orders' && currentUser?.role === 'user' && (
          <UserOrdersPage orders={userOrders} darkMode={darkMode} />
        )}
        {currentPage === 'admin-orders' && currentUser?.role === 'admin' && (
          <AdminOrdersPage orders={orders} darkMode={darkMode} />
        )}
        {currentPage === 'add-menu' && currentUser?.role === 'admin' && (
          <AddMenuPage handleAddMenuItem={handleAddMenuItem} darkMode={darkMode} />
        )}
      </div>
      
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}

function Navbar({ darkMode, setDarkMode, currentUser, setCurrentPage, handleLogout, orderCount }) {
  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      backgroundColor: darkMode ? '#2d2d2d' : '#ffffff',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      padding: '1rem 2rem',
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div style={{ cursor: 'pointer' }} onClick={() => setCurrentPage('home')}>
        <h2 style={{ margin: 0, color: darkMode ? '#fff' : '#333' }}>🍽️ CampusEats</h2>
      </div>
      
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        {!currentUser ? (
          <button
            onClick={() => setCurrentPage('login')}
            style={{
              padding: '0.5rem 1.5rem',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            Login
          </button>
        ) : currentUser.role === 'user' ? (
          <>
            <button
              onClick={() => setCurrentPage('menu')}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: 'transparent',
                color: darkMode ? '#fff' : '#333',
                border: 'none',
                cursor: 'pointer',
                fontWeight: '500'
              }}
            >
              Menu
            </button>
            <button
              onClick={() => setCurrentPage('orders')}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: 'transparent',
                color: darkMode ? '#fff' : '#333',
                border: 'none',
                cursor: 'pointer',
                fontWeight: '500',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <ShoppingBag size={20} />
              Your Orders
              {orderCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-5px',
                  right: '-5px',
                  backgroundColor: '#dc3545',
                  color: '#fff',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px'
                }}>
                  {orderCount}
                </span>
              )}
            </button>
            <div style={{
              padding: '0.5rem 1rem',
              backgroundColor: darkMode ? '#3d3d3d' : '#e9ecef',
              borderRadius: '5px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <User size={20} />
              <div>
                <div style={{ fontWeight: '500', fontSize: '14px' }}>{currentUser.name}</div>
                <div style={{ fontSize: '12px', opacity: 0.7 }}>{currentUser.email}</div>
              </div>
            </div>
            <button onClick={handleLogout} style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#dc3545',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}>
              <LogOut size={20} />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setCurrentPage('menu')}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: 'transparent',
                color: darkMode ? '#fff' : '#333',
                border: 'none',
                cursor: 'pointer',
                fontWeight: '500'
              }}
            >
              Menu
            </button>
            <button
              onClick={() => setCurrentPage('admin-orders')}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: 'transparent',
                color: darkMode ? '#fff' : '#333',
                border: 'none',
                cursor: 'pointer',
                fontWeight: '500'
              }}
            >
              Orders
            </button>
            <button
              onClick={() => setCurrentPage('add-menu')}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: 'transparent',
                color: darkMode ? '#fff' : '#333',
                border: 'none',
                cursor: 'pointer',
                fontWeight: '500'
              }}
            >
              Add to Menu
            </button>
            <button onClick={handleLogout} style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#dc3545',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}>
              Logout
            </button>
          </>
        )}
        
        <button
          onClick={() => setDarkMode(!darkMode)}
          style={{
            padding: '0.5rem',
            backgroundColor: 'transparent',
            color: darkMode ? '#fff' : '#333',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          {darkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>
      </div>
    </nav>
  );
}

function HomePage({ setCurrentPage, darkMode }) {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '3rem' }}>
        Welcome to College Canteen 🍕
      </h1>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem'
      }}>
        {CATEGORIES.map((cat, idx) => (
          <div
            key={idx}
            onMouseEnter={() => setHoveredCard(idx)}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => setCurrentPage('menu')}
            style={{
              backgroundColor: darkMode ? '#2d2d2d' : '#ffffff',
              borderRadius: '15px',
              padding: '2rem',
              cursor: 'pointer',
              boxShadow: hoveredCard === idx 
                ? '0 10px 30px rgba(0,0,0,0.3)' 
                : '0 5px 15px rgba(0,0,0,0.1)',
              transform: hoveredCard === idx ? 'translateY(-10px)' : 'translateY(0)',
              transition: 'all 0.3s ease',
              minHeight: '200px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center'
            }}
          >
            <h2 style={{ marginBottom: '1rem', fontSize: '1.8rem' }}>{cat.name}</h2>
            <p style={{
              opacity: hoveredCard === idx ? 1 : 0,
              transition: 'opacity 0.3s ease',
              color: darkMode ? '#aaa' : '#666'
            }}>
              {cat.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function LoginPage({ handleLogin, handleRegister, darkMode }) {
  const [isLogin, setIsLogin] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isLogin) {
      const success = handleLogin(formData.email, formData.password);
      if (success) {
        setFormData({ name: '', email: '', password: '' });
      }
    } else {
      if (handleRegister(formData.name, formData.email, formData.password)) {
        setIsLogin(true);
        setFormData({ name: '', email: '', password: '' });
      }
    }
  };

  const handleButtonClick = () => {
    if (isLogin) {
      handleLogin(formData.email, formData.password);
    } else {
      if (handleRegister(formData.name, formData.email, formData.password)) {
        setIsLogin(true);
        setFormData({ name: '', email: '', password: '' });
      }
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: 'calc(100vh - 80px)',
      padding: '2rem'
    }}>
      <div style={{
        backgroundColor: darkMode ? '#2d2d2d' : '#ffffff',
        padding: '3rem',
        borderRadius: '15px',
        boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '450px'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>
          {isLogin ? 'Login' : 'Register'}
        </h2>
        
        <div style={{
          display: 'flex',
          gap: '1rem',
          marginBottom: '2rem',
          justifyContent: 'center'
        }}>
          <button
            type="button"
            onClick={() => setIsAdmin(false)}
            style={{
              padding: '0.5rem 1.5rem',
              backgroundColor: !isAdmin ? '#007bff' : 'transparent',
              color: !isAdmin ? '#fff' : darkMode ? '#fff' : '#333',
              border: '2px solid #007bff',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            User
          </button>
          <button
            type="button"
            onClick={() => setIsAdmin(true)}
            style={{
              padding: '0.5rem 1.5rem',
              backgroundColor: isAdmin ? '#dc3545' : 'transparent',
              color: isAdmin ? '#fff' : darkMode ? '#fff' : '#333',
              border: '2px solid #dc3545',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            Admin
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '5px',
                  border: `1px solid ${darkMode ? '#555' : '#ddd'}`,
                  backgroundColor: darkMode ? '#3d3d3d' : '#fff',
                  color: darkMode ? '#fff' : '#333'
                }}
              />
            </div>
          )}
          
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '5px',
                border: `1px solid ${darkMode ? '#555' : '#ddd'}`,
                backgroundColor: darkMode ? '#3d3d3d' : '#fff',
                color: darkMode ? '#fff' : '#333'
              }}
            />
          </div>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '5px',
                border: `1px solid ${darkMode ? '#555' : '#ddd'}`,
                backgroundColor: darkMode ? '#3d3d3d' : '#fff',
                color: darkMode ? '#fff' : '#333'
              }}
            />
          </div>

          <button
            type="button"
            onClick={handleButtonClick}
            style={{
              width: '100%',
              padding: '0.75rem',
              backgroundColor: isAdmin ? '#dc3545' : '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: '500',
              fontSize: '1rem',
              transition: 'opacity 0.2s'
            }}
            onMouseDown={(e) => e.currentTarget.style.opacity = '0.8'}
            onMouseUp={(e) => e.currentTarget.style.opacity = '1'}
          >
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <span
            onClick={() => {
              setIsLogin(!isLogin);
              setFormData({ name: '', email: '', password: '' });
            }}
            style={{ color: '#007bff', cursor: 'pointer', fontWeight: '500' }}
          >
            {isLogin ? 'Register' : 'Login'}
          </span>
        </p>
      </div>
    </div>
  );
}

function MenuPage({ menuItems, darkMode, setSelectedItem, setCurrentPage, currentUser, filterCategory, setFilterCategory, filterPrice, setFilterPrice, showToast }) {
  const handleFoodClick = (item) => {
    if (!currentUser) {
      showToast('Please login first!', 'error');
      return;
    }
    setSelectedItem(item);
    setCurrentPage('payment');
  };

  const filteredItems = menuItems.filter(item => {
    const categoryMatch = filterCategory === 'All' || item.category === filterCategory;
    const priceMatch = filterPrice === 'All' || 
      (filterPrice === 'Under 50' && item.price < 50) ||
      (filterPrice === '50-100' && item.price >= 50 && item.price <= 100) ||
      (filterPrice === 'Above 100' && item.price > 100);
    return categoryMatch && priceMatch;
  });

  const groupedItems = CATEGORIES.reduce((acc, cat) => {
    acc[cat.name] = filteredItems.filter(item => item.category === cat.name);
    return acc;
  }, {});

  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 80px)', position: 'relative' }}>
      <div style={{
        width: '250px',
        backgroundColor: darkMode ? '#2d2d2d' : '#ffffff',
        padding: '2rem',
        boxShadow: '2px 0 10px rgba(0,0,0,0.1)',
        position: 'fixed',
        left: 0,
        top: '80px',
        height: 'calc(100vh - 80px)',
        overflowY: 'auto',
        zIndex: 100
      }}>
        <h3 style={{ marginBottom: '1.5rem' }}>Filters</h3>
        
        <div style={{ marginBottom: '2rem' }}>
          <h4 style={{ marginBottom: '1rem' }}>Category</h4>
          {['All', ...CATEGORIES.map(c => c.name)].map(cat => (
            <div key={cat} style={{ marginBottom: '0.5rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="category"
                  checked={filterCategory === cat}
                  onChange={() => setFilterCategory(cat)}
                  style={{ marginRight: '0.5rem' }}
                />
                {cat}
              </label>
            </div>
          ))}
        </div>

        <div>
          <h4 style={{ marginBottom: '1rem' }}>Price Range</h4>
          {['All', 'Under 50', '50-100', 'Above 100'].map(price => (
            <div key={price} style={{ marginBottom: '0.5rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="price"
                  checked={filterPrice === price}
                  onChange={() => setFilterPrice(price)}
                  style={{ marginRight: '0.5rem' }}
                />
                {price}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, padding: '2rem', marginLeft: '250px' }}>
        <h2 style={{ marginBottom: '2rem' }}>Our Menu</h2>
        
        {Object.entries(groupedItems).map(([category, items]) => (
          items.length > 0 && (
            <div key={category} style={{ marginBottom: '3rem' }}>
              <h3 style={{ marginBottom: '1.5rem', color: '#007bff' }}>{category}</h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '1.5rem'
              }}>
                {items.map(item => (
                  <FoodCard key={item.id} item={item} darkMode={darkMode} onClick={() => handleFoodClick(item)} />
                ))}
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
}

function FoodCard({ item, darkMode, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: darkMode ? '#2d2d2d' : '#ffffff',
        borderRadius: '10px',
        overflow: 'hidden',
        cursor: 'pointer',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        transition: 'transform 0.3s ease',
      }}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
    >
      <img
        src={item.image}
        alt={item.name}
        style={{
          width: '100%',
          height: '200px',
          objectFit: 'cover'
        }}
      />
      <div style={{ padding: '1rem' }}>
        <h4 style={{ marginBottom: '0.5rem' }}>{item.name}</h4>
        <p style={{
          color: darkMode ? '#aaa' : '#666',
          fontSize: '0.9rem',
          marginBottom: '0.75rem'
        }}>
          {item.description}
        </p>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span style={{
            fontSize: '1.25rem',
            fontWeight: 'bold',
            color: '#28a745'
          }}>
            ₹{item.price}
          </span>
          <span style={{
            padding: '0.25rem 0.75rem',
            backgroundColor: '#007bff',
            color: '#fff',
            borderRadius: '5px',
            fontSize: '0.85rem'
          }}>
            Order Now
          </span>
        </div>
      </div>
    </div>
  );
}

function PaymentPage({ item, darkMode, handleAddToOrders }) {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (delta) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= 20) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: 'calc(100vh - 80px)',
      padding: '2rem'
    }}>
      <div style={{
        backgroundColor: darkMode ? '#2d2d2d' : '#ffffff',
        borderRadius: '15px',
        boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
        maxWidth: '900px',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '2rem',
        padding: '2rem'
      }}>
        <div>
          <img
            src={item.image}
            alt={item.name}
            style={{
              width: '100%',
              height: '300px',
              objectFit: 'cover',
              borderRadius: '10px'
            }}
          />
          <h2 style={{ marginTop: '1rem' }}>{item.name}</h2>
          <p style={{ color: darkMode ? '#aaa' : '#666', marginTop: '0.5rem' }}>
            {item.description}
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ fontSize: '0.9rem', color: darkMode ? '#aaa' : '#666', marginBottom: '0.5rem' }}>
              Price per item
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#28a745' }}>
              ₹{item.price}
            </div>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <div style={{ fontSize: '0.9rem', color: darkMode ? '#aaa' : '#666', marginBottom: '0.5rem' }}>
              Quantity
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <button
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
                style={{
                  padding: '0.5rem',
                  border: 'none',
                  backgroundColor: quantity <= 1 ? (darkMode ? '#444' : '#e0e0e0') : '#007bff',
                  color: quantity <= 1 ? (darkMode ? '#666' : '#999') : '#fff',
                  cursor: quantity <= 1 ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '5px',
                  transition: 'all 0.2s'
                }}
              >
                <Minus size={24} />
              </button>
              <span style={{ fontSize: '2rem', fontWeight: 'bold', minWidth: '60px', textAlign: 'center' }}>
                {quantity}
              </span>
              <button
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= 20}
                style={{
                  padding: '0.5rem',
                  border: 'none',
                  backgroundColor: quantity >= 20 ? (darkMode ? '#444' : '#e0e0e0') : '#007bff',
                  color: quantity >= 20 ? (darkMode ? '#666' : '#999') : '#fff',
                  cursor: quantity >= 20 ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '5px',
                  transition: 'all 0.2s'
                }}
              >
                <Plus size={24} />
              </button>
            </div>
          </div>

          <div style={{
            padding: '1.5rem',
            backgroundColor: darkMode ? '#3d3d3d' : '#f8f9fa',
            borderRadius: '10px',
            marginBottom: '2rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span>Subtotal:</span>
              <span>₹{item.price * quantity}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.25rem' }}>
              <span>Total:</span>
              <span style={{ color: '#28a745' }}>₹{item.price * quantity}</span>
            </div>
          </div>

          <button
            onClick={() => handleAddToOrders(item, quantity)}
            style={{
              padding: '1rem',
              backgroundColor: '#28a745',
              color: '#fff',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              fontSize: '1.1rem',
              fontWeight: 'bold'
            }}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}

function UserOrdersPage({ orders, darkMode }) {
  if (orders.length === 0) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 'calc(100vh - 80px)',
        flexDirection: 'column'
      }}>
        <ShoppingBag size={64} style={{ opacity: 0.3, marginBottom: '1rem' }} />
        <h2>No orders yet</h2>
        <p style={{ color: darkMode ? '#aaa' : '#666' }}>Start ordering from the menu!</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '2rem' }}>Your Orders</h2>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
        gap: '1.5rem'
      }}>
        {orders.map(order => (
          <div
            key={order.id}
            style={{
              backgroundColor: darkMode ? '#2d2d2d' : '#ffffff',
              borderRadius: '10px',
              padding: '1.5rem',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
            }}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1rem',
              paddingBottom: '1rem',
              borderBottom: `1px solid ${darkMode ? '#444' : '#eee'}`
            }}>
              <span style={{ fontWeight: 'bold', color: '#007bff' }}>
                Order #{order.orderNumber}
              </span>
              <span style={{ fontSize: '0.85rem', color: darkMode ? '#aaa' : '#666' }}>
                {order.date}
              </span>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <img
                src={order.item.image}
                alt={order.item.name}
                style={{
                  width: '100px',
                  height: '100px',
                  objectFit: 'cover',
                  borderRadius: '8px'
                }}
              />
              <div style={{ flex: 1 }}>
                <h4 style={{ marginBottom: '0.5rem' }}>{order.item.name}</h4>
                <p style={{ color: darkMode ? '#aaa' : '#666', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                  Quantity: {order.quantity}
                </p>
                <p style={{ fontWeight: 'bold', color: '#28a745', fontSize: '1.1rem' }}>
                  Total: ₹{order.total}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminOrdersPage({ orders, darkMode }) {
  if (orders.length === 0) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 'calc(100vh - 80px)',
        flexDirection: 'column'
      }}>
        <ShoppingBag size={64} style={{ opacity: 0.3, marginBottom: '1rem' }} />
        <h2>No orders yet</h2>
        <p style={{ color: darkMode ? '#aaa' : '#666' }}>Waiting for customer orders...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '2rem' }}>All Orders</h2>
      
      <div style={{ overflowX: 'auto' }}>
        <table style={{
          width: '100%',
          backgroundColor: darkMode ? '#2d2d2d' : '#ffffff',
          borderRadius: '10px',
          overflow: 'hidden',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <thead>
            <tr style={{ backgroundColor: darkMode ? '#3d3d3d' : '#f8f9fa' }}>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Order #</th>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Customer</th>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Item</th>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Quantity</th>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Total</th>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr
                key={order.id}
                style={{
                  borderTop: `1px solid ${darkMode ? '#444' : '#eee'}`
                }}
              >
                <td style={{ padding: '1rem', fontWeight: 'bold', color: '#007bff' }}>
                  {order.orderNumber}
                </td>
                <td style={{ padding: '1rem' }}>{order.userName}</td>
                <td style={{ padding: '1rem' }}>{order.item.name}</td>
                <td style={{ padding: '1rem' }}>{order.quantity}</td>
                <td style={{ padding: '1rem', fontWeight: 'bold', color: '#28a745' }}>
                  ₹{order.total}
                </td>
                <td style={{ padding: '1rem', fontSize: '0.9rem', color: darkMode ? '#aaa' : '#666' }}>
                  {order.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AddMenuPage({ handleAddMenuItem, darkMode }) {
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    description: '',
    price: '',
    category: 'Veg'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddMenuItem({
      ...formData,
      price: parseFloat(formData.price)
    });
    setFormData({ name: '', image: '', description: '', price: '', category: 'Veg' });
  };

  const handleButtonClick = () => {
    if (formData.name && formData.image && formData.description && formData.price) {
      handleAddMenuItem({
        ...formData,
        price: parseFloat(formData.price)
      });
      setFormData({ name: '', image: '', description: '', price: '', category: 'Veg' });
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: 'calc(100vh - 80px)',
      padding: '2rem'
    }}>
      <div style={{
        backgroundColor: darkMode ? '#2d2d2d' : '#ffffff',
        padding: '3rem',
        borderRadius: '15px',
        boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '600px'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Add New Menu Item</h2>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Item Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '5px',
                border: `1px solid ${darkMode ? '#555' : '#ddd'}`,
                backgroundColor: darkMode ? '#3d3d3d' : '#fff',
                color: darkMode ? '#fff' : '#333'
              }}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '5px',
                border: `1px solid ${darkMode ? '#555' : '#ddd'}`,
                backgroundColor: darkMode ? '#3d3d3d' : '#fff',
                color: darkMode ? '#fff' : '#333'
              }}
            >
              {CATEGORIES.map(cat => (
                <option key={cat.name} value={cat.name}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Image URL</label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              required
              placeholder="https://example.com/image.jpg"
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '5px',
                border: `1px solid ${darkMode ? '#555' : '#ddd'}`,
                backgroundColor: darkMode ? '#3d3d3d' : '#fff',
                color: darkMode ? '#fff' : '#333'
              }}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              rows="3"
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '5px',
                border: `1px solid ${darkMode ? '#555' : '#ddd'}`,
                backgroundColor: darkMode ? '#3d3d3d' : '#fff',
                color: darkMode ? '#fff' : '#333',
                resize: 'vertical'
              }}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Price (₹)</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              required
              min="1"
              step="1"
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '5px',
                border: `1px solid ${darkMode ? '#555' : '#ddd'}`,
                backgroundColor: darkMode ? '#3d3d3d' : '#fff',
                color: darkMode ? '#fff' : '#333'
              }}
            />
          </div>

          <button
            type="button"
            onClick={handleButtonClick}
            style={{
              width: '100%',
              padding: '0.75rem',
              backgroundColor: '#28a745',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: '500',
              fontSize: '1rem',
              transition: 'opacity 0.2s'
            }}
            onMouseDown={(e) => e.currentTarget.style.opacity = '0.8'}
            onMouseUp={(e) => e.currentTarget.style.opacity = '1'}
          >
            Add to Menu
          </button>
        </form>
      </div>
    </div>
  );
}
