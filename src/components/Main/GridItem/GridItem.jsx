import React from 'react';
import styles from './GridItem.module.css';

const GridItem = ({ item, onClick }) => {
	let parser = new DOMParser();
	let itemNote;
	if (item.note) {
		itemNote = parser.parseFromString(item.note, 'text/html');
	}
	return (
		<div className={styles.gridItem} key={item.id}>
			<p>{item.person}</p>
			<p>{item.date}</p>
			<p>{item.project}</p>
			<p>{item.service}</p>
			<p>
				{item.note ? (
					`${itemNote.documentElement.textContent}`
				) : (
					<span className={styles.noNote}>No note added</span>
				)}
			</p>
			<p>{item.time} min</p>
			<button className={styles.deleteButton} onClick={() => onClick(item.id)}>
				X
			</button>
		</div>
	);
};

export default GridItem;
