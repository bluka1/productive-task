import React from 'react';
import { timeFormatter } from '../../../utils/timeFormatter';

import styles from './GridItem.module.css';

const GridItem = ({ item, onClick }) => {
	let itemNote;
	if (item.note) {
		itemNote = new DOMParser().parseFromString(item.note, 'text/html');
		itemNote = itemNote.documentElement.textContent;
	}
	return (
		<div className={styles.gridItem} key={item.id}>
			<p>{item.person}</p>
			<p>{item.date}</p>
			<p>{item.project}</p>
			<p>{item.service}</p>
			<p>
				{item.note ? (
					`${itemNote}`
				) : (
					<span className={styles.noNote}>No note added</span>
				)}
			</p>
			<p>{timeFormatter(item.time)}</p>
			<button className={styles.deleteButton} onClick={() => onClick(item.id)}>
				X
			</button>
		</div>
	);
};

export default GridItem;
