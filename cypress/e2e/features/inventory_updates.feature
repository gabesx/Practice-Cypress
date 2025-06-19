Feature: Inventory Update Verification

  Scenario: Inventory updates are reflected across sessions
    Given "standard_user" logs in and adds "Sauce Labs Backpack" to cart
    When "standard_user" completes the purchase
    And "visual_user" logs in to the inventory page
    Then "Sauce Labs Backpack" should show reduced inventory 