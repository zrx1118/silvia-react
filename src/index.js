import React from 'react';
import ReactDOM from 'react-dom';
import Route from './router';
import registerServiceWorker from './registerServiceWorker';
import { AppContainer } from 'react-hot-loader';
import {Provider} from 'react-redux';
import store from '@/store/store';
import './utils/setRem';
import './style/base.css';

const render = Component => {
    ReactDOM.render(
        <Provider store={store}>
            <AppContainer>
                <Component />
            </AppContainer>
        </Provider>,
        document.getElementById('root'));
}
render(Route);
// Webpack Hot Module Replacement API
if (module.hot) {
    module.hot.accept('./router', () => {
        render(Route);
    })
}

registerServiceWorker();