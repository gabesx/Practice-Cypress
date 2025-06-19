Feature: Product Sorting Functionality
  As a standard user of Swag Labs
  I want to sort products in different ways
  So that I can find items easily

  Background:
    Given I am on the Sauce Demo login page
    When I enter username "standard_user"
    And I enter password "secret_sauce"
    And I click the login button
    Then I should be logged in successfully

  @sorting @regression
  Scenario: Sort products by Name (A to Z)
    When I select sorting option "Name (A to Z)"
    Then products should be sorted alphabetically ascending
    And the first product should be "Sauce Labs Backpack"
    And the last product should be "Test.allTheThings() T-Shirt (Red)"

  @sorting @regression
  Scenario: Sort products by Name (Z to A)
    When I select sorting option "Name (Z to A)"
    Then products should be sorted alphabetically descending
    And the first product should be "Test.allTheThings() T-Shirt (Red)"
    And the last product should be "Sauce Labs Backpack"

  @sorting @regression
  Scenario: Sort products by Price (Low to High)
    When I select sorting option "Price (low to high)"
    Then products should be sorted by price ascending
    And the first product should cost "$7.99"
    And the last product should cost "$49.99"

  @sorting @regression
  Scenario: Sort products by Price (High to Low)
    When I select sorting option "Price (high to low)"
    Then products should be sorted by price descending
    And the first product should cost "$49.99"
    And the last product should cost "$7.99" 