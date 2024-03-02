import styles from "../styles/Landing.module.css";
import Image from "next/image";
import Link from "next/link";

// Components
import { SidebarButton } from "@/components/ui/Buttons";

// Images
// import BG from "@/images/landing-bg.svg";

export default function Home() {
  return (
    <>
      <div className={styles.landing_header_container}>
        <div className={styles.container}>
          <div className={styles.logo_container}>
            <h1 className={styles.logo_primary}>
              exa<span className={styles.logo_secondary}>mina</span>
            </h1>
          </div>
          <div className={styles.navigation}>
            <p>Docs</p>
            <p>Blog</p>
            <p>Features</p>
          </div>
          <Link
            href="/app"
            className={styles.button_container}
            onClick={() => console.log("Selam")}
            style={{ zIndex: 1000 }}
          >
            <SidebarButton label="Connect Wallet" active />
          </Link>
        </div>
      </div>
      <div className={styles.hero_container}>
        <div className={styles.container}>
          <div className={styles.content_container}>
            <h5>Blockchain Tech Based Online Exam Platform</h5>
            <h1>Create, join, test</h1>
            <h3>Create your exam in few minutes</h3>
            <button>Create your exam</button>
          </div>
        </div>
      </div>
      <div className={styles.section_container}>
        <div className={styles.container}>
          <h5>HOW IT WORKS</h5>
          <h1>
            The <span>fastest</span> way to create exam
          </h1>
          <h3>
            Powerful, self-serve product and growth analytics to help you
            convert, engage, and retain more users. Trusted by over 4,000
            startups.
          </h3>
        </div>
        <div className={styles.card_container}></div>
        <button>Create now</button>
      </div>
      <div className={styles.section_container}>
        <div className={styles.container}>
          <h5>OUR FEATURES</h5>
          <h1>
            Meet <span>next generation</span> exam platform
          </h1>
          <h3>
            Powerful, self-serve product and growth analytics to help you
            convert, engage, and retain more users. Trusted by over 4,000
            startups.
          </h3>
        </div>
        <div className={styles.card_container}></div>
      </div>
      <div className={styles.section_container}>
        <div className={styles.container}>
          <h5>OUR TECHNOLOGIES</h5>
          <h1>
            Examina <span>uses</span> these technologies
          </h1>
          <h3>
            Powerful, self-serve product and growth analytics to help you
            convert, engage, and retain more users. Trusted by over 4,000
            startups.
          </h3>
        </div>
        <div className={styles.card_container}></div>
      </div>
      <div className={styles.section_container}>
        <div className={styles.container}>
          <h5>OUR TEAN</h5>
          <h1>Meet our team</h1>
        </div>
        <div className={styles.team_image_container}></div>
      </div>
      <div className={styles.sub_section_container}>
        <div className={styles.container}>
          <div></div>
          <div>Try Demo</div>
        </div>
      </div>
      <div className={styles.footer_container}>
        <div className={styles.container}>
          <div className={styles.supporters_container}></div>
          <div className={styles.footer}>
            <h1>examina</h1>
            <div>
              <p>Docs</p>
              <p>Blog</p>
              <p>Features</p>
            </div>
            <p>© 2024 Examina</p>
          </div>
        </div>
      </div>
    </>
  );
}
