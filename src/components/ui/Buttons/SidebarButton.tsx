import styles from "@/styles/components/SidebarButton.module.css";

type Props = {
  containerClassName?: string;
  labelClassName?: string;
  imageClassName?: string;
  active?: boolean;
  onClick?: () => void;
  Icon?: React.ComponentClass<any> | React.FC<any>;
  label: string;
  disabled?: boolean;
};

function SidebarButton({
  containerClassName,
  labelClassName,
  imageClassName,
  active = false,
  onClick = () => {},
  Icon,
  label,
  disabled = true,
}: Props) {
  return (
    <button
      className={`${styles.container} ${containerClassName} ${
        active ? styles.button_active : ""
      } ${disabled ? styles.button_disabled : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {Icon && (
        <Icon
          className={`${styles.image} ${imageClassName} ${
            active ? styles.icon_active : ""
          }`}
        />
      )}
      <p
        className={`${styles.label} ${labelClassName} ${
          active ? styles.label_active : ""
        }`}
      >
        {label}
      </p>
    </button>
  );
}

export default SidebarButton;
