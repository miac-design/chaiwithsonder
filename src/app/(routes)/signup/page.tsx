import { useState } from "react";
// If you have react-icons installed, you can use these imports:
// import { FcGoogle } from "react-icons/fc";
// import { SiMicrosoft } from "react-icons/si";

export const dynamic = "force-dynamic";

export default function SignUp() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Placeholder auth handlers
  const handleGoogleSignUp = () => {
    alert("Google sign up coming soon!");
  };
  const handleMicrosoftSignUp = () => {
    alert("Outlook/Microsoft sign up coming soon!");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Sign up logic goes here.");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 px-4">
      <div className="max-w-md w-full mx-auto mt-10 p-8 bg-white rounded-2xl shadow-lg space-y-6 animate-fadeInUp">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Sign Up</h1>
        <p className="text-center text-gray-500 mb-6">Create your account to start your mentorship journey</p>
        {/* Social Sign Up Buttons */}
        <div className="space-y-4">
          <button
            type="button"
            onClick={handleGoogleSignUp}
            className="bg-white border border-gray-300 rounded-full px-6 py-3 flex items-center justify-center gap-2 w-full hover:shadow-md transition"
          >
            {/* Google Icon */}
            <svg className="w-6 h-6" viewBox="0 0 48 48"><g><path fill="#4285F4" d="M44.5 20H24v8.5h11.7C34.9 33.1 30.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c2.6 0 5 .8 7 2.3l6.4-6.4C33.5 5.1 28.9 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 20-7.6 20-21 0-1.3-.1-2.7-.3-4z"/><path fill="#34A853" d="M6.3 14.7l7 5.1C15.5 16.2 19.4 13 24 13c2.6 0 5 .8 7 2.3l6.4-6.4C33.5 5.1 28.9 3 24 3 15.6 3 8.3 8.6 6.3 14.7z"/><path fill="#FBBC05" d="M24 45c6.1 0 11.2-2 14.9-5.4l-6.9-5.7C29.7 35.6 27 36.5 24 36.5c-6.1 0-11.3-4.1-13.2-9.6l-7 5.4C8.3 39.4 15.6 45 24 45z"/><path fill="#EA4335" d="M44.5 20H24v8.5h11.7c-1.2 3.2-4.7 7.5-11.7 7.5-6.1 0-11.3-4.1-13.2-9.6l-7 5.4C8.3 39.4 15.6 45 24 45c10.5 0 20-7.6 20-21 0-1.3-.1-2.7-.3-4z"/></g></svg>
            <span className="font-medium">Sign up with Google</span>
          </button>
          <button
            type="button"
            onClick={handleMicrosoftSignUp}
            className="bg-white border border-gray-300 rounded-full px-6 py-3 flex items-center justify-center gap-2 w-full hover:shadow-md transition"
          >
            {/* Microsoft Icon */}
            <svg className="w-6 h-6" viewBox="0 0 24 24"><g><rect fill="#F25022" x="1" y="1" width="10" height="10"/><rect fill="#7FBA00" x="13" y="1" width="10" height="10"/><rect fill="#00A4EF" x="1" y="13" width="10" height="10"/><rect fill="#FFB900" x="13" y="13" width="10" height="10"/></g></svg>
            <span className="font-medium">Sign up with Outlook</span>
          </button>
        </div>
        {/* Divider */}
        <div className="relative text-center text-gray-400 my-4">
          <span className="relative z-10 bg-white px-3">or</span>
          <div className="absolute left-0 top-1/2 w-full h-px bg-gray-200 -z-1"></div>
        </div>
        {/* Manual Sign Up Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              id="name"
              required
              value={form.name}
              onChange={handleChange}
              className="rounded-lg border border-gray-300 px-4 py-3 w-full focus:ring-2 focus:ring-indigo-500"
              placeholder="Your full name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              required
              value={form.email}
              onChange={handleChange}
              className="rounded-lg border border-gray-300 px-4 py-3 w-full focus:ring-2 focus:ring-indigo-500"
              placeholder="you@email.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              required
              value={form.password}
              onChange={handleChange}
              className="rounded-lg border border-gray-300 px-4 py-3 w-full focus:ring-2 focus:ring-indigo-500"
              placeholder="Password"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <input
              type={showConfirm ? "text" : "password"}
              name="confirmPassword"
              id="confirmPassword"
              required
              value={form.confirmPassword}
              onChange={handleChange}
              className="rounded-lg border border-gray-300 px-4 py-3 w-full focus:ring-2 focus:ring-indigo-500"
              placeholder="Confirm password"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-indigo-600 text-white w-full py-3 rounded-full font-semibold hover:bg-indigo-700 transition mt-2"
          >
            {isSubmitting ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
        {/* Footer */}
        <div className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{' '}
          <a href="/login" className="underline text-indigo-600">Login</a>
        </div>
      </div>
    </div>
  );
} 