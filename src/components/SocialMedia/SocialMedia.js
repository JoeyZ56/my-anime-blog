import { FaGithub, FaDiscord } from "react-icons/fa";
import styles from "./SocialMedia.module.scss";
import { motion } from "framer-motion";

const SocialMedia = () => {
  return (
    <div className={styles.container}>
      <motion.div
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 1.1 }}
        drag="x"
        dragConstraints={{ left: -100, right: 100 }}
        className={styles.socialMedia}
      >
        <a href="https://github.com/JoeyZ56" target="_blank" rel="noreferrer">
          <FaGithub />
        </a>
      </motion.div>
      <motion.div
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 1.1 }}
        drag="x"
        dragConstraints={{ left: -100, right: 100 }}
        className={styles.socialMedia}
      >
        <a
          href="https://discord.com/channels/1151667172297429082/1151667173891256352"
          target="_blank"
          rel="noreferrer"
        >
          <FaDiscord />
        </a>
      </motion.div>
    </div>
  );
};

export default SocialMedia;
