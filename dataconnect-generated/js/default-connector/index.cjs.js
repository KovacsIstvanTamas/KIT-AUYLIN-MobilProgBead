const { getDataConnect, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'KIT-AUYLIN-MobilProgBead',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

