"use client";
import React from "react";
import styles from "@/styles/app/Dashboard.module.css";

// Custom Components
import ExamCard from "@/components/ui/ExamCard";
import SummaryCard from "@/components/ui/SummaryCard";

type Props = {};

function Application({}: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <ExamCard
          title="Chemistry"
          containerStyle={{ maxWidth: "571px", minWidth: "571px" }}
        />
        <SummaryCard title="Total Exams" count={8} />
        <SummaryCard title="Your Score" count={78} />
        <SummaryCard title="Active Exams" count={4} />
      </div>
    </div>
  );
}

export default Application;
