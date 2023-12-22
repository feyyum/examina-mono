import React from "react";
import styles from "./SummaryCard.module.css";

type Props = {
  title?: string;
  count?: number;
};

function SummaryCard({ title, count }: Props) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title ? title : "Title"}</h1>
      <p className={styles.count}>{count ? count : 0}</p>
    </div>
  );
}

export default SummaryCard;
