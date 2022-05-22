import React from 'react';

import styles from './Header.module.css';

const Header = () => {
	const today = new Date();
	const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	const month = today.toLocaleString('en-US', { month: 'short' });

	return (
		<>
			<header>
				<h1 className={styles.title}>Productive time tracker</h1>
			</header>
			<p className={styles.today}>{`${
				days[today.getDay()]
			}, ${today.getDate()} ${month}`}</p>
		</>
	);
};

export default Header;
