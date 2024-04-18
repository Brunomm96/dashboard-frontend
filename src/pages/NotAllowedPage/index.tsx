import Page from '../../components/Page';

const NotAllowedPage: React.FC = () => {
	return (
		<Page>
			<h1>USUÁRIO SEM PERMISSÃO</h1>
			<p className="read-the-docs">
				Usuário está sem premissão ou se encontra com a permissão
				expirada.
			</p>
		</Page>
	);
};

export default NotAllowedPage;
