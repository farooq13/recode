export default function FormInput({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  required = false,
  disabled = false,
  options = [],
  rows = 4,
  className = '',
  ...props
}) {

  // Common styles for all input types
  const baseStyles = `
    w-full px-3 py-2 rounded-lg bg-white dark:border-[#2a2a2a] text-gray-900 
    dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 
    focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent 
    disabled:opacity-50 disabled:cursor-not-allowed transition-colors
    ${error ? 'border-red-500 focus:ring-red-500' : ''}
    ${className}
  `;

  const renderInput = () => {
    switch (type) {
      case 'textarea':
        return (
          <textarea 
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            rows={rows}
            className={baseStyles}
            {...props}
          />
        );

        case 'select':
          return (
            <select 
              value={value}
              onChange={onChange}
              disabled={disabled}
              className={baseStyles}
              {...props}
            >
              <option value="">Select an Option</option>
              {options.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          );

          default:
            return (
              <input 
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                className={baseStyles}
                {...props}
              />
            );
    }
  };

  return (
    <div className="w-full">
      {/* Label */}
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Input */}
      {renderInput()}

      {/* Error Message */}
      {error && (
        <p className="mt-1 5 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
  
}