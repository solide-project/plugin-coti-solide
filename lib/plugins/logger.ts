import { SolidePluginsMessage } from './messages'

export const sendToLog = (log: string) => {
    const message = {
        target: SolidePluginsMessage.SOLIDE_CONSOLE_LOG.toString(),
        data: log
    };

    window.parent.postMessage(message, "*");
};
