import React from 'react';
import styles from './styles.module.scss';
import Link from '@docusaurus/Link';
import Calculator from '../Calculator';

export default function CalculatorContainer() {
  return (
    <div className={styles.bgColor}>
      <Calculator />
    </div>
  );
}
