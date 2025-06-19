@checkout @visual_user @regression
Feature: Visual User Checkout Flow

  @visual_checkout @smoke
  Scenario: Visual user completes checkout process
    Given logs in as "visual" account type and adds items to cart:
      | item                        |
      | Sauce Labs Fleece Jacket   |
      | Sauce Labs Onesie          |
    When user "visual" account completes checkout with:
      | firstName | lastName | postalCode |
      | Jane      | Smith    | 67890      |
    Then the cart should be empty
    And the order confirmation should be visible 