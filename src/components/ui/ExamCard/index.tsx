import React from "react";
import styles from "@/styles/components/ExamCard.module.css";

type Props = {
  title?: string;
  // Burası değişecek epoch time alacağız
  time?: string;
  containerStyle?: React.CSSProperties;
};

function ExamCard({ title, time, containerStyle }: Props) {
  return (
    <div className={`${styles.container}`} style={containerStyle}>
      <div>
        <h3 className={styles.type}>ONLINE EXAM</h3>
        <h1 className={styles.title}>{title ? title : "Math"}</h1>
      </div>
      <h3 className={styles.time}>
        started in{" "}
        <span className={styles.time_bold}>{time ? time : "8 days"}</span>
      </h3>
    </div>
  );
}

export default ExamCard;
