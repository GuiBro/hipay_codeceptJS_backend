Feature: API Order Validation
  As a QA Analyst
  I want to verify the Order API behavior
  To ensure payments are correctly processed or rejected

  @success
  Scenario Outline: Create a payment request with mandatory informations
    Given I have a payment data with price <price> and product "<product>"
    When I send a POST request to create an order
    Then the response status code should be 200
    # Then the response status code should be 401
    Then the response should match with expected order details

    Examples:
        | price | product |
        | 1.99  | Potatoes |
        | 600  | PS5  |

  @error_badrequest
  Scenario: Try to create an order with missing order_id
    Given I have payment data without an order_id
    When I send a POST request to create an order
    Then the response status code should be 400
    # Then the response status code should be 401

  @security_notauthenticated
  Scenario: Try to create an order without authentication
    Given I have valid mandatory payment data
    And I am not authenticated
    When I send a POST request to create an order
    Then the response status code should be 401