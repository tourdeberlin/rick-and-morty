import React from 'react';
import logo from '../../assets/logo.svg';
import portal from '../../assets/portal.webp';
import styles from './NotFound.module.scss';
import Button from '../../components/UI/Button/Button';
import { Link } from 'react-router';

const NotFoundPage: React.FC = () => {
  return (
    <div className={styles.notFound}>
      <img src={logo} alt="Rick and Morty logo" className={styles.logo} />
      <div className={styles.errorCode}>
        <span className={styles.number}>4</span>
        <img src={portal} alt="Portal" className={styles.portal} />
        <span className={styles.number}>4</span>
      </div>
      <Link to="/">
        <Button>Get me back home</Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
