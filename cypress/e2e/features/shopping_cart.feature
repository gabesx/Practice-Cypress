Feature: Shopping Cart Functionality
  As a standard user of Swag Labs
  I want to add items to cart and complete checkout
  So that I can purchase products successfully

  Background:
    Given I am on the Sauce Demo login page
    When I enter username "standard_user"
    And I enter password "secret_sauce"
    And I click the login button
    Then I should be logged in successfully

  @shopping @regression
  Scenario: Purchase Backpack and T-Shirt
    When I add the following items to cart:
      | item                      | price  |
      | Sauce Labs Backpack      | $29.99 |
      | Sauce Labs Bolt T-Shirt  | $15.99 |
    Then the shopping cart badge should show "2"
    When I click on shopping cart
    Then I should see the following items in cart:
      | item                      | price  |
      | Sauce Labs Backpack      | $29.99 |
      | Sauce Labs Bolt T-Shirt  | $15.99 |
    And the total price should be "$45.98"
    When I proceed to checkout
    And I fill in the following information:
      | firstName | lastName | postalCode |
      | John      | Doe      | 12345      |
    And I click continue
    Then I should see the checkout overview
    And the total amount should match cart total
    When I click finish
    Then I should see the order confirmation message

  @shopping @regression
  Scenario: Purchase Backpack and Fleece Jacket
    When I add the following items to cart:
      | item                       | price  |
      | Sauce Labs Backpack       | $29.99 |
      | Sauce Labs Fleece Jacket  | $49.99 |
    Then the shopping cart badge should show "2"
    When I click on shopping cart
    Then I should see the following items in cart:
      | item                       | price  |
      | Sauce Labs Backpack       | $29.99 |
      | Sauce Labs Fleece Jacket  | $49.99 |
    And the total price should be "$79.98"
    When I proceed to checkout
    And I fill in the following information:
      | firstName | lastName | postalCode |
      | Jane      | Smith    | 67890      |
    And I click continue
    Then I should see the checkout overview
    And the total amount should match cart total
    When I click finish
    Then I should see the order confirmation message 