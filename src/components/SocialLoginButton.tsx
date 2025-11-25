import React from 'react';

interface SocialLoginButtonProps {
  provider: 'google' | 'facebook';
  onClick?: () => void;
  disabled?: boolean;
}

export const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({ 
  provider, 
  onClick,
  disabled = false 
}) => {
  const getProviderConfig = () => {
    switch (provider) {
      case 'google':
        return {
          icon: "https://api.builder.io/api/v1/image/assets/TEMP/84115cc759d77815c0e5d2d827855c49fe29a64c?placeholderIfAbsent=true",
          text: "Entrar com o Google",
          ariaLabel: "Entrar com conta do Google"
        };
      case 'facebook':
        return {
          icon: "https://api.builder.io/api/v1/image/assets/TEMP/b9be4c313addfededab18f0096469c2d48917b97?placeholderIfAbsent=true",
          text: "Sign in with Facebook",
          ariaLabel: "Sign in with Facebook account"
        };
      default:
        return {
          icon: "",
          text: "",
          ariaLabel: ""
        };
    }
  };

  const config = getProviderConfig();

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={config.ariaLabel}
      className="bg-[rgba(94,173,237,1)] self-center flex items-stretch gap-4 text-white font-semibold mt-2 px-12 py-3.5 rounded-[15px] hover:bg-[rgba(84,163,227,1)] active:bg-[rgba(74,153,217,1)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
    >
      <img
        src={config.icon}
        className="aspect-[1] object-contain w-[18px] shrink-0"
        alt={`${provider} logo`}
      />
      <span className="basis-auto">
        {config.text}
      </span>
    </button>
  );
};
