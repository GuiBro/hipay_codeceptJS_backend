Feature: API Order Validation
  As a QA Analyst
  I want to verify the Order API behavior
  To ensure payments are correctly processed or rejected

  @success
  Scenario: Create a payment request with mandatory information
    Given I have valid mandatory payment data
    When I send a POST request to create an order
    Then the response status code should be 200

  @error_badrequest
  Scenario: Try to create an order with missing order_id
    Given I have payment data without an order_id
    When I send a POST request to create an order
    Then the response status code should be 400

  @security_notauthenticated
  Scenario: Try to create an order without authentication
    Given I have valid mandatory payment data
    And I am not authenticated
    When I send a POST request to create an order
    Then the response status code should be 401