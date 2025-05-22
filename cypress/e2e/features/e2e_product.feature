@createProducttest
Feature: Wholesale Discount view for different roles

Scenario: Admin creates a fixed wholesale discount product
  Given I am on the login page
  And I log in as "administrator" to Wholesale Test Site
  And I should be logged in successfully
  And I go to the products admin page
  When Admin fills in the product baseline with name "Fixed Wholesale Discount", regular price "100000", and sale price "70000"
  And Admin sets "fixed" wholesale discount to "60000"
  And Admin publishes the product
  And I log out

Scenario Outline: Check Fixed Wholesale Discount for each role
  And I am on the login page
  And I log in as "<role>" to Wholesale Test Site
  And I visit the saved product page
  Then I should see the product prices: regular "100000", sale "70000" and wholesale value "<wholesale_price>"
  And I log out

  Examples:
    | role               | wholesale_price      |
    | wholesale customer | 60000               | 
    | shop manager       | no wholesale price  | 
    | customer           | no wholesale price  | 
    | subscriber         | no wholesale price  | 
    | contributor        | no wholesale price  | 
    | author             | no wholesale price  | 
    | editor             | no wholesale price  | 
    | administrator      | no wholesale price  | 

@createProducttest
Scenario: Admin creates a percentage wholesale discount product
  Given I am on the login page
  And I log in as "administrator" to Wholesale Test Site
  And I should be logged in successfully
  And I go to the products admin page
  When Admin fills in the product baseline with name "Wholesale Percentage Discount2", regular price "100000", and sale price "70000"
  And Admin sets "percentage" wholesale discount to "40"
  Then Admin publishes the product
  And I log out

Scenario Outline: Check percentage Wholesale Discount for each role
  Given I am on the login page
  And I log in as "<role>" to Wholesale Test Site
  And clear the cart via API
  And navigate to cart page
  When I visit the saved product page
  And I should see the product prices: regular "100000", sale "70000" and wholesale value "<wholesale_price>"
  And I add the product to the cart
  And navigate to cart page
  Then I should see the cart price as "<wholesale_price>", regular "100000", sale "70000"
  And I log out

  Examples:
    | role               | wholesale_price      |
    | wholesale customer | 40%                  | 
    | shop manager       | no wholesale price   | 
    | customer           | no wholesale price   | 
    | subscriber         | no wholesale price   | 
    | contributor        | no wholesale price   | 
    | author             | no wholesale price   | 
    | editor             | no wholesale price   | 
    | administrator      | no wholesale price   | 
