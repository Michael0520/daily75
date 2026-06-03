## ADDED Requirements

### Requirement: Recommend a daily problem

The system SHALL deterministically select one unsolved problem as the "Today's Problem" based on the current date.

#### Scenario: Daily problem shown on load

- **WHEN** the user opens the app
- **THEN** a "Today's Problem" banner or button shows the recommended problem for today

#### Scenario: Same problem for same day

- **WHEN** the user opens the app multiple times on the same day
- **THEN** the same problem is recommended each time

#### Scenario: New problem each day

- **WHEN** the date changes (new day)
- **THEN** a different unsolved problem is recommended

#### Scenario: All problems solved

- **WHEN** the user has solved all 75 problems
- **THEN** the daily problem cycles through all problems (including solved ones)

### Requirement: Navigate to daily problem

The system SHALL allow the user to click the daily problem recommendation to load it.

#### Scenario: Click daily problem

- **WHEN** the user clicks the "Today's Problem" banner
- **THEN** the problem is loaded in the main view (problem description + editor)
