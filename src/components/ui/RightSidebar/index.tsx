import styles from "@/styles/components/RightSidebar.module.css";

type Props = {};

function RightSidebar({}: Props) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Schedule</h1>
      <div className={styles.card_container}>
        <div className={styles.card}>
          <div className={styles.dot} />
          <div>
            <h3 className={styles.card_title}>UI Principles</h3>
            <p className={styles.card_date}>July 10, 2021 - 18.00</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RightSidebar;
