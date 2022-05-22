import React from 'react';
import styles from './GridHeader.module.css';

const GridHeader = () => {
	return (
		<div className={styles.gridHeader}>
			<p>Person</p>
			<p>Date</p>
			<p>Project</p>
			<p>Service</p>
			<p>Note</p>
			<p>Time</p>
		</div>
	);
};

export default GridHeader;
