# @cross_browser @regression
# Feature: Cross Browser Functionality Testing

#   @browser_compatibility @smoke
#   Scenario Outline: Website functions correctly across browsers
#     Given I run the test flows on <browser>
#     When logs in as "standard" account type and adds items to cart:
#       | item                     |
#       | Sauce Labs Backpack     |
#       | Sauce Labs Bike Light   |
#     And user "standard" account completes checkout with:
#       | firstName | lastName | postalCode |
#       | John      | Doe      | 12345      |
#     Then the cart should be empty
#     And the order confirmation should be visible
#     And the website should function consistently and correctly on both browsers

#     Examples:
#       | browser |
#       | Chrome  |
#       | Firefox | 