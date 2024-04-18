interface Props {
	className?: string;
}

const Spinner: React.FC<Props> = ({ className }: Props) => (
	<div className={`spinner-border ${className}`} role="status">
		<span className="visually-hidden">Loading...</span>
	</div>
);

export default Spinner;
