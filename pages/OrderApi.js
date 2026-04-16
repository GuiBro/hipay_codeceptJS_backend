const { I } = inject();

module.exports = {

  endpoint: '/v1/connector/order',

  createOrderData(customPrice = 100, customProduct = 'My first product') {
    return {
      'request': {
        'order': {
          'order_id': 'ORDER_' + Date.now(),
          'transaction_type': 'Debit',
          'price': {
            'amount': customPrice,
            'currency': 'EUR'
          },
          'basket': [{
            'name': customProduct
          }]
        },
        'pos_technical_info': {
          'device_information': {
            'serial_number': '1850320198',
            'manufacturer': 'PAX'
          },
          'terminal_transaction_display': {
            'protocol': 'AppNepting'
          }
        }
      },
      'expect': {
        'order': {
          'amount': customPrice,
          'product': customProduct
        }
      }
    };
  },

  async sendOrder(data, headers = {}) {
    return await I.sendPostRequest(this.endpoint, data, headers);
  },

  expectedResponseSchema: {
    'paymentStatus': 'Success',
    'errorCode': '10'
  }
};
