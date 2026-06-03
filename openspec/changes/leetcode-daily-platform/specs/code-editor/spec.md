## ADDED Requirements

### Requirement: Monaco Editor integration

The system SHALL embed Monaco Editor (VS Code editor) as the code editing surface for each problem.

#### Scenario: Editor loads with starter code

- **WHEN** the user selects a problem
- **THEN** Monaco Editor loads pre-filled with the starter code for the selected language

#### Scenario: Syntax highlighting

- **WHEN** the editor displays code
- **THEN** syntax highlighting is applied based on the selected language

### Requirement: Language selection

The system SHALL allow the user to switch between JavaScript, TypeScript, and Python for each problem.

#### Scenario: Switch language

- **WHEN** the user selects a different language from the language toggle
- **THEN** the editor reloads with the starter code for that language
- **THEN** previous code for the original language is preserved in memory for that session

### Requirement: Code persistence per session

The system SHALL preserve the user's code in the editor when switching between problems during a session.

#### Scenario: Return to a problem

- **WHEN** the user navigates away from a problem and returns during the same session
- **THEN** the editor shows the code they last wrote for that problem
