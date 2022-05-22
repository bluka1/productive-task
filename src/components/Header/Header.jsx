import React from 'react';

import { ReactComponent as Logo } from '../../assets/images/logo.svg';

import styles from './Header.module.css';

const Header = () => {
	const today = new Date();
	const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

	return (
		<header>
			<div className={styles.title}>
				<Logo />
				<h1>time tracker</h1>
			</div>
			<p className={styles.today}>
				📅{' '}
				{`${days[today.getDay()]}, ${today.getDate()} ${today.toLocaleString(
					'en-US',
					{
						month: 'short',
					},
				)}`}
			</p>
		</header>
	);
};

export default Header;
