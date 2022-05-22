export const timeFormatter = (minutes) => {
	const hours = minutes / 60;
	const roundedHours = Math.floor(hours);
	const minutesLeft = hours - roundedHours;
	const roundedMinutes = Math.round(minutesLeft * 60);

	if (roundedHours > 0) {
		if (roundedMinutes === 0) {
			return `${roundedHours}h`;
		}
		return `${roundedHours}h ${roundedMinutes}min`;
	}

	return `${roundedMinutes}min`;
};
