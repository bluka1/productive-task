export const fetcher = (
	path,
	{ headers = {}, method = 'GET', body = null, ...options } = {},
) => {
	return fetch(`https://api.productive.io/api/v2/${path}`, {
		headers: {
			'Content-Type': 'application/vnd.api+json',
			'X-Auth-Token': `${process.env.REACT_APP_TEST_TOKEN}`,
			'X-Organization-Id': `${process.env.REACT_APP_ORG_ID}`,
			...headers,
		},
		body: body ? JSON.stringify(body) : undefined,
		method,
		...options,
	}).then((response) => {
		if (response.status === 204) {
			return;
		}
		return response.json();
	});
};
