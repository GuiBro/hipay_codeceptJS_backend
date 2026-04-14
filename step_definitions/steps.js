const { I, orderApiPage } = inject();
let payload = {};
let header = undefined;

Given('I have valid mandatory payment data', () => {
  payload = orderApiPage.getMandatoryDataOnly();
});

Given('I have payment data without an order_id', () => {
  payload = orderApiPage.getMandatoryDataOnly();
  delete payload.order.order_id;
});

Given('I am not authenticated', () => {
  header = {'Authorization': ''};
});

When('I send a POST request to create an order', () => {
  orderApiPage.sendOrder(payload, header);
});

Then('the response status code should be {int}', (statusCode) => {
  I.seeResponseCodeIs(statusCode);
});
