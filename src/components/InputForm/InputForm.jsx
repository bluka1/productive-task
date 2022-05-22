import React, { useRef, useState } from 'react';
import { timeFormatter } from '../../utils/timeFormatter';

import styles from './InputForm.module.css';

const InputForm = ({ onSubmit }) => {
	const [time, setTime] = useState();
	const projectRef = useRef();
	const serviceRef = useRef();
	const timeRef = useRef();
	const noteRef = useRef();

	const changeTimeHandler = () => {
		setTime(timeRef.current.value);
	};

	return (
		<form
			onSubmit={(e) => {
				onSubmit(e, noteRef.current.value, timeRef.current.value);
				timeRef.current.value = '';
				noteRef.current.value = '';
				setTime(0);
			}}
			className={styles.form}
		>
			<div className={styles.inputContainer}>
				<input
					className={`${styles.input} ${styles.readonlyInput}`}
					type="text"
					value="Project: Retainer [SAMPLE]"
					ref={projectRef}
					readOnly
				/>
			</div>
			<div className={styles.inputContainer}>
				<input
					className={`${styles.input} ${styles.readonlyInput}`}
					type="text"
					value="Service: Development"
					ref={serviceRef}
					readOnly
				/>
			</div>
			<div className={styles.inputContainer}>
				<input
					type="number"
					min={1}
					placeholder="Time in minutes"
					className={styles.input}
					ref={timeRef}
					onChange={changeTimeHandler}
				/>
				<span className={styles.minutes}>
					= {time ? timeFormatter(time) : '0 min'}
				</span>
			</div>
			<div className={styles.inputContainer}>
				<input
					type="text"
					placeholder="Note"
					className={styles.input}
					ref={noteRef}
				/>
			</div>
			<div className={styles.buttonContainer}>
				<button className={styles.button}>Save</button>
			</div>
		</form>
	);
};

export default InputForm;
