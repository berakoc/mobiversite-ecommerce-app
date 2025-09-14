"use client";

export const Button = ({
  children,
  onClick,
  type = "button",
  disabled = false,
  className = "",
  variant = "primary",
  loading = false,
}) => {
  const variantClasses = {
    primary: `
      bg-green-500 
      hover:bg-green-600 
      active:bg-green-700
      focus:ring-2 
      focus:ring-green-500 
      focus:ring-offset-2
      focus:outline-none
      text-green-1000
      active:scale-95
    `,
    secondary: `
      bg-black 
      hover:bg-gray-800
      active:bg-gray-900 
      focus:ring-2
      focus:ring-gray-500
      focus:ring-offset-2
      focus:outline-none
      text-white
      active:scale-95
    `,
    disabled: `
      bg-gray-300
      text-gray-500
      cursor-not-allowed
      pointer-events-none
    `,
  };

  const appliedVariant =
    disabled || loading
      ? variantClasses.disabled
      : variantClasses[variant] || variantClasses.primary;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${appliedVariant}
        font-semibold 
        py-2 
        px-4 
        rounded-xl 
        transition-all
        duration-200
        flex
        items-center
        justify-center
        min-w-[100px]
        min-h-[40px]
        ${className}
      `}
    >
      {loading ? (
        <div className="animate-spin h-5 w-5 border-2 border-current rounded-full border-r-transparent border-b-transparent" />
      ) : (
        children
      )}
    </button>
  );
};
