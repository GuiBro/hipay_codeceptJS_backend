const { I } = inject();

module.exports = {

  endpoint: '/v1/connector/order',
  getMandatoryDataOnly() {
    return {
      "order": {
        "order_id": "ORDER_" + Date.now(),
        "transaction_type": "Debit",
        "price": {
          "amount": 100,
          "currency": "EUR"
        }
      },
      "pos_technical_info": {
        "device_information": {
          "serial_number": "1850320198",
          "manufacturer": "PAX"
        },
        "terminal_transaction_display": {
          "protocol": "AppNepting"
        }
      }
    };
  },

  async sendOrder(data, headers = {}) {
    return await I.sendPostRequest(this.url, data, headers)
  },

  async sendCreatePost(data) {
    return await I.sendPostRequest(this.url, data);
  }
};
