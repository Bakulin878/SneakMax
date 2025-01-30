import AboutSection from '../AboutSection/AboutSection';
import FAQSection from '../FAQSection/FAQSection';
import ContactAndInstagramSection from '../ContactAndInstagramSection/ContactAndInstagramSection';
import ContactSection from '../ContactSection/ContactSection';
import TeamSection from '../TeamSection/TeamSection';
import styles from './Main.module.css'
import CatalogSection from '../CatalogSection/CatalogSection';
import PairSelection from '../PairSelection/PairSelection';

const Main = () => {
  return (
    <main className={styles.main}>
      <div >
      <CatalogSection />
      <AboutSection />
      <PairSelection />
      <TeamSection />
      <FAQSection />
      <ContactSection />
      <ContactAndInstagramSection />
      </div>
    </main>
  );
};

export default Main;