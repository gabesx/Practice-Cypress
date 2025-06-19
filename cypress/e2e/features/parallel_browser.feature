Feature: SauceDemo Multi-User Testing

  Scenario: Sequential user checkout process
    Given "standard_user" logs in and adds items to cart:
      | item                     |
      | Sauce Labs Backpack     |
      | Sauce Labs Bike Light   |
    And "standard_user" completes checkout with:
      | firstName | lastName | postalCode |
      | John      | Doe      | 12345      |
    When "visual_user" logs in and adds items to cart:
      | item                        |
      | Sauce Labs Fleece Jacket   |
      | Sauce Labs Onesie          |
    And "visual_user" completes checkout with:
      | firstName | lastName | postalCode |
      | Jane      | Smith    | 67890      |
    Then both users should have empty carts when they log back in

  Scenario: Inventory updates affect all users
    Given "standard_user" logs in and adds "Sauce Labs Backpack" to cart
    When "standard_user" completes the purchase
    And "visual_user" logs in to the inventory page
    Then "Sauce Labs Backpack" should show reduced inventory