## ADDED Requirements

### Requirement: Execute JavaScript/TypeScript code

The system SHALL execute JavaScript and TypeScript code in a sandboxed Web Worker and compare output to expected test cases.

#### Scenario: All tests pass

- **WHEN** the user clicks "Run Tests" with valid JS/TS code
- **THEN** the system executes the code against all test cases
- **THEN** displays "X/X passed" with green indicators for each passed test

#### Scenario: Some tests fail

- **WHEN** the user's code returns incorrect output for one or more test cases
- **THEN** the system shows the failing test inputs, expected output, and actual output

#### Scenario: Execution timeout

- **WHEN** user code runs longer than 5 seconds (e.g., infinite loop)
- **THEN** the Worker is terminated and an error message "Time Limit Exceeded (5s)" is shown

### Requirement: Execute Python code

The system SHALL execute Python code using Pyodide (WebAssembly Python) in the browser.

#### Scenario: Pyodide first load

- **WHEN** the user runs Python code for the first time in a session
- **THEN** the system shows a loading indicator while Pyodide initializes (~10MB)
- **THEN** executes the code once loaded and displays results

#### Scenario: Python execution

- **WHEN** Pyodide is loaded and user clicks "Run Tests" with Python code
- **THEN** code executes and results are shown within 5 seconds

#### Scenario: Python timeout

- **WHEN** Python code runs longer than 5 seconds
- **THEN** execution is aborted and "Time Limit Exceeded (5s)" is shown

### Requirement: Test result display

The system SHALL display test results clearly after code execution.

#### Scenario: Results display

- **WHEN** execution completes
- **THEN** each test case shows: input, expected output, actual output, and pass/fail status

### Requirement: Runtime error handling

The system SHALL catch and display runtime errors from user code without crashing the application.

#### Scenario: Syntax or runtime error

- **WHEN** user code throws an exception
- **THEN** the error message and stack trace (if available) are shown in the results panel
