## ADDED Requirements

### Requirement: Display Blind 75 problem list

The system SHALL display all 75 problems from the Blind 75 list in a sidebar, showing title, difficulty badge (Easy/Medium/Hard), and completion status (unsolved/attempted/solved).

#### Scenario: Default list view

- **WHEN** the user opens the app
- **THEN** the sidebar shows all 75 problems sorted by topic group

#### Scenario: Completion status indicator

- **WHEN** a problem has been solved
- **THEN** the problem row displays a green checkmark

### Requirement: Filter problems by topic

The system SHALL allow filtering problems by topic (e.g., Array, Tree, Dynamic Programming, Graph, etc.).

#### Scenario: Filter by topic

- **WHEN** the user selects a topic from the filter dropdown
- **THEN** only problems belonging to that topic are shown in the list

#### Scenario: Clear topic filter

- **WHEN** the user selects "All Topics"
- **THEN** all 75 problems are shown

### Requirement: Filter problems by difficulty

The system SHALL allow filtering problems by difficulty level: Easy, Medium, Hard.

#### Scenario: Filter by difficulty

- **WHEN** the user selects a difficulty level
- **THEN** only problems of that difficulty are shown

### Requirement: Select a problem

The system SHALL allow the user to click a problem to load it in the main view.

#### Scenario: Problem selection

- **WHEN** the user clicks a problem in the list
- **THEN** the problem description and code editor load for that problem
