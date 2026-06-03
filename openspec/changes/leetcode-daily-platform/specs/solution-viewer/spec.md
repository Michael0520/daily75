## ADDED Requirements

### Requirement: Solution unlock after attempt

The system SHALL allow the user to view the standard solution only after making at least one submission attempt.

#### Scenario: View solution after attempt

- **WHEN** the user has run the tests at least once for a problem
- **THEN** the "View Solution" button becomes enabled

#### Scenario: Solution locked before attempt

- **WHEN** the user has not yet run the tests for a problem
- **THEN** the "View Solution" button is disabled with a tooltip "Submit at least once to unlock"

### Requirement: Display standard solution

The system SHALL display the standard solution code and explanation for the current language.

#### Scenario: View solution

- **WHEN** the user clicks "View Solution"
- **THEN** the solution panel shows the solution code in the currently selected language
- **THEN** a text explanation of the approach and time/space complexity is shown

#### Scenario: Solution language matches editor

- **WHEN** the user switches language in the editor
- **THEN** the solution panel updates to show the solution in the new language
