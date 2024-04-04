import styles from '@/styles/app/exams/get-started/ExamDetailScreen.module.css';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { getExamDetails } from '@/lib/Client/Exam';
import { humanize } from '../../../../../utils/formatter';

// Custom Layout
import Layout from '../layout';

// Icons
import ExamIcon from '@/icons/globe.svg';
import Clock from '@/icons/clock.svg';

function ExamDetail() {
  const router = useRouter();
  const examID: string = router.query.slug as string;

  console.log('examID', examID);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['exam'],
    queryFn: () => getExamDetails(examID),
    enabled: !!examID, // Only fetch data when examID is available
  });

  console.log(data);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (data === undefined) {
    return <div>Not found</div>;
  }

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.content_container}>
          <div className={styles.card_container}>
            <div className={styles.card_inner_container}>
              <div className={styles.meta_container}>
                <p className={styles.invite_container}>
                  <span>{(data as any).creator}</span> invited you to join
                </p>
                <div className={styles.title_container}>
                  <Image src={ExamIcon} alt="" />
                  <h3>{(data as any).title}</h3>
                </div>
                <div className={styles.deadline_container}>
                  <Image src={Clock} alt="" />
                  <p>{humanize((data as any).startDate)}</p>
                </div>
              </div>
              <div className={styles.card_content_container}>
                <div className={styles.card_content_inner_container}>
                  <div className={styles.card_title}>
                    <h3 className={styles.card_title__bold}>Type</h3>
                    <p className={styles.card_title__normal}>Quiz</p>
                  </div>
                  <div className={styles.card_title}>
                    <h3 className={styles.card_title__bold}>Total Questions</h3>
                    <p className={styles.card_title__normal}>10</p>
                  </div>
                  <div className={styles.card_title}>
                    <h3 className={styles.card_title__bold}>Duration</h3>
                    <p className={styles.card_title__normal}>{(data as any).duration} minutes</p>
                  </div>
                </div>
                <div className={styles.card_content_inner_container}>
                  <div className={styles.card_title}>
                    <h3 className={styles.card_title__bold}>Description</h3>
                  </div>
                  <p className={styles.card_content}>{(data as any).description}</p>
                </div>
              </div>
              <div className={styles.connect_container}>
                <div className={styles.connect_button_container}>
                  <p className={styles.connect_button_text}>Connect wallet</p>
                </div>
                <p className={styles.connect_container_desc}>
                  You must have an Auro Wallet account before using it. Not there yet?{' '}
                  <a href="#">Create now!</a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={`${styles.footer_container}`}>
          <div className={styles.scale__container}>
            <h3 className={styles.footer_logo}>
              exa<span>mina</span>
            </h3>
            <div className={styles.footer_nav_container}>
              <a className={styles.footer_nav_item} href="#">
                Overview
              </a>
              <a className={styles.footer_nav_item} href="#">
                Blog
              </a>
              <a className={styles.footer_nav_item} href="#">
                Docs
              </a>
            </div>
            <p className={styles.footer_copyright}>© 2024 Examina</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ExamDetail;
