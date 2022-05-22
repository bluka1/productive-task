import { Toaster } from 'react-hot-toast';

import Header from './components/Header/Header';
import Main from './components/Main/Main';

import styles from './App.module.css';

function App() {
	return (
		<div className={styles.app}>
			<Toaster position="top-center" reverseOrder={false} />
			<Header />
			<Main />
		</div>
	);
}

export default App;
