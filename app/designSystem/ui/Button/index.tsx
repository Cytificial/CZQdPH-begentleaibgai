import React from 'react';
import styles from './Button.module.scss';
import { motion, MotionProps } from 'framer-motion';

interface ButtonBaseProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

interface ExtendedButtonProps extends ButtonBaseProps, MotionProps {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onAnimationStart?: () => void;
}

export const Button: React.FC<ExtendedButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className,
  onClick,
  ...props
}) => {
  const rippleEffect = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.className = styles.ripple;

    button.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);

    if (onClick) onClick(e);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`
        ${styles.button}
        ${styles[variant]}
        ${styles[size]}
        ${className || ''}
        ${styles.glassmorphism}
      `}
      onClick={rippleEffect}
      {...props}
    >
      <span className={styles.glow}></span>
      {children}
    </motion.button>
  );
};

