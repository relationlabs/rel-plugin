import { ethers, Wallet, utils } from "ethers";
import { PrivateKey, ContractAddress, RelationFactoryContractAddress } from '../constants/index.js';
import relationFactoryContractABI from '../utils/contracts/releationFactoryContract.js';
import addressListContractABI from '../utils/contracts/addressListContract.js';

let ContractsUtils = {

  // 生成一个infuraProvider实例
  getEthersProvider:() => {
    return new ethers.providers.JsonRpcProvider("https://rinkeby.infura.io/v3/118060a28fc04ba3abff5aa8530ce0e9");
  },

  // wallet实例方式1 - 创建一个随机
  getRandomWallet:() => {
    let wallet = ethers.Wallet.createRandom();
    return wallet.connect(ContractsUtils.getEthersProvider());
  },

  // wallet实例方式2 - 通过【privateKey】导入
  getPrivateKeyWallet:(privateKey) => {
    let wallet = new ethers.Wallet(privateKey);
    return wallet.connect(ContractsUtils.getEthersProvider());
  },

  // wallet实例方式3 - 通过【keyStore + 密码】导入
  getKeyStoreWallet:(data, password) => {
    ethers.Wallet.fromEncryptedJson(JSON.stringify(data), password).then(function(wallet) {
      return wallet.connect(ContractsUtils.getEthersProvider());
    });
  },

  // wallet实例方式4 - 通过【助记词】导入
  getMnemonicWallet:(mnemonic) => {
    let wallet = ethers.Wallet.fromMnemonic(mnemonic);
    return wallet.connect(ContractsUtils.getEthersProvider());
  },

  // rpcCatch统一方法
  rpcCatch: (err) => {
    if (err.code === 4001) {
      console.log('Please connect to Samurai.');
    } else {
      console.error(err);
    }
  },

  //合约方法 - 1.创建relationContract对象
  createRelationContract: () => {
    let wallet = ContractsUtils.getPrivateKeyWallet(PrivateKey);
    var relationContract = new ethers.Contract(RelationFactoryContractAddress, relationFactoryContractABI, wallet);
    return relationContract;
  },

  //合约方法 - 2.获取当前用户的好友合约地址
  getRelationAddress: async() => {
    let wallet = ContractsUtils.getPrivateKeyWallet(PrivateKey);
    var relationContract = ContractsUtils.createRelationContract();
    let relationAddress = await relationContract.getAddressListContract(wallet.address);
    if (relationAddress == undefined || relationAddress == null || relationAddress == "0x0000000000000000000000000000000000000000") {
      await relationContract.createAddressListContract(wallet.address)
      relationAddress = await relationContract.getAddressListContract(wallet.address);
    }
    console.log("当前用户的好友合约 地址：" + relationAddress);
    return relationAddress;
  },

  //合约方法 - 3.获取addressListContract对象
  createAddressListContract: async() => {
    let wallet = ContractsUtils.getPrivateKeyWallet(PrivateKey);
    var addressListContract = new ethers.Contract(await ContractsUtils.getRelationAddress(), addressListContractABI, wallet);
    return addressListContract;
  },

  //合约方法 - 4.获取当前用户基本信息
  getUserInfo: async() => {
    var addressListContract = await ContractsUtils.createAddressListContract();
    let ownerNickName = await addressListContract.ownerNickName();
    let ownerAvatar = await addressListContract.ownerAvatar();
    console.log("当前用户的昵称" + ownerNickName + ",当前用户的头像：" + ownerAvatar);
  },

  //合约方法 - 5.添加好友
  addFriend: async() => {
    var addressListContract = await ContractsUtils.createAddressListContract();
    await addressListContract.addFriend(
      "0x8D60FDAfDFe2c8162866880F534932baE29F716f",//好友的地址
      "liuweiguo",//好友备注
      RelationFactoryContractAddress//好友来源，暂时写死
    )
    console.log("添加好友成功");
  },

  //合约方法 - 6.获取当前用户好友列表
  getFriendList: async() => {
    var addressListContract = await ContractsUtils.createAddressListContract();
    let friendInfoSize = await addressListContract.friendSize();
    friendInfoSize = parseInt(friendInfoSize);
    let friendList = [];
    //遍历，获取好友列表
    if (friendInfoSize > 0) {
      for (var i = 1; i <= friendInfoSize; i++) {
        let friendAddress = await addressListContract.indexAddressMap(i);
        let friendInfo = await addressListContract.friendMap(friendAddress);
        friendList.push({
          name: friendInfo.name,
          identity: friendInfo.identity,
          iconUrl: 'https://wepiggy.static.fortop.site/app/static/lowRisk.aa37608b.gif',
        })
      }
    }
    // console.log(friendList);
    return friendList
  },

  //合约方法 - 7.向好友发送消息
  sendMessage: async() => {
    var addressListContract = await ContractsUtils.createAddressListContract();
    addressListContract.sendMessage("0x8D60FDAfDFe2c8162866880F534932baE29F716f", "https://ivg37-qiaaa-aaaab-aaaga-cai.ic0.app/#!/game/lwg/.zbb")
    .then((value) => {
      console.log("您的消息已发送！！！")
      console.log(value)
    })
  },

  //合约方法 - 9.监听自己收到的消息
  listenMessage: async() => {
    console.log("合约方法 - 9.监听自己收到的消息");
    var addressListContract = await ContractsUtils.createAddressListContract();
    addressListContract.on('GetMessage', (from, to, value) => {
      console.log(value);
      console.log('I received ' + value.toString() + ' tokens from ' + from);
    });
  },

  // 合约方法 - 与好友联系
  contactWithMyFriend: async () => {

    //创建wallet对象
    let wallet = ContractsUtils.getPrivateKeyWallet(PrivateKey);
    console.log(wallet);

    //1.创建relationFactoryContract对象
    var relationFactoryContract = new ethers.Contract(RelationFactoryContractAddress, relationFactoryContractABI, wallet);

    //2.如果我的好友合约不存在，则进行创建
    let addressContractAddress = await relationFactoryContract.getAddressListContract(wallet.address);
    if (addressContractAddress == undefined || addressContractAddress == null || addressContractAddress == "0x0000000000000000000000000000000000000000") {
        //创建好友合约
        await relationFactoryContract.createAddressListContract(wallet.address)
        addressContractAddress = await relationFactoryContract.getAddressListContract(wallet.address);
    }
    console.log("当前用户的好友合约地址：" + addressContractAddress);


    //3. 创建addressListContract对象
    var addressListContract = new ethers.Contract(addressContractAddress, addressListContractABI, wallet);
    let ownerNickName = await addressListContract.ownerNickName();
    let ownerAvatar = await addressListContract.ownerAvatar();
    console.log("当前用户的昵称" + ownerNickName + ",当前用户的头像：" + ownerAvatar);

    //4.添加好友
    // await addressListContract.addFriend(
    //     "0x144fa3569c9b4ae7908779deefc9101222a84fa7",//好友的地址
    //     "shadow1",//好友备注
    //     RelationFactoryContractAddress//好友来源，暂时写死
    // )
    // console.log("添加好友成功");

    //5.获取我的好友数
    let friendInfoSize = await addressListContract.friendSize();
    friendInfoSize = parseInt(friendInfoSize);
    console.log(friendInfoSize);
    //遍历，获取好友列表
    if (friendInfoSize > 0) {
        for (var i = 1; i <= friendInfoSize; i++) {
            let friendAddress = await addressListContract.indexAddressMap(i);
            let friendInfo = await addressListContract.friendMap(friendAddress);
            console.log(friendInfo);
            console.log("好友的地址：" + friendInfo.identity + ",好友的名称" + friendInfo.name);
        }
    }

    //6.发送消息
    await addressListContract.sendMessage("0xe999547C0465726828F9953a087EC0A566bD1932", "发送的消息!")
    console.log("您的消息已上链！！！")

    //7.监听用户发送的消息
    // let filter = addressListContract.sendMessage(null, wallet.address);
    addressListContract.on('SendMessage', (from, to, value) => {
      console.log('I received ' + value.toString() + ' tokens from ' + from);
    });
  },
}

export default ContractsUtils;