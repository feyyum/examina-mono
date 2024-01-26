"use client";
import { useState } from "react";
import styles from "@/styles/app/Dashboard.module.css";

// Import Custom Components
import CarouselComponent from "@/components/ui/DashboardCarousel";

type Props = {};

type Exam = {
  title: string;
  description: string;
  date: string;
  duration: string;
  owner: string;
  participants: string;
};

const MOCK_EXAMS: Exam[] = [
  {
    title: "Exam 1",
    description: "This is the first exam",
    date: "2021-07-01",
    duration: "120",
    owner: "John Doe",
    participants: "20",
  },
  {
    title: "Exam 2",
    description: "This is the second exam",
    date: "2021-07-02",
    duration: "60",
    owner: "John Doe",
    participants: "12",
  },
  {
    title: "Exam 3",
    description: "This is the third exam",
    date: "2021-07-03",
    duration: "40",
    owner: "John Doe",
    participants: "8",
  },
];

const MOCK_EXAMS2: Exam[] = [
  {
    title: "Exam 2",
    description: "This is the second exam",
    date: "2021-07-02",
    duration: "60",
    owner: "John Doe",
    participants: "12",
  },
];

function Application({}: Props) {
  const [upcomingStep, setUpcomingStep] = useState(0);
  const [ongoingStep, setOngoingStep] = useState(0);
  const [inreviewStep, setInreviewStep] = useState(0);

  return (
    <div className={styles.container}>
      <div className={styles.exams_container}>
        <CarouselComponent
          type="Upcoming"
          exams={MOCK_EXAMS}
          step={upcomingStep}
          stepper={setUpcomingStep}
        />
        <CarouselComponent
          type="Ongoing"
          exams={MOCK_EXAMS2}
          step={ongoingStep}
          stepper={setOngoingStep}
        />
        <CarouselComponent
          type="Inreview"
          step={inreviewStep}
          stepper={setInreviewStep}
        />
      </div>
    </div>
  );
}

export default Application;
