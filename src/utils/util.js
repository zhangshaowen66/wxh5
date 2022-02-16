export default {
	//TOKEN
	getToken: () => {
		return localStorage.getItem('__WBSJF__ADMIN__GLOBAL__TOKEN');
	},
	setToken: (token) => {
		localStorage.setItem('__WBSJF__ADMIN__GLOBAL__TOKEN', token);
	},
	removeToken: () => {
		localStorage.removeItem('__WBSJF__ADMIN__GLOBAL__TOKEN');
	},

	//accountName
	getAccountName: () => {
		return localStorage.getItem('userName');
	},
	setAccountName: (accountName) => {
		localStorage.setItem('userName', accountName);
	},
	removeAccountName: () => {
		localStorage.removeItem('__WBSJF__ADMIN__GLOBAL__ACCOUNTNAME');
	},

	//user
	getUser: () => {
		return JSON.parse(localStorage.getItem('__WBSJF__ADMIN__GLOBAL__USER'));
	},
	setUser: (user) => {
		localStorage.setItem('__WBSJF__ADMIN__GLOBAL__USER', JSON.stringify(user));
	},
	removeUser: () => {
		localStorage.removeItem('__WBSJF__ADMIN__GLOBAL__USER');
	},

	//tabActive
	getTabActive: () => {
		return sessionStorage.getItem('__WBSJF__ADMIN__GLOBAL__TABACTIVE');
	},
	setTabActive: (active) => {
		sessionStorage.setItem('__WBSJF__ADMIN__GLOBAL__TABACTIVE', active);
	},
	removeTabActive: () => {
		sessionStorage.removeItem('__WBSJF__ADMIN__GLOBAL__TABACTIVE');
	},
}
