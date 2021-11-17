const fleekStorage = require('@fleekhq/fleek-storage-js')

let FleekUtils = {

  // 存储数据
  saveDataToIpfs: async (fileData) => {
    try {
      const input = {
        apiKey: 'QqRl5/VUtErkWTUblsOQrQ==',
        apiSecret: 'yPr1XzEXj5U+ofbL9a5x3iNk51UrDVYriJW2pqU20mQ=',
        key: `my-file-key/${fileData?.name}`,
        data: fileData,
        httpUploadProgressCallback: (event) => {
          console.log(Math.round(event.loaded/event.total*100)+ '% done');
        }
      };
      const result = await fleekStorage.upload(input);
      return result
    } catch (err) {
      console.log(err);
    }
  },

  // 列出文件列表
  listFiles: async () => {
    const files = await fleekStorage.listFiles({
      apiKey: 'QqRl5/VUtErkWTUblsOQrQ==',
      apiSecret: 'yPr1XzEXj5U+ofbL9a5x3iNk51UrDVYriJW2pqU20mQ=',
      getOptions: ['bucket', 'key', 'hash', 'publicUrl'],
    })
    console.log(files);
  }

}

export default FleekUtils;