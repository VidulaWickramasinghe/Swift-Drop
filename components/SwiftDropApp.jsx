"use client";

import React, { useState } from "react";
import {
  Search,
  Home,
  FileText,
  Gift,
  User,
  Star,
  Plus,
  Minus,
  ChevronLeft,
  MapPin,
  CreditCard,
  Phone,
  MessageSquare,
  Send,
  ChevronRight,
  CheckCircle2,
  CircleDashed,
  Headset,
  MoreVertical,
  ShieldCheck,
  Mail,
  Lock,
  Smartphone,
  ArrowRight
} from "lucide-react";

const TEAL = "#24B3A8";
const ORANGE = "#FFA54F";

const globalStyles = `
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }

  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

export default function SwiftDropApp() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [history, setHistory] = useState(["home"]);

  const navigateTo = (screen) => {
    setHistory((prev) => [...prev, screen]);
    setActiveTab(screen);
  };

  const goBack = () => {
    if (history.length > 1) {
      const newHistory = history.slice(0, -1);
      setHistory(newHistory);
      setActiveTab(newHistory[newHistory.length - 1]);
    } else {
      setHistory(["home"]);
      setActiveTab("home");
    }
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveTab("home");
    setHistory(["home"]);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4 font-sans">
      <style>{globalStyles}</style>

      <div className="relative flex h-[844px] w-full max-w-[390px] flex-col overflow-hidden rounded-[40px] border-[8px] border-gray-900 bg-white shadow-2xl">
        {!isAuthenticated ? (
          <LoginScreen onLogin={handleLogin} />
        ) : (
          <>
            <div className="relative flex-1 overflow-y-auto bg-white no-scrollbar">
              {activeTab === "home" && <HomeScreen onNavigate={navigateTo} />}
              {activeTab === "store" && (
                <StoreScreen onNavigate={navigateTo} onBack={goBack} />
              )}
              {activeTab === "cart" && (
                <CartScreen onNavigate={navigateTo} onBack={goBack} />
              )}
              {activeTab === "tracking" && (
                <TrackingScreen onNavigate={navigateTo} onBack={goBack} />
              )}
              {activeTab === "rewards" && (
                <RewardsScreen onNavigate={navigateTo} />
              )}
              {activeTab === "chat" && <ChatScreen onBack={goBack} />}
              {activeTab === "profile" && (
                <ProfileScreen onBack={goBack} onLogout={handleLogout} />
              )}
            </div>

            {activeTab !== "chat" && activeTab !== "cart" && (
              <BottomNav
                activeTab={activeTab}
                setActiveTab={(tab) => {
                  setHistory([tab]);
                  setActiveTab(tab);
                }}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

function LoginScreen({ onLogin }) {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="relative flex h-full flex-col overflow-y-auto bg-white pb-10 no-scrollbar">
      <div className="absolute top-0 left-0 right-0 -z-10 h-64 overflow-hidden rounded-b-[60px] bg-teal-50">
        <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-teal-100/50"></div>
        <div className="absolute bottom-0 left-10 h-20 w-20 rounded-full bg-teal-100/50"></div>
      </div>

      <div className="flex flex-1 flex-col px-6 pt-24 pb-8">
        <div className="mb-10 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 rotate-3 items-center justify-center rounded-3xl border border-gray-50 bg-white text-4xl shadow-lg">
            🛵
          </div>
          <h1 className="mb-2 text-4xl font-black tracking-tight text-gray-900">
            Swift<span style={{ color: TEAL }}>Drop</span>
          </h1>
          <p className="font-medium text-gray-500">
            {isSignUp
              ? "Create an account to get started."
              : "Welcome back! Ready for a delivery?"}
          </p>
        </div>

        <div className="mb-8 space-y-4">
          {isSignUp && (
            <div className="flex items-center rounded-2xl border border-gray-200 bg-white p-1 shadow-sm transition-all focus-within:border-[#24B3A8] focus-within:ring-2 focus-within:ring-teal-50">
              <div className="p-3 text-gray-400">
                <User size={20} />
              </div>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full bg-transparent py-3 pr-4 font-medium text-gray-900 outline-none placeholder:text-gray-400"
              />
            </div>
          )}

          <div className="flex items-center rounded-2xl border border-gray-200 bg-white p-1 shadow-sm transition-all focus-within:border-[#24B3A8] focus-within:ring-2 focus-within:ring-teal-50">
            <div className="p-3 text-gray-400">
              <Mail size={20} />
            </div>
            <input
              type="email"
              placeholder="Email or Phone Number"
              className="w-full bg-transparent py-3 pr-4 font-medium text-gray-900 outline-none placeholder:text-gray-400"
            />
          </div>

          <div className="flex items-center rounded-2xl border border-gray-200 bg-white p-1 shadow-sm transition-all focus-within:border-[#24B3A8] focus-within:ring-2 focus-within:ring-teal-50">
            <div className="p-3 text-gray-400">
              <Lock size={20} />
            </div>
            <input
              type="password"
              placeholder="Password"
              className="w-full bg-transparent py-3 pr-4 font-medium text-gray-900 outline-none placeholder:text-gray-400"
            />
          </div>

          {!isSignUp && (
            <div className="flex justify-end">
              <button
                type="button"
                className="text-sm font-bold text-gray-500 transition-colors hover:text-[#24B3A8]"
              >
                Forgot Password?
              </button>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={onLogin}
          className="mb-8 flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-lg font-bold text-white shadow-lg shadow-orange-500/30 transition-transform active:scale-[0.98]"
          style={{ backgroundColor: ORANGE }}
        >
          {isSignUp ? "Sign Up" : "Sign In"} <ArrowRight size={20} />
        </button>

        <div className="mb-8 flex items-center gap-4">
          <div className="h-px flex-1 bg-gray-200"></div>
          <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
            Or continue with
          </span>
          <div className="h-px flex-1 bg-gray-200"></div>
        </div>

        <div className="mb-auto grid grid-cols-2 gap-4">
          <button
            type="button"
            className="flex items-center justify-center gap-2 rounded-2xl border border-gray-200 px-4 py-3 font-bold text-gray-700 shadow-sm transition-colors active:bg-gray-50"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Google
          </button>

          <button
            type="button"
            className="flex items-center justify-center gap-2 rounded-2xl border border-gray-200 px-4 py-3 font-bold text-gray-700 shadow-sm transition-colors active:bg-gray-50"
          >
            <Smartphone size={20} className="text-gray-900" />
            Apple
          </button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm font-medium text-gray-500">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}
            <button
              type="button"
              onClick={() => setIsSignUp((prev) => !prev)}
              className="ml-1 font-bold text-[#24B3A8] hover:underline"
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

function HomeScreen({ onNavigate }) {
  const categories = [
    { icon: "🍔", label: "Food", color: "bg-teal-50" },
    { icon: "🛒", label: "Groceries", color: "bg-orange-50" },
    { icon: "🎁", label: "Gifts", color: "bg-purple-50" }
  ];

  const items = [
    {
      name: "Smash Burger",
      place: "Burger Joint",
      price: "$12.50",
      img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=300&q=80"
    },
    {
      name: "Spicy Ramen",
      place: "Tokyo Eats",
      price: "$16.00",
      img: "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=300&q=80"
    }
  ];

  return (
    <div className="p-5 pb-24">
      <div className="mb-6 flex items-center justify-between pt-4">
        <h1
          className="text-3xl font-black tracking-tight"
          style={{ color: TEAL }}
        >
          SwiftDrop
        </h1>

        <button
          type="button"
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gray-100 transition-transform active:scale-95"
          onClick={() => onNavigate("profile")}
        >
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80"
            alt="Profile"
            className="h-full w-full rounded-full object-cover"
          />
        </button>
      </div>

      <div className="mb-8 flex cursor-text items-center rounded-2xl bg-gray-100 p-4 shadow-sm">
        <Search className="mr-3 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search for food, groceries, gifts..."
          className="w-full bg-transparent font-medium text-gray-700 outline-none placeholder:text-gray-400"
        />
      </div>

      <div className="mb-8 flex justify-between gap-4">
        {categories.map((cat) => (
          <button
            key={cat.label}
            type="button"
            onClick={() => onNavigate("store")}
            className={`${cat.color} flex-1 rounded-3xl border border-white py-5 shadow-sm transition-transform active:scale-95`}
          >
            <div className="flex flex-col items-center justify-center">
              <span className="mb-2 text-3xl drop-shadow-sm">{cat.icon}</span>
              <span className="text-sm font-semibold text-gray-800">
                {cat.label}
              </span>
            </div>
          </button>
        ))}
      </div>

      <button
        type="button"
        className="relative mb-8 flex w-full cursor-pointer items-center justify-between overflow-hidden rounded-3xl p-6 text-left text-white shadow-md transition-transform active:scale-[0.98]"
        style={{ backgroundColor: ORANGE }}
        onClick={() => onNavigate("store")}
      >
        <div className="absolute top-0 right-0 -mt-10 -mr-10 h-32 w-32 rounded-full bg-white opacity-10"></div>
        <div className="relative z-10">
          <h3 className="mb-1 text-2xl font-extrabold">20% Off Sushi</h3>
          <p className="text-sm font-medium opacity-90">
            Use code
            <span className="ml-1 rounded-md bg-white/20 px-2 py-1 font-bold">
              SUSHI20
            </span>
          </p>
        </div>
        <span
          className="relative z-10 animate-bounce text-5xl drop-shadow-lg"
          style={{ animationDuration: "3s" }}
        >
          🍣
        </span>
      </button>

      <div>
        <div className="mb-4 flex items-end justify-between">
          <h2 className="text-xl font-bold text-gray-900">
            Most Ordered Today
          </h2>
          <span
            className="cursor-pointer text-sm font-semibold"
            style={{ color: TEAL }}
          >
            See All
          </span>
        </div>

        <div className="-mx-5 flex gap-4 overflow-x-auto px-5 pb-4 no-scrollbar">
          {items.map((item) => (
            <button
              key={item.name}
              type="button"
              className="min-w-[160px] overflow-hidden rounded-2xl border border-gray-100 bg-white text-left shadow-sm transition-transform active:scale-95"
              onClick={() => onNavigate("store")}
            >
              <div className="relative h-32 w-full bg-gray-200">
                <img
                  src={item.img}
                  alt={item.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute top-2 right-2 rounded-full bg-white/90 p-1.5 backdrop-blur-sm">
                  <Star size={14} className="fill-yellow-500 text-yellow-500" />
                </div>
              </div>

              <div className="p-3">
                <h4 className="truncate font-bold text-gray-900">{item.name}</h4>
                <p className="mb-2 truncate text-xs text-gray-500">
                  {item.place}
                </p>
                <div className="font-semibold" style={{ color: TEAL }}>
                  {item.price}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function StoreScreen({ onNavigate, onBack }) {
  const menuItems = [
    {
      name: "Classic Cheeseburger",
      desc: "Beef patty, cheddar, lettuce, tomato, house sauce.",
      price: "$14.50",
      img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Double Smash",
      desc: "Two smashed patties, double cheese, caramelized onions.",
      price: "$18.00",
      img: "https://images.unsplash.com/photo-1594212202875-86ac12b694a1?auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Loaded Fries",
      desc: "Crispy fries topped with cheese sauce and bacon bits.",
      price: "$8.50",
      img: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=150&q=80"
    }
  ];

  return (
    <div className="min-h-full bg-gray-50 pb-32">
      <div className="relative h-56 bg-gray-300">
        <img
          src="https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80"
          alt="Store Cover"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

        <button
          type="button"
          onClick={onBack}
          className="absolute top-6 left-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-transform active:scale-90"
        >
          <ChevronLeft size={24} />
        </button>
      </div>

      <div className="relative z-10 -mt-8 rounded-t-[32px] bg-white px-5 pt-6 pb-4 shadow-sm">
        <div className="mb-2 flex items-start justify-between">
          <h1 className="text-2xl font-bold text-gray-900">
            The Burger Joint
          </h1>
          <div className="flex items-center rounded-lg bg-gray-100 px-2 py-1">
            <Star size={14} className="mr-1 fill-yellow-500 text-yellow-500" />
            <span className="text-sm font-bold">4.8</span>
          </div>
        </div>

        <p className="mb-4 text-sm font-medium text-gray-500">
          American • Burgers • Fast Food
        </p>

        <div className="inline-flex items-center rounded-lg border border-gray-100 bg-gray-50 px-3 py-1.5 text-sm font-medium text-gray-600">
          <MapPin size={16} className="mr-2" style={{ color: ORANGE }} />
          15-25 min delivery
        </div>
      </div>

      <div className="sticky top-0 z-20 border-b border-gray-100 bg-white px-5 py-3">
        <div className="flex space-x-6 overflow-x-auto no-scrollbar">
          {["Meals", "Snacks", "Drinks"].map((tab, index) => (
            <button
              key={tab}
              type="button"
              className={`border-b-2 px-1 pb-2 text-lg font-bold whitespace-nowrap ${
                index === 0
                  ? "border-[#24B3A8] text-[#24B3A8]"
                  : "border-transparent text-gray-400"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4 px-5 py-4">
        {menuItems.map((item) => (
          <div
            key={item.name}
            className="flex gap-4 rounded-3xl border border-gray-100 bg-white p-4 shadow-sm"
          >
            <div className="flex-1">
              <h3 className="mb-1 font-bold text-gray-900">{item.name}</h3>
              <p className="mb-3 pr-2 text-xs leading-snug text-gray-500">
                {item.desc}
              </p>
              <span className="font-bold" style={{ color: TEAL }}>
                {item.price}
              </span>
            </div>

            <div className="relative h-24 w-24 flex-shrink-0 rounded-2xl">
              <img
                src={item.img}
                alt={item.name}
                className="h-full w-full rounded-2xl object-cover"
              />
              <button
                type="button"
                className="absolute -right-2 -bottom-2 flex h-8 w-8 items-center justify-center rounded-full text-white shadow-lg transition-transform active:scale-90"
                style={{ backgroundColor: ORANGE }}
              >
                <Plus size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="fixed right-0 bottom-[88px] left-0 z-30 mx-auto max-w-[390px] px-5">
        <button
          type="button"
          onClick={() => onNavigate("cart")}
          className="flex w-full items-center justify-between rounded-2xl p-4 shadow-xl transition-transform active:scale-[0.98]"
          style={{ backgroundColor: TEAL }}
        >
          <div className="flex flex-col text-left text-white">
            <span className="text-sm font-medium text-teal-100">2 items</span>
            <span className="text-lg font-bold">$25.60</span>
          </div>

          <div className="flex items-center rounded-xl bg-white px-4 py-2 font-bold text-[#24B3A8] shadow-sm">
            View Cart <ChevronRight size={18} className="ml-1" />
          </div>
        </button>
      </div>
    </div>
  );
}

function CartScreen({ onNavigate, onBack }) {
  const cartItems = [
    { name: "Classic Cheeseburger", price: 14.5, qty: 1 },
    { name: "Loaded Fries", price: 8.5, qty: 1 }
  ];

  return (
    <div className="relative flex h-full flex-col bg-gray-50 pb-6">
      <div className="sticky top-0 z-10 flex items-center justify-between bg-white px-5 pt-8 pb-4 shadow-sm">
        <button
          type="button"
          onClick={onBack}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-800 transition-transform active:scale-90"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-gray-900">Your Cart</h1>
        <div className="w-10"></div>
      </div>

      <div className="flex-1 space-y-6 overflow-y-auto px-5 py-6">
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
            >
              <div className="flex-1">
                <h3 className="font-bold text-gray-900">{item.name}</h3>
                <span className="text-sm font-medium text-gray-500">
                  ${item.price.toFixed(2)}
                </span>
              </div>

              <div className="flex items-center rounded-xl bg-gray-100 p-1">
                <button
                  type="button"
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-gray-600 shadow-sm transition-transform active:scale-95"
                >
                  <Minus size={16} />
                </button>
                <span className="w-8 text-center font-bold text-gray-900">
                  {item.qty}
                </span>
                <button
                  type="button"
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-white shadow-sm transition-transform active:scale-95"
                  style={{ backgroundColor: TEAL }}
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Promo code"
            className="flex-1 rounded-2xl border border-gray-200 bg-white px-4 py-3 font-medium outline-none placeholder:text-gray-400 focus:border-[#24B3A8] shadow-sm"
          />
          <button
            type="button"
            className="rounded-2xl px-6 font-bold text-white shadow-sm transition-opacity active:opacity-80"
            style={{ backgroundColor: TEAL }}
          >
            Apply
          </button>
        </div>

        <div>
          <h3 className="mb-3 font-bold text-gray-900">Delivery Address</h3>
          <div className="relative flex items-start overflow-hidden rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
            <div
              className="absolute top-0 bottom-0 left-0 w-1.5"
              style={{ backgroundColor: ORANGE }}
            ></div>
            <div className="mr-3 rounded-xl bg-orange-50 p-2">
              <MapPin style={{ color: ORANGE }} size={20} />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-bold text-gray-900">Home</h4>
              <p className="mt-0.5 text-xs text-gray-500">
                123 Main St, Endeavour Hills, VIC
              </p>
            </div>
            <button
              type="button"
              className="text-xs font-bold uppercase tracking-wide"
              style={{ color: TEAL }}
            >
              Edit
            </button>
          </div>
        </div>

        <div>
          <h3 className="mb-3 font-bold text-gray-900">Payment Method</h3>
          <button
            type="button"
            className="flex w-full cursor-pointer items-center rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-colors active:bg-gray-50"
          >
            <div className="mr-3 rounded-xl bg-teal-50 p-2">
              <CreditCard style={{ color: TEAL }} size={20} />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-bold text-gray-900">
                Visa ending in 4242
              </h4>
            </div>
            <MoreVertical size={18} className="text-gray-400" />
          </button>
        </div>

        <div className="space-y-3 rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex justify-between text-sm font-medium text-gray-500">
            <span>Subtotal</span>
            <span>$23.00</span>
          </div>
          <div className="flex justify-between text-sm font-medium text-gray-500">
            <span>Delivery Fee</span>
            <span>$2.60</span>
          </div>
          <div className="flex justify-between text-sm font-bold text-[#24B3A8]">
            <span>Discount</span>
            <span>-$0.00</span>
          </div>
          <div className="flex justify-between border-t border-gray-100 pt-3 text-lg font-black text-gray-900">
            <span>Total</span>
            <span>$25.60</span>
          </div>
        </div>
      </div>

      <div className="mt-auto px-5 pb-4">
        <button
          type="button"
          onClick={() => onNavigate("tracking")}
          className="flex w-full items-center justify-center rounded-2xl py-4 text-lg font-bold text-white shadow-lg shadow-orange-500/30 transition-transform active:scale-[0.98]"
          style={{ backgroundColor: ORANGE }}
        >
          Place Order
        </button>
      </div>
    </div>
  );
}

function TrackingScreen({ onNavigate, onBack }) {
  return (
    <div className="flex h-full flex-col bg-white pb-24">
      <div className="flex items-center justify-between px-5 pt-8 pb-4">
        <button
          type="button"
          onClick={onBack}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-800 transition-transform active:scale-90"
        >
          <ChevronLeft size={24} />
        </button>

        <h1 className="text-xl font-bold text-gray-900">Order #49201</h1>

        <button
          type="button"
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-teal-50 text-teal-600 transition-transform active:scale-90"
          onClick={() => onNavigate("chat")}
        >
          <Headset size={20} />
        </button>
      </div>

      <div className="mb-6 px-5">
        <div className="relative h-48 w-full overflow-hidden rounded-3xl border-2 border-gray-50 bg-gray-100">
          <img
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=400&q=80"
            alt="Map"
            className="h-full w-full object-cover opacity-60 grayscale"
          />
          <div className="absolute top-1/2 left-1/4 h-1 w-1/2 rounded-full bg-teal-500"></div>
          <div className="absolute top-1/2 left-1/4 -mt-1.5 h-4 w-4 rounded-full border-4 border-white bg-gray-900 shadow-md"></div>
          <div className="absolute top-1/2 right-1/4 -mt-4.5 -mr-5 flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#24B3A8] bg-white shadow-lg">
            <span className="text-xl">🛵</span>
          </div>
        </div>
      </div>

      <div className="mb-8 px-5 text-center">
        <h2 className="mb-1 text-4xl font-black text-gray-900">18 min</h2>
        <p className="font-medium text-gray-500">
          Estimated arrival: 7:45 PM
        </p>
      </div>

      <div className="flex-1 px-8">
        <div className="relative ml-4 space-y-8 border-l-2 border-gray-100 pb-4">
          <div className="relative pl-8">
            <div className="absolute top-0 -left-[11px] bg-white">
              <CheckCircle2 size={24} className="fill-[#24B3A8] text-white" />
            </div>
            <h4 className="text-sm font-bold text-gray-900">Order Confirmed</h4>
            <p className="mt-1 text-xs text-gray-400">7:15 PM</p>
          </div>

          <div className="relative pl-8">
            <div className="absolute top-0 -left-[11px] bg-white">
              <CheckCircle2 size={24} className="fill-[#24B3A8] text-white" />
            </div>
            <h4 className="text-sm font-bold text-gray-900">Preparing</h4>
            <p className="mt-1 text-xs text-gray-400">7:20 PM</p>
          </div>

          <div className="relative pl-8">
            <div className="absolute top-0 -left-[11px] bg-white">
              <div className="flex h-6 w-6 items-center justify-center rounded-full border-4 border-[#FFA54F] bg-white">
                <div className="h-2 w-2 animate-pulse rounded-full bg-[#FFA54F]"></div>
              </div>
            </div>
            <h4 className="text-sm font-bold" style={{ color: ORANGE }}>
              On the Way
            </h4>
            <p className="mt-1 text-xs font-medium text-gray-500">
              Your driver is nearby
            </p>
          </div>

          <div className="relative pl-8">
            <div className="absolute top-0 -left-[11px] bg-white">
              <CircleDashed size={24} className="text-gray-300" />
            </div>
            <h4 className="text-sm font-bold text-gray-400">Delivered</h4>
          </div>
        </div>
      </div>

      <div className="mt-auto px-5">
        <div className="flex items-center rounded-3xl border border-gray-100 bg-gray-50 p-4 shadow-sm">
          <img
            src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=100&q=80"
            alt="Driver"
            className="mr-4 h-12 w-12 rounded-full object-cover shadow-sm"
          />

          <div className="flex-1">
            <h4 className="font-bold text-gray-900">Michael S.</h4>
            <div className="mt-0.5 flex items-center text-xs font-medium text-gray-500">
              <Star size={12} className="mr-1 fill-yellow-500 text-yellow-500" />
              4.9 (1k+ trips)
            </div>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-100 bg-white text-[#24B3A8] shadow-sm transition-transform active:scale-95"
            >
              <MessageSquare size={18} />
            </button>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-100 bg-white text-[#24B3A8] shadow-sm transition-transform active:scale-95"
            >
              <Phone size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function RewardsScreen() {
  const badges = [
    { icon: "🥇", name: "Swift Shopper", desc: "10+ orders" },
    { icon: "🌙", name: "Midnight Snacker", desc: "Late orders" },
    {
      icon: "🚀",
      name: "Fast Fingers",
      desc: "Quick checkout",
      locked: true
    }
  ];

  const rewards = [
    {
      title: "Free Delivery",
      cost: 500,
      icon: "🛵",
      color: "bg-teal-50"
    },
    {
      title: "$5 Off Order",
      cost: 1000,
      icon: "💵",
      color: "bg-green-50"
    },
    {
      title: "Free Birthday Cake",
      cost: 2000,
      icon: "🎂",
      color: "bg-orange-50",
      locked: true
    }
  ];

  return (
    <div className="h-full bg-white pb-24">
      <div
        className="relative overflow-hidden rounded-b-[40px] px-5 pt-10 pb-6 shadow-sm"
        style={{ backgroundColor: TEAL }}
      >
        <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white opacity-10"></div>
        <div className="absolute bottom-0 left-10 h-20 w-20 rounded-full bg-white opacity-10"></div>

        <div className="relative z-10 text-center">
          <h1 className="mb-2 font-bold text-white/80">Your SwiftPoints</h1>
          <div className="mb-6 flex items-end justify-center gap-1 text-white">
            <span className="text-5xl font-black tracking-tight">1,200</span>
            <span className="mb-1 text-lg font-bold">pts</span>
          </div>

          <div className="rounded-3xl border border-white/30 bg-white/20 p-4 text-left backdrop-blur-sm shadow-lg">
            <div className="mb-2 flex justify-between text-sm font-bold text-white">
              <span>Next Reward</span>
              <span>1500 pts</span>
            </div>

            <div className="mb-2 h-3 w-full overflow-hidden rounded-full border border-white/10 bg-black/20">
              <div
                className="relative h-full rounded-full transition-all duration-1000 ease-out"
                style={{ width: "80%", backgroundColor: ORANGE }}
              >
                <div className="absolute inset-0 w-full animate-pulse bg-white/20"></div>
              </div>
            </div>

            <p className="mt-2 text-center text-xs font-medium text-white/90">
              Only 300 points away from Free Delivery!
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-8 px-5 pt-6">
        <div>
          <h3 className="mb-4 text-lg font-bold text-gray-900">Your Badges</h3>
          <div className="-mx-5 flex gap-4 overflow-x-auto px-5 pb-2 no-scrollbar">
            {badges.map((badge) => (
              <div
                key={badge.name}
                className={`flex min-w-[120px] flex-col items-center justify-center rounded-3xl border p-4 text-center ${
                  badge.locked
                    ? "border-gray-100 bg-gray-50 opacity-60"
                    : "border-[#24B3A8]/20 bg-white shadow-sm"
                }`}
              >
                <span className={`mb-2 text-3xl ${badge.locked ? "grayscale" : ""}`}>
                  {badge.icon}
                </span>
                <h4 className="text-sm leading-tight font-bold text-gray-900">
                  {badge.name}
                </h4>
                {badge.locked && (
                  <span className="mt-1 text-[10px] font-bold uppercase text-gray-400">
                    Locked
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-bold text-gray-900">
            Redeem Rewards
          </h3>
          <div className="space-y-4">
            {rewards.map((reward) => (
              <div
                key={reward.title}
                className="flex items-center gap-4 rounded-3xl border border-gray-100 bg-white p-4 shadow-sm"
              >
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl text-2xl ${reward.color}`}
                >
                  {reward.icon}
                </div>

                <div className="flex-1">
                  <h4 className="font-bold text-gray-900">{reward.title}</h4>
                  <p className="text-sm font-semibold text-gray-500">
                    {reward.cost} pts
                  </p>
                </div>

                <button
                  type="button"
                  className={`rounded-xl px-4 py-2 text-sm font-bold transition-all ${
                    reward.locked
                      ? "cursor-not-allowed bg-gray-100 text-gray-400"
                      : "text-white shadow-md shadow-orange-500/20 active:scale-95"
                  }`}
                  style={reward.locked ? undefined : { backgroundColor: ORANGE }}
                >
                  {reward.locked ? "Locked" : "Redeem"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ChatScreen({ onBack }) {
  return (
    <div className="relative flex h-full flex-col bg-gray-50 pb-6">
      <div className="relative z-10 flex items-center bg-white px-5 pt-8 pb-4 shadow-sm">
        <button
          type="button"
          onClick={onBack}
          className="absolute left-5 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-800 transition-transform active:scale-90"
        >
          <ChevronLeft size={24} />
        </button>

        <div className="flex-1 text-center">
          <h1 className="text-lg font-bold text-gray-900">Support</h1>
          <p className="mt-0.5 flex items-center justify-center text-xs font-semibold text-[#24B3A8]">
            <span className="mr-1.5 h-2 w-2 animate-pulse rounded-full bg-[#24B3A8]"></span>
            Online
          </p>
        </div>

        <button
          type="button"
          className="absolute right-5 flex h-10 w-10 items-center justify-center rounded-full bg-orange-50 text-[#FFA54F] transition-transform active:scale-90"
        >
          <ShieldCheck size={20} />
        </button>
      </div>

      <div className="flex flex-1 flex-col space-y-6 overflow-y-auto px-5 py-6">
        <div className="flex justify-center">
          <span className="rounded-full bg-gray-200/60 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-500">
            Today
          </span>
        </div>

        <div className="flex max-w-[85%] items-end gap-2">
          <div
            className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-teal-100 text-sm shadow-sm"
            style={{ backgroundColor: TEAL }}
          >
            🤖
          </div>
          <div className="rounded-2xl rounded-bl-sm border border-gray-100 bg-white p-4 text-sm leading-relaxed font-medium text-gray-800 shadow-sm">
            Hi! I'm Swiftie. 👋
            <br />
            How can I help you with your SwiftDrop experience today?
          </div>
        </div>

        <div className="max-w-[85%] self-end">
          <div className="flex items-end gap-2 flex-row-reverse">
            <div className="h-8 w-8 flex-shrink-0 overflow-hidden rounded-full border border-gray-200 bg-gray-100 shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80"
                alt="You"
                className="h-full w-full object-cover"
              />
            </div>
            <div
              className="rounded-2xl rounded-br-sm p-4 text-sm leading-relaxed font-medium text-white shadow-sm"
              style={{ backgroundColor: TEAL }}
            >
              Where is my order? It's taking a while.
            </div>
          </div>
        </div>

        <div className="flex max-w-[85%] items-end gap-2">
          <div
            className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-teal-100 text-sm shadow-sm"
            style={{ backgroundColor: TEAL }}
          >
            🤖
          </div>
          <div className="rounded-2xl rounded-bl-sm border border-gray-100 bg-white p-4 text-sm leading-relaxed font-medium text-gray-800 shadow-sm">
            I've checked order #49201. Your driver Michael is on the way and
            should arrive in about <strong>18 minutes</strong>. 🛵
          </div>
        </div>
      </div>

      <div className="mt-auto px-4">
        <div className="mb-3 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {["Track Order", "Cancel Order", "Talk to Agent"].map((reply) => (
            <button
              key={reply}
              type="button"
              className="whitespace-nowrap rounded-full border border-[#24B3A8] bg-white px-4 py-2 text-xs font-bold text-[#24B3A8] shadow-sm transition-colors active:bg-teal-50"
            >
              {reply}
            </button>
          ))}
        </div>

        <div className="flex items-center rounded-3xl border border-gray-100 bg-white p-2 shadow-md">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 bg-transparent px-4 py-2 text-sm font-medium text-gray-700 outline-none placeholder:text-gray-400"
          />
          <button
            type="button"
            className="mr-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-white shadow-sm transition-transform active:scale-95"
            style={{ backgroundColor: TEAL }}
          >
            <Send size={18} className="-ml-0.5 mt-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

function ProfileScreen({ onBack, onLogout }) {
  const actions = [
    {
      icon: MapPin,
      label: "Delivery Addresses",
      color: "text-blue-500",
      bg: "bg-blue-50"
    },
    {
      icon: CreditCard,
      label: "Payment Methods",
      color: "text-green-500",
      bg: "bg-green-50"
    },
    {
      icon: ShieldCheck,
      label: "Security & Privacy",
      color: "text-purple-500",
      bg: "bg-purple-50"
    },
    {
      icon: Headset,
      label: "Help & Support",
      color: "text-orange-500",
      bg: "bg-orange-50"
    }
  ];

  return (
    <div className="flex h-full flex-col bg-gray-50 pb-24">
      <div className="relative z-10 flex items-center justify-between bg-white px-5 pt-8 pb-4 shadow-sm">
        <button
          type="button"
          onClick={onBack}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-800 transition-transform active:scale-90"
        >
          <ChevronLeft size={24} />
        </button>

        <h1 className="text-xl font-bold text-gray-900">Profile</h1>
        <div className="w-10"></div>
      </div>

      <div className="flex-1 overflow-y-auto p-5">
        <div className="mb-6 flex flex-col items-center rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-4 h-24 w-24 overflow-hidden rounded-full border-4 border-teal-50 shadow-md">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80"
              alt="Profile"
              className="h-full w-full object-cover"
            />
          </div>

          <h2 className="text-xl font-bold text-gray-900">Alex Johnson</h2>
          <p className="mb-4 text-sm font-medium text-gray-500">
            alex.johnson@example.com
          </p>

          <button
            type="button"
            className="rounded-full bg-gray-100 px-6 py-2 text-sm font-bold text-gray-800 transition-colors active:bg-gray-200"
          >
            Edit Profile
          </button>
        </div>

        <div className="space-y-3">
          {actions.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.label}
                type="button"
                className="flex w-full items-center rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-colors active:bg-gray-50"
              >
                <div className={`mr-4 rounded-xl p-2 ${item.bg} ${item.color}`}>
                  <Icon size={20} />
                </div>
                <span className="flex-1 text-left font-bold text-gray-800">
                  {item.label}
                </span>
                <ChevronRight size={20} className="text-gray-400" />
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={onLogout}
          className="mt-8 flex w-full items-center justify-center rounded-2xl border border-red-100 bg-red-50 p-4 font-bold text-red-500 shadow-sm transition-colors active:bg-red-100"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

function BottomNav({ activeTab, setActiveTab }) {
  const navItems = [
    { id: "home", icon: Home, label: "Home" },
    { id: "search", icon: Search, label: "Search" },
    { id: "tracking", icon: FileText, label: "Orders" },
    { id: "rewards", icon: Gift, label: "Rewards" },
    { id: "profile", icon: User, label: "Profile" }
  ];

  return (
    <div className="absolute right-0 bottom-0 left-0 z-50 flex items-center justify-between rounded-b-[32px] border-t border-gray-100 bg-white px-6 py-4">
      {navItems.map((item) => {
        const isActive =
          activeTab === item.id || (activeTab === "store" && item.id === "search");

        const Icon = item.icon;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveTab(item.id === "search" ? "store" : item.id)}
            className="flex w-12 flex-col items-center justify-center gap-1 transition-transform active:scale-90"
          >
            <div
              className={`rounded-xl p-1.5 transition-colors duration-300 ${
                isActive ? "bg-teal-50 text-[#24B3A8]" : "text-gray-400"
              }`}
            >
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
            </div>
            <span
              className={`text-[10px] font-bold transition-colors duration-300 ${
                isActive ? "text-[#24B3A8]" : "text-gray-400"
              }`}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}