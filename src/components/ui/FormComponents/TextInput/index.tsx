import React from "react";
import styles from "./TextInput.module.css";

type Props = {
  title: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  maxLength?: number;
  className?: string;
  containerClassName?: string;
};

function TextInput({
  title,
  value,
  onChange,
  placeholder,
  type,
  required,
  disabled,
  maxLength,
  className,
  containerClassName,
}: Props) {
  return (
    <div className={`${styles.container} ${containerClassName}`}>
      <h3 className={styles.title}>{title}</h3>
      {type === "textarea" ? (
        <textarea
          className={`${styles.textarea} ${className}`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || "Type here..."}
          required={required}
          disabled={disabled}
          maxLength={maxLength || 2000}
        />
      ) : (
        <input
          className={`${styles.input} ${className}`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          type={type}
          required={required}
          disabled={disabled}
          maxLength={maxLength || 100}
        />
      )}
    </div>
  );
}

export default TextInput;
