Feature: Video Site Project
  As Product Owner I want to surf on our video site project
  @work
  Scenario: User should see some videos on main page
    Given Empty ToDo list
    When I write "buy some milk" to text-box and click to add-button
    Then I should see "buy some milk" item in ToDo list