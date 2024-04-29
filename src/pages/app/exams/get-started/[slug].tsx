import styles from '@/styles/app/exams/get-started/ExamDetailScreen.module.css';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { getExamDetails } from '@/lib/Client/Exam';
import { humanize } from '../../../../../utils/formatter';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../../../store';

import { connectWallet } from '../../../../../hooks/auth';

//! Account düzelt

// Custom Layout
import Layout from '../layout';

// Icons
import ExamIcon from '@/icons/globe.svg';
import Clock from '@/icons/clock.svg';
import Choz from '@/icons/choz.svg';
import { isMobile } from 'react-device-detect';

function ExamDetail() {
  const router = useRouter();
  const dispatch = useDispatch();
  const examID: string = router.query.slug as string;

  const account = useSelector((state: RootState) => state.account);

  const { data, isLoading, isPending, isError, refetch } = useQuery({
    queryKey: ['exam'],
    queryFn: () => getExamDetails(examID),
    enabled: !!examID, // Only fetch data when examID is available
  });

  // const data = undefined;
  // const isLoading = false;
  // const isPending = true;
  // const isError = false;

  //console.log(data);

  if (isLoading || isPending) {
    return (
      <Layout>
        <div className={styles.container}>
          <div className={styles.content_container}>
            <div className={styles.card_container}>
              <div className={styles.card_inner_container}>
                <div className={styles.error_container}>
                  <h3 className={styles.try_again_title}>Are you bored? &#129393;</h3>
                  <p className={styles.try_again_desc}>
                    We are working hard to get the test details. Please wait a moment.
                  </p>
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
              <p className={styles.footer_copyright}>© 2024 Examina</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!data && !isLoading && isError) {
    return (
      <Layout>
        <div className={styles.container}>
          <div className={styles.content_container}>
            <div className={styles.card_container}>
              <div className={styles.card_inner_container}>
                <div className={styles.error_container}>
                  <h3 className={styles.try_again_title}>Something went wrong &#128553;</h3>
                  <p className={styles.try_again_desc}>
                    Probably this test is invalid or outdated. But you may want to try your luck
                    again. Please click this magic button for that.
                  </p>
                  <p className={styles.try_again_button} onClick={() => refetch()}>
                    TRY AGAIN
                  </p>
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
              <p className={styles.footer_copyright}>© 2024 Examina</p>
            </div>
          </div>
        </div>
      </Layout>
    );
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
                <div
                  className={styles.connect_button_container}
                  onClick={async () => {
                    if (account.wallets[0] && !isMobile) {
                      router.push(`/app/exams/${(data as any)._id}`);
                      return;
                    }
                    const wallet = await connectWallet();
                    // wallet && dispatch(setWallet({ wallets: [wallet] }));
                  }}
                >
                  <p className={styles.connect_button_text}>
                    {account.wallets[0] ? 'Start Exam' : 'Connect Wallet'}
                  </p>
                </div>
                {account.wallets[0] ? (
                  <p className={styles.connect_container_desc_connected}>
                    You are using this wallet address:{' '}
                    <a
                      href={`https://minascan.io/mainnet/account/${account.wallets[0]}/`}
                      target="_blank"
                    >
                      {account.wallets[0].slice(0, 4)}...
                      {account.wallets[0].slice(
                        account.wallets[0].length - 4,
                        account.wallets[0].length
                      )}
                    </a>
                  </p>
                ) : isMobile ? (
                  <p className={styles.connect_container_desc}>
                    You have to use desktop browser to join exam.{' '}
                  </p>
                ) : (
                  <p className={styles.connect_container_desc}>
                    You must have an Auro Wallet account before using it. Not there yet?{' '}
                    <a href="#">Create now!</a>
                  </p>
                )}
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

export default ExamDetail;
