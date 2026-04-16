const { I, orderApiPage } = inject();
let payload = {};
let header = undefined;
let currentExpectations = {};

Given('I have a payment data with price {float} and product {string}', (price, product) => {
  const data = orderApiPage.createOrderData(price, product);
  payload = data.request;
  currentExpectations = data.expect;
})

Given('I have payment data without an order_id', () => {
  const data = orderApiPage.createOrderData();
  payload = data.request;
  delete payload.order.order_id;
  header = {}
});

Given('I have valid mandatory payment data', () => {
  const data = orderApiPage.createOrderData();
  payload = data.request;
});

Given('I am not authenticated', () => {
  header = {'Authorization': ''};
});

When('I send a POST request to create an order', async () => {
  await orderApiPage.sendOrder(payload, header);
});

Then('the response status code should be {int}', (statusCode) => {
  I.seeResponseCodeIs(statusCode);
});

Then('the response should match with expected order details', async () => {
  I.seeResponseContainsJson(currentExpectations);
})