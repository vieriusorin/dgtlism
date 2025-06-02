import React, { useState } from 'react';
import { InputValidator } from '../../../shared/security/inputValidation';
import { httpClient } from '../../../shared/security/httpClient';
import MorphingButton from '../../ui/components/MorphingButton';

const SecureContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const validateField = (name, value) => {
    try {
      switch (name) {
        case 'name':
          return InputValidator.validateName(value);
        case 'email':
          return InputValidator.validateEmail(value);
        case 'message':
          return InputValidator.validateMessage(value);
        default:
          return value;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Real-time validation
    try {
      const validatedValue = validateField(name, value);
      setFormData(prev => ({ ...prev, [name]: value }));
      setErrors(prev => ({ ...prev, [name]: null }));
    } catch (error) {
      setErrors(prev => ({ ...prev, [name]: error.message }));
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Validate all fields
      const validatedData = {
        name: validateField('name', formData.name),
        email: validateField('email', formData.email),
        message: validateField('message', formData.message)
      };

      // Add timestamp and basic bot protection
      const submissionData = {
        ...validatedData,
        timestamp: Date.now(),
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        userAgent: navigator.userAgent.substring(0, 200) // Limit length
      };

      // Submit via secure HTTP client
      const response = await httpClient.post('/api/contact', submissionData);
      
      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      setSubmitStatus('error');
      console.error('Contact form error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='max-w-lg mx-auto space-y-6'>
      <div>
        <label htmlFor='name' className='block text-sm font-medium text-gray-300 mb-2'>
          Name *
        </label>
        <input
          type='text'
          id='name'
          name='name'
          value={formData.name}
          onChange={handleInputChange}
          className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-colors ${
            errors.name ? 'border-red-500 focus:ring-red-500' : 'border-white/20 focus:ring-primary-400'
          }`}
          placeholder='Your name'
          required
          autoComplete='name'
          maxLength={100}
        />
        {errors.name && <p className='mt-1 text-sm text-red-400'>{errors.name}</p>}
      </div>

      <div>
        <label htmlFor='email' className='block text-sm font-medium text-gray-300 mb-2'>
          Email *
        </label>
        <input
          type='email'
          id='email'
          name='email'
          value={formData.email}
          onChange={handleInputChange}
          className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-colors ${
            errors.email ? 'border-red-500 focus:ring-red-500' : 'border-white/20 focus:ring-primary-400'
          }`}
          placeholder='your@email.com'
          required
          autoComplete='email'
          maxLength={254}
        />
        {errors.email && <p className='mt-1 text-sm text-red-400'>{errors.email}</p>}
      </div>

      <div>
        <label htmlFor='message' className='block text-sm font-medium text-gray-300 mb-2'>
          Message *
        </label>
        <textarea
          id='message'
          name='message'
          value={formData.message}
          onChange={handleInputChange}
          rows={5}
          className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-colors resize-vertical ${
            errors.message ? 'border-red-500 focus:ring-red-500' : 'border-white/20 focus:ring-primary-400'
          }`}
          placeholder='Your message...'
          required
          maxLength={5000}
        />
        {errors.message && <p className='mt-1 text-sm text-red-400'>{errors.message}</p>}
        <p className='mt-1 text-xs text-gray-500'>
          {formData.message.length}/5000 characters
        </p>
      </div>

      {submitStatus === 'success' && (
        <div className='p-4 bg-green-500/10 border border-green-500/20 rounded-lg'>
          <p className='text-green-400'>Message sent successfully! I'll get back to you soon.</p>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className='p-4 bg-red-500/10 border border-red-500/20 rounded-lg'>
          <p className='text-red-400'>Failed to send message. Please try again later.</p>
        </div>
      )}

      <MorphingButton
        type='submit'
        variant='primary'
        disabled={isSubmitting || Object.values(errors).some(error => error)}
        className={isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </MorphingButton>
    </form>
  );
};

export default SecureContactForm; 