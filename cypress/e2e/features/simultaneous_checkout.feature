@parallel @multi_user @regression
Feature: Simultaneous User Checkout Testing

  Background:
    Given two users "standard" and "visual" are authenticated

  @simultaneous_checkout @smoke
  Scenario: Two users complete checkout simultaneously
    Given user "standard" account logs in and adds items to cart:
      | item                     |
      | Sauce Labs Backpack     |
      | Sauce Labs Bike Light   |
    And user "visual" account logs in and adds items to cart:
      | item                        |
      | Sauce Labs Fleece Jacket   |
      | Sauce Labs Onesie          |
    When both users complete their checkouts:
      | user      | firstName | lastName | postalCode |
      | standard  | John      | Doe      | 12345      |
      | visual    | Jane      | Smith    | 67890      |
    Then each user should see their correct order confirmation
    And both users should have empty carts when they log back in 