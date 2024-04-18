import { PropsWithChildren } from 'react';
import './style.css';

const Page: React.FC<PropsWithChildren> = ({ children }: PropsWithChildren) => {
	return <div className="wrap">{children}</div>;
};

export default Page;
