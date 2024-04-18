import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCommentAlt,
	faPaperPlane,
} from '@fortawesome/free-regular-svg-icons';
import DWLogo from '/DW.png?url';
import './style.css';
import MessageBubble from '../../components/MessageBubble';
import { useCallback, useEffect, useRef, useState } from 'react';
import IMessageBubbleContent from '../../interfaces/IMessageBubbleContent';
import { sendMessage as submitMessage } from '../../services/IAChatService';
import Spinner from '../../components/Spinner';
import { AxiosError } from 'axios';

const initialMessage: IMessageBubbleContent = {
	text: 'Olá, eu sou a IA da Datawake! Atualmente estou conectada à Tabela de Turnos proveniente da Paranoá. Me pergunte qualquer coisa referente a ela e irei responder.',
	time: new Date(),
	isSender: false,
};

const errorMessage: IMessageBubbleContent = {
	text: 'Desculpe, parece que há algo de errado com os meus servidores, não sou capaz de responder sua mensagem no momento. Tente novamente mais tarde.',
	time: new Date(),
	isSender: false,
};

const ChatStandalone: React.FC = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [messageHistory, setMessageHistory] = useState<
		IMessageBubbleContent[]
	>([]);
	const [message, setMessage] = useState('');
	const chatRef = useRef<HTMLDivElement>(null);
	const textAreaRef = useRef<HTMLTextAreaElement>(null);

	const messageToServer = useCallback(
		async (history: IMessageBubbleContent[]) => {
			const response = await submitMessage(history);

			const content: IMessageBubbleContent = {
				text: response,
				time: new Date(),
				isSender: false,
			};

			setMessageHistory([...history, content]);
		},
		[]
	);

	const sendMessage = useCallback(async () => {
		const history = messageHistory;

		try {
			setIsLoading(true);

			const question = message;

			const content: IMessageBubbleContent = {
				text: question,
				time: new Date(),
				isSender: true,
			};

			history.push(content);

			setMessageHistory([...history]);
			setMessage('');

			await messageToServer(history);
		} catch (err: unknown) {
			if (err instanceof AxiosError) {
				history.push(errorMessage);

				setMessageHistory([...history]);
				setMessage('');
			} else {
				console.error(err);
			}
		} finally {
			setIsLoading(false);
		}
	}, [message, messageHistory, messageToServer]);

	useEffect(() => {
		if (chatRef.current) {
			chatRef.current.scrollTo({
				top: chatRef.current.scrollHeight,
				behavior: 'smooth',
			});
		}
	}, [messageHistory]);

	useEffect(() => {
		if (textAreaRef.current) textAreaRef.current.focus();
	}, [isLoading]);

	return (
		<div className="msger">
			<div className="msger-header">
				<div className="msger-header-title">
					<FontAwesomeIcon
						className="msger-header-title-icon"
						icon={faCommentAlt}
					/>{' '}
					DW CHAT - <small>TABELA DE TURNOS</small>
				</div>
				<div className="msger-header-options">
					<img className="msge-header-options-logo" src={DWLogo} />
				</div>
			</div>

			<div className="msger-chat" ref={chatRef} suppressHydrationWarning>
				<MessageBubble content={initialMessage} />

				{messageHistory.map((messageContent, i) => (
					<MessageBubble key={i} content={messageContent} />
				))}

				<Spinner
					className={`msger-chat-loading-spinner ${
						isLoading ? '' : 'd-none'
					}`}
				/>
			</div>

			<div className="msger-inputarea">
				<textarea
					disabled={isLoading}
					className="msger-input"
					placeholder={
						isLoading
							? 'Aguardando resposta'
							: 'Digite uma mensagem'
					}
					autoFocus
					ref={textAreaRef}
					rows={3}
					value={message}
					onChange={(e) => {
						setMessage(e.currentTarget.value);
					}}
					onKeyDown={(e) => {
						if (e.key === 'Enter' && message.trim() != '') {
							e.preventDefault();
							sendMessage().catch((res) => {
								console.error(res);
							});
						}
					}}
				/>

				<button
					type="submit"
					disabled={isLoading}
					className="msger-send-btn"
					onClick={() => {
						if (textAreaRef.current?.value != '')
							sendMessage().catch((res) => {
								console.error(res);
							});
					}}
				>
					<FontAwesomeIcon icon={faPaperPlane} />
				</button>
			</div>
		</div>
	);
};

export default ChatStandalone;
