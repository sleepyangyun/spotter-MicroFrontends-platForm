import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import App from '@app/App';
import { setI18n } from 'react-i18next';
import i18n from '@app/infra/i18nBackend';
import { boostrapNetProxy } from '@app/infra/netSystem/hijack';

// Start the mocking conditionally.
// if (process.env.NODE_ENV === 'development') {
//     const { worker } = require('./mocks/browser')
//     worker.start()
// }

setI18n(i18n as any);

export default function boostrap() {
    boostrapNetProxy();
    ReactDOM.render(
        <StrictMode>
            <App />
        </StrictMode>,
        document.querySelector('#main-application'),
    );
}
