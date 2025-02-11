// Entry Point for client
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';

ReactDOM.render(
	<Provider store={store}>
		<div>Hello World!!</div>
	</Provider>,
	document.getElementById('app')
);
