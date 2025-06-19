@parallel @multi_user @regression
Feature: SauceDemo Multi-User Testing

  @sequential_checkout @parallel_users
  Scenario: Sequential user checkout process
    Given logs in as "standard" account type and adds items to cart:
      | item                     |
      | Sauce Labs Backpack     |
      | Sauce Labs Bike Light   |
    And user "standard" account completes checkout with:
      | firstName | lastName | postalCode |
      | John      | Doe      | 12345      |
    When user "visual" account logs in and adds items to cart:
      | item                        |
      | Sauce Labs Fleece Jacket   |
      | Sauce Labs Onesie          |
    And user "visual" account completes checkout with:
      | firstName | lastName | postalCode |
      | Jane      | Smith    | 67890      |
    Then both users should have empty carts when they log back in

  @inventory_sync @parallel_users
  Scenario: Items remain available after purchase by another user
    Given logs in as "standard" account type and adds items to cart:
      | item                    |
      | Sauce Labs Backpack     |
    When user "standard" account completes the purchase
    And user "visual" account logs in to the inventory page
    Then "Sauce Labs Backpack" should still be available for purchase