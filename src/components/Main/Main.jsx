import React, { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

import InputForm from '../InputForm/InputForm';
import GridHeader from './GridHeader/GridHeader';
import GridItem from './GridItem/GridItem';

import styles from './Main.module.css';
import { fetcher } from '../../utils/fetcher';

const Main = () => {
	const [personId, setPersonId] = useState();
	const [timeEntries, setTimeEntries] = useState();

	const submitHandler = (e, note, time) => {
		e.preventDefault();

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
		fetcher(
			`time_entries?id=${personId}&filter[after]=${format(
				new Date(),
				'yyyy-MM-dd',
			)}&filter[before]=${format(new Date(), 'yyyy-MM-dd')}`,
		)
			.then((data) => {
				const projectObj = data.included.filter((i) => i.id === '203968');
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
			.catch((error) =>
				toast.error('Error while fetching time entries...', error),
			);
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
				{timeEntries ? (
					<>
						{timeEntries.map((item) => (
							<GridItem key={item.id} item={item} onClick={deleteEntry} />
						))}
					</>
				) : (
					<p>Loading...</p>
				)}
			</div>
		</>
	);
};

export default Main;
