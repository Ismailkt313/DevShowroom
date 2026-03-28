import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContainer from './AuthContainer';
import InputField from './InputField';
import Button from './Button';
import ToggleTabs from './ToggleTabs';
import { useAuth } from '../../context/AuthContext';

const AuthForm: React.FC = () => {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [isLoading, setIsLoading] = useState(false);
  
  // Form Fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // Validation Errors
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isFormValid, setIsFormValid] = useState(false);

  // Handle Input Changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
    
    // Clear error for this field as user types
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // Validation Logic
  useEffect(() => {
    const newErrors: Record<string, string> = {};

    // Email validation (common for both)
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (activeTab === 'register') {
      // Name validation
      if (formData.name && !/^[a-zA-Z\s]+$/.test(formData.name)) {
        newErrors.name = 'Only alphabets are allowed in name.';
      }

      // Password validation
      if (formData.password && formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters.';
      }

      // Confirm Password validation
      if (formData.confirmPassword && formData.confirmPassword !== formData.password) {
        newErrors.confirmPassword = 'Passwords do not match.';
      }
    }

    setErrors(newErrors);

    // Check if form is valid for submission
    const requiredFields = activeTab === 'register' 
      ? ['name', 'email', 'password', 'confirmPassword']
      : ['email', 'password'];
    
    const hasAllFields = requiredFields.every(field => !!formData[field as keyof typeof formData]);
    const hasNoErrors = Object.keys(newErrors).length === 0;
    
    setIsFormValid(hasAllFields && hasNoErrors);
  }, [formData, activeTab]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsLoading(true);
    setErrors({});
    
    try {
      if (activeTab === 'login') {
        await login(formData.email, formData.password);
      } else {
        await register(formData.name, formData.email, formData.password);
      }
      navigate('/dashboard');
    } catch (err: any) {
      console.error('Auth Error:', err);
      setErrors({ form: err.response?.data?.message || 'Authentication failed' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContainer 
      title={activeTab === 'login' ? 'Welcome Back' : 'Create Account'} 
      subtitle={activeTab === 'login' ? 'Enter your details to sign in' : 'Join DevShowroom and start your journey'}
    >
      <ToggleTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <form onSubmit={handleSubmit} className="space-y-5">
        {activeTab === 'register' && (
          <InputField
            label="Full Name"
            type="text"
            placeholder="John Doe"
            required
            value={formData.name}
            onChange={(e) => handleChange(e, 'name')}
            error={errors.name}
          />
        )}

        <InputField
          label="Email Address"
          type="email"
          placeholder="your@email.com"
          required
          value={formData.email}
          onChange={(e) => handleChange(e, 'email')}
          error={errors.email}
        />

        <InputField
          label="Password"
          type="password"
          placeholder="••••••••"
          required
          value={formData.password}
          onChange={(e) => handleChange(e, 'password')}
          error={errors.password}
        />

        {activeTab === 'register' && (
          <InputField
            label="Confirm Password"
            type="password"
            placeholder="••••••••"
            required
            value={formData.confirmPassword}
            onChange={(e) => handleChange(e, 'confirmPassword')}
            error={errors.confirmPassword}
          />
        )}

        {activeTab === 'login' && (
          <div className="flex justify-end p-1">
            <button type="button" className="text-sm font-semibold text-blue-500 hover:text-blue-400 transition-colors">
              Forgot password?
            </button>
          </div>
        )}
        {errors.form && (
          <p className="text-sm font-medium text-red-500 text-center animate-in fade-in slide-in-from-top-1 duration-300">
            {errors.form}
          </p>
        )}

        <div className="pt-4">
          <Button 
            type="submit" 
            loading={isLoading} 
            disabled={!isFormValid}
          >
            {activeTab === 'login' ? 'Sign In' : 'Create Account'}
          </Button>
        </div>
      </form>
    </AuthContainer>
  );
};

export default AuthForm;
