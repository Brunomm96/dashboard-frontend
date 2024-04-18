import IMessageBubbleContent from '../../interfaces/IMessageBubbleContent';
import './style.css';

interface Props {
	content: IMessageBubbleContent;
}

const MessageBubble: React.FC<Props> = ({ content }: Props) => {
	return (
		<div className={`msg ${content.isSender ? 'right-msg' : 'left-msg'}`}>
			<div className="msg-bubble">
				<div className="msg-text">{content.text}</div>

				<div className="msg-info">
					<div className="msg-info-time">
						{`${content.time.getHours()}:${content.time.getMinutes()}`}
					</div>
				</div>
			</div>
		</div>
	);
};

export default MessageBubble;
