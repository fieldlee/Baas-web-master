const apiUrl = 'http://192.168.0.237:8000';
export default {
  setup: `${apiUrl}/setup/define`,
  getList: `${apiUrl}/setup/list`,
  deploy: `${apiUrl}/setup/deploy`,
  createChannel: `${apiUrl}/setup/channelgen`,
  createChainCode: `${apiUrl}/setup/chaincode`,
  uploadChaincodeUrl: `${apiUrl}/setup/uploadchaincode`
};
