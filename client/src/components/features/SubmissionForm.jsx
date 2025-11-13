import { useState } from "react";
import Modal from '../ui/Modal';
import FormInput from '../ui/FormInput';
import Button  from '../ui/Button';
import { Upload, Code, } from 'lucide-react';


export default function SubmissionForm({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    code: '',
    language: '',
    tags: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const languageOptions = [
    { value: 'javascript', label: 'JavaScript'},
    { value: 'typescript', label: 'TypeScript'},
    { value: 'python', label: 'Python'},
    { value: 'java', label: 'Java'},
    { value: 'go', label: 'Go'},
    { value: 'rust', label: 'Rust'},
    { value: 'c', label: 'C'},
    { value: 'cpp', label: 'C++'},
    { value: 'csharp', label: 'C#'},
    { value: 'html', label: 'HTML'},
    { value: 'css', label: 'CSS'}
  ];

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  // Checks if all required fields are filled
  // Returns true if valid, false if errors exist
  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.code.trim()) {
      newErrors.code = 'Code is required';
    }

    if (!formData.language.trim()) {
      newErrors.language = 'Please select a language';
    }

    setErrors(newErrors);

    // Return true if no errors
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;  // stop if validation fails
    }

    setIsSubmitting(true);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newReview = {
        id: Date.now().toString(),
        title: formData.title,
        author: 'You',  // In real app, would get from auth
        status: 'draft',
        language: formData.language,
        createdAt: new Date(),
        commentCount: 0,
        description: formData.description,
        code: formData.code,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      };

      onSubmit(newReview);

      // Reset form
      setFormData({
        title: '',
        description: '',
        code: '',
        language: '',
        tags: '',
      })

      // Close modal
      onClose();
      console.log('Review submitted successfully');
      
    } catch (error) {
      setErrors({ submit: 'Failed to submit review. Please try again.' });
      console.log('Error submitting review', error);
    } finally {
      // Always reset loading state
      setIsSubmitting(false);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      const content = event.target.result;
      handleChange('code', content);
    };

    reader.readAsText(file);
  };

  // Reasets form and closes modal
  const handleCancel = () => {
    setFormData({
      title: '',
      description: '',
      language: '',
      code: '',
      tags: '',
    });
    setErrors({});
    onClose();
  };

  return (
    <Modal 
      isOpen={isOpen}
      onClose={handleCancel}
      title="Submit Code for Review"
      size="lg"
    >
      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title Input */}
        <FormInput 
          label="Title"
          value={formData.title}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="e.g, Refactor authentication middleware"
          error={errors.title}
          required
        />

        {/* Description Input */}
        <FormInput 
          type="textarea"
          label="Description"
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Describe what this code does and what you'd like reviewed..."
          rows={3}
          error={errors.description}
          required
        />

        {/* Language Selector */}
        <FormInput 
          type="select"
          label="Programming language"
          value={formData.language}
          onChange={(e) => handleChange('language', e.target.value)}
          options={languageOptions}
          error={errors.language}
          required
        />

        {/* Code Input With File Upload Option */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Code <span className="text-red-500">*</span>
            </label>

            {/* File Upload Button */}
            <label className="cursor-pointer text-sm text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1">
              <Upload size={16} />
              Upload File 
              <FormInput 
                type="file"
                onChange={handleFileUpload}
                accept=".js,.jsx,.ts,.tsx,.py,.java,.go,.rs,.c,.cpp,.cs,.txt,.html,.css"
                className="hidden"
              />
            </label>
          </div>

          <textarea 
            value={formData.code}
            onChange={(e) => handleChange('code', e.target.value)}
            placeholder="Paste your code here or upload a file..."
            rows={12}
            className={`
              w-full px-3 py-2 rounded-lg font-mono text-sm bg-gray-50 dark:bg-[#121212] border border-gray-300
              dark:border-[#2a2a2a] text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500
              focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
              ${errors.code ? 'border-red-500 focus:ring-red-500' : ''} 
            `}
          />
          {errors.code && (
            <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">
              {errors.code}
            </p>
          )}
        </div>

        {/* Tags Input */}
        <FormInput 
          label="Tags (Optional)"
          value={formData.tags}
          onChange={(e) => handleChange('tags', e.target.value)}
          placeholder="e.g, bug-fix, performance, security (comma-separated)"
        />

        {/* Submit Error */}
        {errors.submit && (
          <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-sm text-red-600 dark:text-red-400">
              {errors.submit}
            </p>
          </div>
        )}

        {/* Form Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-[#2a2a2a]">
          <Button 
            type="button"
            variant="ghost"
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            loading={isSubmitting}
            icon={Code}
          >
            { isSubmitting ? 'Submitting...' : 'Submit Review' }
          </Button>
        </div>
      </form>
    </Modal>
  );
}