import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks"; 
import { getTeam } from "../../redux/slices/teamSlice";
import styles from "./TeamSection.module.css";

const TeamSection = () => {
  const dispatch = useAppDispatch(); // Теперь `dispatch` работает с asyncThunk
  const { team, status, error } = useAppSelector((state) => state.team);

  useEffect(() => {
    if (status === "idle") {
      dispatch(getTeam());
    }
  }, [status, dispatch]);

  if (status === "loading") return <p>Загрузка...</p>;
  if (status === "failed") return <p className={styles.error}>Ошибка: {error}</p>;

  return (
    <section id="team" className={styles.teamSection}>
      <div className={styles.container}>
        <h2 className={styles.title}>Наша команда</h2>
        <div className={styles.grid}>
          {team.map((member) => (
            <div className={styles.card} key={member.id}>
              <img src={member.imgUrl} alt={member.name} className={styles.image} loading="lazy" />
              <div className={styles.info}>
                <h3 className={styles.name}>{member.name}</h3>
                <p className={styles.role}>{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
