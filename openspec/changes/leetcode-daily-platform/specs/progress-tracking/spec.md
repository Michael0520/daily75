## ADDED Requirements

### Requirement: Persist problem status

The system SHALL persist each problem's status (unsolved / attempted / solved) to Supabase.

#### Scenario: Status updates on first run

- **WHEN** the user runs tests for the first time on a problem
- **THEN** the problem status changes from "unsolved" to "attempted" and is saved to Supabase

#### Scenario: Status updates to solved

- **WHEN** all test cases pass for a problem
- **THEN** the problem status changes to "solved" and solved_at timestamp is recorded

#### Scenario: Status persists on reload

- **WHEN** the user reloads the page
- **THEN** all previously solved/attempted problems retain their status from Supabase

### Requirement: Progress summary in header

The system SHALL display a progress summary showing how many of the 75 problems have been solved.

#### Scenario: Progress counter

- **WHEN** the user views the app
- **THEN** the header shows "X / 75 solved"

### Requirement: Record submission history

The system SHALL record each test run as a submission in Supabase.

#### Scenario: Submission recorded

- **WHEN** the user runs tests
- **THEN** a submission record is saved with: problem_id, language, code, passed (boolean), timestamp
