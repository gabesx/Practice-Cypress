@checkout @standard_user @regression
Feature: Standard User Checkout Flow

  @standard_checkout @smoke
  Scenario: Standard user completes checkout process
    Given logs in as "standard" account type and adds items to cart:
      | item                     |
      | Sauce Labs Backpack     |
      | Sauce Labs Bike Light   |
    When user "standard" account completes checkout with:
      | firstName | lastName | postalCode |
      | John      | Doe      | 12345      |
    Then the cart should be empty
    And the order confirmation should be visible