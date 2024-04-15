import styles from '@/styles/app/exams/get-started/ExamDetailScreen.module.css';
import Image from 'next/image';
import { useRouter } from 'next/router';
// import { useQuery } from '@tanstack/react-query';

// Custom Layout
import Layout from '../layout';

// Icons
import ResultImage from '@/images/exam/result.svg';
import MinaBell from '@/icons/mina-bell.svg';
// import Send from '@/icons/exam_send.svg';
import Discord from '@/icons/discord.svg';
import Telegram from '@/icons/telegram.svg';
import Twitter from '@/icons/twitter.svg';
import Choz from '@/icons/choz.svg';

// API
// import { getScore } from '@/lib/Client/Exam';

function ExamResult() {
  const router = useRouter();
  const examID: string = router.query.slug as string;

  // const { data, isLoading, isPending, isError } = useQuery({
  //   queryKey: ['exam'],
  //   queryFn: () => getScore(examID),
  //   enabled: !!examID, // Only fetch data when examID is available
  // });

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.content_container}>
          <div className={styles.card_container}>
            <div className={styles.card_inner_container}>
              <div className={styles.meta_container}>
                <Image src={ResultImage} alt="" />
              </div>
              <div className={styles.score_container}>
                {/* <h2 className={styles.score_title}>
                  YOUR SCORE: {data ? (data as any).score : '-'}
                </h2> */}
                <p className={styles.score_text}>
                  Congratulations, you've proven yourself! Now it's time for your reward! 🎁 Your
                  exam results will be automatically transmitted to us, and your prize will be
                  deposited into your wallet within 2 weeks. That's all. You can close this window.
                </p>
              </div>
              <div className={styles.card_content_container}>
                <div className={styles.send_container}>
                  {/* <p className={styles.send_text_content}>
                    Get your exam result to your email account.
                  </p> */}
                  {/* <div className={styles.send_text_input_container}>
                    <input
                      type="text"
                      placeholder="john@doe.com"
                      className={styles.send_text_input}
                    />
                    <Image src={Send} alt="" className={styles.send_icon} />
                  </div> */}
                  <div className={styles.send_email_button_container_secondary}>
                    <a
                      href="https://examina.space/app"
                      className={styles.send_email_button_text_secondary}
                    >
                      Skip and Continue
                    </a>
                  </div>
                </div>
              </div>
              <div className={styles.connect_container}>
                <div className={styles.inform_container}>
                  <Image src={MinaBell} alt="" />
                  <p className={styles.inform_text}>
                    If you encounter any issues, don't forget to reach out by following us! We'll
                    contact you from there.
                  </p>
                </div>
                <div className={styles.social_container}>
                  <div className={styles.social_inner_container}>
                    <a href="https://twitter.com/chozapp" target="_blank">
                      <Image src={Twitter} alt="" />
                    </a>
                    <a href="https://discord.gg/TkpVyfNqwQ" target="_blank">
                      <Image src={Discord} alt="" />
                    </a>
                    <a href="https://t.me/chozio" target="_blank">
                      <Image src={Telegram} alt="" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`${styles.footer_container}`}>
          <div className={styles.scale__container}>
            <Image src={Choz} alt="" />
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
            <p className={styles.footer_copyright}>©2024 Choz</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ExamResult;
