import Page from '../../components/Page';
import './style.css';
import DWLogo from '/DW.png?url';

const HomePage: React.FC = () => {
	return (
		<Page>
			<img className="home--logo" src={DWLogo} />
			<h1>Datawake Dashboards</h1>
			<div className="home--card">
				<p>Bem vindo à plataforma de Dashboards da Datawake</p>
			</div>
		</Page>
	);
};

export default HomePage;
