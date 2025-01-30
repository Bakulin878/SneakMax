import styles from "./TeamSection.module.css";
import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { TeamMember } from "../../types/bean";

const TeamSection: React.FC = () => {
  const [data, setData] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get<TeamMember[]>("https://70fd489b13cfbfb8.mokky.dev/team");
      setData(response.data);
      setLoading(false);
    } catch (err) {
      setError((err as Error).message);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <section id="team" className={styles.teamSection}>
      <div className={styles.container}>
        <h2 className={styles.title}>Наша команда</h2>
        {loading ? (
          <p>Загрузка...</p>
        ) : error ? (
          <p className={styles.error}>Ошибка: {error}</p>
        ) : (
          <div className={styles.grid}>
            {data.map((member) => (
              <div className={styles.card} key={member.id}>
                <img
                  src={member.imgUrl}
                  alt={member.name}
                  className={styles.image}
                  loading="lazy"
                />
                <div className={styles.info}>
                  <h3 className={styles.name}>{member.name}</h3>
                  <p className={styles.role}>{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TeamSection;
