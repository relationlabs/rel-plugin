let openinfoContract = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "UserInfoMap",
		"outputs": [
			{
				"internalType": "string",
				"name": "ownerNickName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "ownerAvatar",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_ownerNickName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_ownerAvatar",
				"type": "string"
			}
		],
		"name": "addOpenInfo",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_ownerNickName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_ownerAvatar",
				"type": "string"
			}
		],
		"name": "changeOpenInfo",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "userList",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "userSize",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

export default openinfoContract;