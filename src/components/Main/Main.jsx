import React, { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

import InputForm from '../InputForm/InputForm';
import GridHeader from './GridHeader/GridHeader';
import GridItem from './GridItem/GridItem';
import { fetcher } from '../../utils/fetcher';

import styles from './Main.module.css';

const Main = () => {
	const [personId, setPersonId] = useState();
	const [timeEntries, setTimeEntries] = useState();
	const [updating, setUpdating] = useState(false);

	const submitHandler = (e, note, time) => {
		e.preventDefault();

		if (!note && !time) {
			toast.error('Enter time (and note).');
			return;
		}

		fetcher(`time_entries`, {
			method: 'POST',
			body: {
				data: {
					type: 'time_entries',
					attributes: {
						note,
						time,
						date: format(new Date(), 'yyyy-MM-dd'),
					},
					relationships: {
						person: {
							data: {
								type: 'people',
								id: '271353',
							},
						},
						service: {
							data: {
								type: 'services',
								id: '1686067',
							},
						},
					},
				},
			},
		})
			.then(() => {
				toast.success('Successfully added!');
				fetchTimeEntries();
			})
			.catch(({ message }) =>
				toast.error('Ooops... Something went wrong', message),
			);
	};

	const deleteEntry = (id) => {
		fetcher(`time_entries/${id}`, {
			method: 'DELETE',
		})
			.then(() => {
				toast.success('Successfully deleted!');
				fetchTimeEntries();
			})
			.catch((error) => toast.error('Error while deleting item', error));
	};

	const fetchTimeEntries = useCallback(() => {
		setUpdating(true);
		fetcher(
			`time_entries?id=${personId}&filter[after]=${format(
				new Date(),
				'yyyy-MM-dd',
			)}&filter[before]=${format(new Date(), 'yyyy-MM-dd')}`,
		)
			.then((data) => {
				setUpdating(false);

				const projectObj = data.included?.filter((i) => i.id === '203968');
				setTimeEntries(
					data.data.map(({ id, attributes, relationships }) => {
						const { note, time, date } = attributes;
						const personObj = data.included.filter(
							(i) => i.id === relationships.person.data.id,
						);
						const serviceObj = data.included.filter(
							(i) => i.id === relationships.service.data.id,
						);
						return {
							id,
							note,
							time,
							date,
							person: `${personObj[0].attributes.first_name} ${personObj[0].attributes.last_name}`,
							project: projectObj[0].attributes.name,
							service: serviceObj[0].attributes.name,
						};
					}),
				);
			})
			.catch((error) => {
				console.log(error);
				toast.error('Error while fetching time entries...', error);
				setUpdating(false);
			});
	}, [personId]);

	const fetchOrgMemberships = useCallback(() => {
		fetcher(`organization_memberships`)
			.then((data) => {
				setPersonId(data.data[0].relationships.person.data.id);
				fetchTimeEntries();
			})
			.catch((error) => {
				toast.error('Error while fetching user data...', error.message);
			});
	}, [fetchTimeEntries]);

	useEffect(() => {
		fetchOrgMemberships();
	}, [fetchOrgMemberships]);

	return (
		<>
			<InputForm onSubmit={submitHandler} />
			<div className={styles.gridContainer}>
				<GridHeader />
				{(!timeEntries || updating) && <p>Loading...</p>}
				{timeEntries?.length === 0 && <p>No time entries.</p>}
				{timeEntries && (
					<>
						{timeEntries.map((item) => (
							<GridItem key={item.id} item={item} onClick={deleteEntry} />
						))}
					</>
				)}
			</div>
		</>
	);
};

export default Main;
