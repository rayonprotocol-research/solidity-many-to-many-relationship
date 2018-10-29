module.exports = {
	migrations_directory: "./migrations",
	networks: {
		development: {
			host: "localhost",
			port: 8545,
			network_id: "*" // Match any network id
		},
		klaytn: {
			host: '192.168.3.102',
			port: 8551,
			network_id: '1000', // Aspen network id
			gas: 20000000, // transaction gas limit
			gasPrice: 25000000000, // gasPrice of Aspen is 25 Gpeb
		}
	}
};
