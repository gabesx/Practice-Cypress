Feature: Standard User Checkout Flow

  Scenario: Standard user completes checkout process
    Given "standard_user" logs in and adds items to cart:
      | item                     |
      | Sauce Labs Backpack     |
      | Sauce Labs Bike Light   |
    When "standard_user" completes checkout with:
      | firstName | lastName | postalCode |
      | John      | Doe      | 12345      |
    Then the cart should be empty after login
    And the order confirmation should be visible 