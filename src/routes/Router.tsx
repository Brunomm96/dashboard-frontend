import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import NotAllowedPage from '../pages/NotAllowedPage';
import NotFoundPage from '../pages/NotFoundPage';
import ChatStandalone from '../pages/ChatStandalone';

const Router: React.FC = () => {
	return (
		<>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/not-allowed" element={<NotAllowedPage />} />
				<Route path="/chat" element={<ChatStandalone />} />
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</>
	);
};

export default Router;
