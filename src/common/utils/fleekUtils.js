const fleekStorage = require('@fleekhq/fleek-storage-js')

let FleekUtils = {

  // 存储数据
  saveDataToIpfs: async (data) => {
    try {
      const input = {
        apiKey: 'QqRl5/VUtErkWTUblsOQrQ==',
        apiSecret: 'yPr1XzEXj5U+ofbL9a5x3iNk51UrDVYriJW2pqU20mQ=',
        key: `cr/file`,
        data: data,
      };
      const result = await fleekStorage.upload(input);
      console.log("=============> FleekUtils <=========");
      console.log(result);
    } catch (err) {
      console.log("=============> FleekUtils <=========");
      console.log(err);
    }
  },

}

export default FleekUtils;