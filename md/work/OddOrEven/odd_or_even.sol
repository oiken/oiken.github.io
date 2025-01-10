// SPDX-License-Identifier: MIT
pragma solidity >= 0.8.25 < 0.9.0;

/// 买单双的游戏
contract OddOrEven {
	string public constant Version = "0.1.0"; // 本合约的版本号，每次修改都必须修改这里，再部署

	struct Gamble {				// 赌局
		uint id;				// 在 gambleArray 中的序号
		address starter;		// 开局钱包
		uint bet;				// 赌注金额
		uint betAmount;			// 总投注额，开盘后会分配给赢家，或开盘鱼鳍后会分配给对赌钱包
		bytes32 keccak256Result;	// 单双值 和 密码 的哈希值
		bool isOdd;				// 单双值
		string secret;			// 密码
		uint betEnd;			// 赌局截止时间戳，过期不能赌，可领回赌注
		uint revealEnd;			// 开盘截止时间戳，过期未开盘，赌注将归对赌钱包
		address againster;		// 对赌钱包
		bool isOddAgainst;		// 对赌的单双值 
	} 

	Gamble[] gambleArray;		// 所有的赌局，只会增加，不会删除
	mapping (address => uint[]) myGambleIndexArray;         // 每个人参与的赌局的index

  	event GambleStarted(uint indexOfGamble, address starter, uint bet);				// 赌局新开
  	event GambleAgainsted(uint indexOfGamble, address starter, uint betAmount, address againster, bool isOdd);	// 有人来对赌
  	event GambleRevealed(uint indexOfGamble, address winner, uint betAmount);		// 开盘了
  	event GambleWithdrawed(uint indexOfGamble, address winner, uint betAmount);		// 赌注被领走

	constructor() {}

	function getVersion() pure external returns (string memory) {
		return Version; 
	}

	// 倒序获取 gambleArray 的 count 个 gambles
	function getLatestGambles(uint count) view external returns (Gamble[] memory getGambleArray, uint gamblesAmount) {
		gamblesAmount = gambleArray.length;
		if (gamblesAmount == 0) { // 还没有数据，返回空数组
			getGambleArray = new Gamble[](0);
		 } else {
			// 计算实际返回的赌局数量
			uint actualCount = count;
			if (count > gamblesAmount) {
				actualCount = gamblesAmount;
			}
			// 创建一个固定大小的数组来存储赌局
			getGambleArray = new Gamble[](actualCount);
			// 将赌局复制到新数组中
			uint fromIndex = gamblesAmount - 1;	
			for (uint i = 0; i < actualCount ; i++) { // 不能用 i-- ，因为i是正整数，分分钟会减成负数，导致revert
				getGambleArray[i] = gambleArray[fromIndex - i];
			}
		}
		return (getGambleArray, gamblesAmount);
	}


	// 倒序获取 myGambleIndexArray 的 count 个序号对应的 gambleArray 里的 gambles
	function getMyLatestGambles(address myAddress, uint count) view external returns (Gamble[] memory getGambleArray, uint myGamblesAmount) {
		myGamblesAmount = myGambleIndexArray[myAddress].length;
		if (gambleArray.length == 0 || myGamblesAmount == 0) { // 还没有数据或并没有参加过赌局，就返回空数组
			getGambleArray = new Gamble[](0);
		} else {
			// 计算实际返回的赌局数量
			uint actualCount = count;
			if (count > myGamblesAmount) {
				actualCount = myGamblesAmount;
			}
			// 创建一个固定大小的数组来存储赌局
			getGambleArray = new Gamble[](actualCount);
			uint fromIndex = myGamblesAmount- 1;
			// 将赌局复制到新数组中
			for (uint i = 0; i < actualCount; i++) {
				uint index = myGambleIndexArray[myAddress][fromIndex - i];
				if (index < gambleArray.length) {
					getGambleArray[i] = gambleArray[index];
				}
			}
		}
		return (getGambleArray, myGamblesAmount);
	}

	function batchGetGambles(uint fromIndex, uint count) view external returns (Gamble[] memory getGambleArray, uint gamblesAmount) {
		gamblesAmount = gambleArray.length;
		if (gambleArray.length == 0) { // 还没有数据，返回空数组
			getGambleArray = new Gamble[](0);
			return (getGambleArray, gamblesAmount);
		}
		require(fromIndex < gambleArray.length, "The index of gamble is out of the bounds.");
		// 计算实际返回的赌局数量
		uint actualCount = count;
		if (fromIndex + count > gambleArray.length) {
			actualCount = gambleArray.length - fromIndex;
		}
		// 创建一个固定大小的数组来存储赌局
		getGambleArray = new Gamble[](actualCount);
		// 将赌局复制到新数组中
		for (uint i = 0; i < actualCount; i++) {
			getGambleArray[i] = gambleArray[fromIndex + actualCount - 1 - i];
		}
		return (getGambleArray, gamblesAmount);
	}

	// 注意 fromIndex 是指 myGambleIndexArray 里的第几个，而不是 gambleArray 的第几个
	function batchGetMyGambles(address myAddress, uint fromIndex, uint count) view external returns (Gamble[] memory getGambleArray, uint gamblesAmount) {
		gamblesAmount = myGambleIndexArray[myAddress].length;
		if (gambleArray.length == 0 || myGambleIndexArray[myAddress].length == 0) { // 还没有数据或并没有参加过赌局，就返回空数组
			getGambleArray = new Gamble[](0);
			return (getGambleArray, gamblesAmount);
		}
		require(fromIndex < myGambleIndexArray[myAddress].length, "The index of gamble is out of the bounds.");
		// 计算实际返回的赌局数量
		uint actualCount = count;
		if (fromIndex + count > myGambleIndexArray[myAddress].length) {
			actualCount = myGambleIndexArray[myAddress].length - fromIndex;
		}
		// 创建一个固定大小的数组来存储赌局
		getGambleArray = new Gamble[](actualCount);
		// 将赌局复制到新数组中
		for (uint i = 0; i < actualCount; i++) {
			uint index = myGambleIndexArray[myAddress][fromIndex + actualCount - 1 - i];
			if (index < gambleArray.length) {
				getGambleArray[i] = gambleArray[index];
			}
		}
		return (getGambleArray, gamblesAmount);
	}

	/// 返回：新开局的插入位置，因为不会删除，以便下次快速获取
	function start(bytes32 keccak256Result, uint bettingTime, uint revealTime) 
		external payable 
		returns (uint idOfGamble) 
	{
		require(msg.value > 0, "You should place a bet.");
		idOfGamble = gambleArray.length;
		Gamble memory gamble = Gamble({
			id: idOfGamble,
			starter: msg.sender,
			bet: msg.value,
			betAmount: msg.value,
			keccak256Result: keccak256Result,
			isOdd: false,
			secret: "",
			betEnd: block.timestamp + bettingTime,
			revealEnd: block.timestamp + bettingTime + revealTime,
			againster: address(0),
			isOddAgainst: false
		});
		gambleArray.push(gamble);
		myGambleIndexArray[msg.sender].push(idOfGamble);
		emit GambleStarted(idOfGamble, gamble.starter, gamble.bet);
		return idOfGamble;
	}

	function against(uint idOfGamble, bool isOddAgainst) 
		external payable 
		returns (bool isSuccess)
	{
		require(idOfGamble < gambleArray.length, "The gamble is not exist.");
		Gamble storage gamble = gambleArray[idOfGamble];
		require(gamble.starter != msg.sender, "It's not necessary to against youself.");
		require(gamble.betAmount > 0, "The starter has withdrawed his bet to cancel this gamble.");
		require(block.timestamp < gamble.betEnd, "It is too late to bet on this gamble.");
		require(gamble.againster == address(0), "Some one is already against this gamble.");
		require(msg.value == gamble.bet, "Your bet is not the same as the starter's.");
		gamble.againster = msg.sender;
		gamble.isOddAgainst = isOddAgainst;
		gamble.betAmount += msg.value; // 整个赌注额
		myGambleIndexArray[msg.sender].push(idOfGamble);
		emit GambleAgainsted(idOfGamble, gamble.starter, gamble.betAmount, gamble.againster, isOddAgainst);
		isSuccess = true;
		return isSuccess;
	}

	function getKeccak256(bool isOdd, string calldata secret) 
		public pure 
		returns (bytes32 keccak256Result)
	{
		keccak256Result = keccak256(abi.encodePacked(isOdd, secret));
		return keccak256Result;
	}

	function reveal(uint idOfGamble, bool isOdd, string calldata secret)
		external 
		returns (bool didVerify, bool doesStarterWin)
	{
		require(idOfGamble < gambleArray.length, "The gamble is not exist.");
		Gamble storage gamble = gambleArray[idOfGamble];
		require(gamble.starter == msg.sender, "You can not reveal other's gamble.");
		require(gamble.betAmount > 0, "The amount of bets was claimed, and this gamble is closed.");
		require(gamble.againster != address(0), "No one is against you. You can withdraw your bet back any time.");
		require(block.timestamp < gamble.revealEnd, "It is too late to reveal this gamble. Your bet belongs to the againster now.");
		// 验证成功
		didVerify = getKeccak256(isOdd, secret) == gamble.keccak256Result;
		if (didVerify) {
			gamble.isOdd = isOdd;
			gamble.secret = secret;
			doesStarterWin = gamble.isOdd != gamble.isOddAgainst; // 相同则对赌钱包赢了
			address winner = doesStarterWin ? gamble.starter : gamble.againster;
			emit GambleRevealed(idOfGamble, winner, gamble.betAmount);
		}		
		return (didVerify, doesStarterWin);			
	}

	function withdraw(uint idOfGamble)
		external payable 
		returns (uint betAmount)
	{
		require(idOfGamble < gambleArray.length, "The gamble is not exist.");
		Gamble storage gamble = gambleArray[idOfGamble];
		require(gamble.starter == msg.sender || gamble.againster == msg.sender, "You are not involved in this gamble and can not withdraw.");
		require(gamble.betAmount > 0, "The won bets was already claimed.");
		if (gamble.againster == address(0)) { // 没人对赌的情况
			betAmount = gamble.betAmount;
			gamble.betAmount = 0;
			payable(msg.sender).transfer(betAmount);
			emit GambleWithdrawed(idOfGamble, msg.sender, betAmount);
		} else { // 有人对赌的情况
			bool doesStarterWin = gamble.isOdd != gamble.isOddAgainst; // 相同则对赌钱包赢了
			betAmount = gamble.betAmount;
			gamble.betAmount = 0;
			address winner = doesStarterWin ? gamble.starter : gamble.againster;			
			payable(winner).transfer(betAmount);
			emit GambleWithdrawed(idOfGamble, winner, betAmount);
		}
		return betAmount;
	}
}