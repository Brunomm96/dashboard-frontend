import api from '../api';
import IMessageBubbleContent from '../interfaces/IMessageBubbleContent';
import IIAChatServerRequest from '../interfaces/requests/IIAChatServerRequest';
import IIAChatServerResponse from '../interfaces/responses/IIAChatServerResponse';

const sendMessage = async (questionHistory: IMessageBubbleContent[]) => {
	const request: IIAChatServerRequest = { question: questionHistory };

	const { data } = await api.post<IIAChatServerResponse>(
		'/aichat/gemini/prompt',
		request
	);
	const { msg } = data;

	return msg;
};

export { sendMessage };
