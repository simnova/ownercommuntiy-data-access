Feature: Creating a Reggie

Scenario: Create a property and community
  Given ReggieTheOwner creates a community called LegoWorld
  And ReggieTheOwner creates a property called LegoVillage in LegoWorld
  Then the property LegoVillage created by ReggieTheOwner exist in the community LegoWorld
