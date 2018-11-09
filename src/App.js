import React from 'react';
import connect from '@vkontakte/vkui-connect';
import { View } from '@vkontakte/vkui';
import Home from './Panels/Home';
import '@vkontakte/vkui/dist/vkui.css';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			activePanel: 'home',
			fetchedUser: null,
		};
	}

	componentDidMount() {
		connect.subscribe((e) => {
			if (e.detail.hasOwnProperty('type')) {
				switch (e.detail.type) {
					case 'VKWebAppGetUserInfoResult':
						this.setState({ fetchedUser: e.detail.data });
						break;
					default:
						break;
				}
			}
		});
		connect.send('VKWebAppGetUserInfo', {});
	}

	render() {
		return (
			<View activePanel={this.state.activePanel}>
				<Home id="home" user={this.state.fetchedUser} />
			</View>
		);
	}
}

export default App;
