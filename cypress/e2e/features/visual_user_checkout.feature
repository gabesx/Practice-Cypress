Feature: Visual User Checkout Flow

  Scenario: Visual user completes checkout process
    Given "visual_user" logs in and adds items to cart:
      | item                        |
      | Sauce Labs Fleece Jacket   |
      | Sauce Labs Onesie          |
    When "visual_user" completes checkout with:
      | firstName | lastName | postalCode |
      | Jane      | Smith    | 67890      |
    Then the cart should be empty after login
    And the order confirmation should be visible 