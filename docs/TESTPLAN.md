# COBOL Student Account Management System - Test Plan

This test plan covers the business logic and functionality of the COBOL student account management system. It is designed to validate the application's behavior against business requirements and will serve as the foundation for creating unit and integration tests in the Node.js transformation.

## Business Rules Summary
- Initial account balance: $1,000.00
- Credit operations: Allow any positive amount to be added to the balance
- Debit operations: Only allow if sufficient funds exist (balance >= debit amount)
- Balance persistence: Balance should be maintained across operations within a session

## Test Cases

### TC001 - Verify initial balance display
**Test Case ID:** TC001

**Description:** Validates that the application starts with the correct initial balance.

**Pre-conditions:** Application is compiled and ready to run.

**Test Steps:**
1. Start the application
2. Select option 1 (View Balance)

**Expected Result:** Current balance displays as $1,000.00

**Actual Result:** TBD

**Status:** TBD

**Comments:** Validates initial state of the account

---

### TC002 - Verify credit operation with valid amount
**Test Case ID:** TC002

**Description:** Tests that credit operations work correctly with positive amounts.

**Pre-conditions:** Application is running with initial balance.

**Test Steps:**
1. Select option 2 (Credit Account)
2. Enter a positive amount (e.g., 50.00)
3. Select option 1 to view balance

**Expected Result:** Balance increases by the credited amount (e.g., $1,050.00)

**Actual Result:** TBD

**Status:** TBD

**Comments:** Tests positive credit functionality

---

### TC003 - Verify debit operation with sufficient funds
**Test Case ID:** TC003

**Description:** Tests successful debit when account has enough funds.

**Pre-conditions:** Application is running with balance >= debit amount.

**Test Steps:**
1. Select option 3 (Debit Account)
2. Enter an amount less than or equal to current balance (e.g., 200.00)
3. Select option 1 to view balance

**Expected Result:** Balance decreases by the debited amount (e.g., $800.00 if starting from $1,000.00)

**Actual Result:** TBD

**Status:** TBD

**Comments:** Tests successful debit when funds are available

---

### TC004 - Verify debit operation with insufficient funds
**Test Case ID:** TC004

**Description:** Tests that debit operations are rejected when insufficient funds exist.

**Pre-conditions:** Application is running with balance < debit amount.

**Test Steps:**
1. Select option 3 (Debit Account)
2. Enter an amount greater than current balance (e.g., 1,500.00 when balance is $1,000.00)

**Expected Result:** Operation fails with appropriate error message, balance remains unchanged

**Actual Result:** TBD

**Status:** TBD

**Comments:** Tests business rule preventing overdrafts

---

### TC005 - Verify multiple sequential operations
**Test Case ID:** TC005

**Description:** Tests that multiple operations work correctly in sequence.

**Pre-conditions:** Application is running.

**Test Steps:**
1. Perform credit operation (+100.00)
2. Perform debit operation (-50.00)
3. Perform another credit operation (+25.00)
4. View final balance

**Expected Result:** Balance reflects cumulative effect: initial $1,000.00 + $100.00 - $50.00 + $25.00 = $1,075.00

**Actual Result:** TBD

**Status:** TBD

**Comments:** Tests operation sequencing and balance calculation accuracy

---

### TC006 - Verify balance persistence across operations
**Test Case ID:** TC006

**Description:** Tests that balance changes persist throughout the session.

**Pre-conditions:** Application is running in same session.

**Test Steps:**
1. Perform any operation that changes balance
2. Perform multiple view balance operations
3. Continue with additional operations

**Expected Result:** Balance remains consistent and updated correctly throughout the session

**Actual Result:** TBD

**Status:** TBD

**Comments:** Tests data persistence within application session

---

### TC007 - Verify credit operation with zero amount
**Test Case ID:** TC007

**Description:** Tests edge case of crediting zero amount.

**Pre-conditions:** Application is running.

**Test Steps:**
1. Select option 2 (Credit Account)
2. Enter 0.00 as credit amount
3. View balance

**Expected Result:** Balance remains unchanged (no credit applied)

**Actual Result:** TBD

**Status:** TBD

**Comments:** Tests edge case for zero credit

---

### TC008 - Verify credit operation with negative amount
**Test Case ID:** TC008

**Description:** Tests input validation for negative credit amounts.

**Pre-conditions:** Application is running.

**Test Steps:**
1. Select option 2 (Credit Account)
2. Enter a negative amount (e.g., -50.00)
3. View balance

**Expected Result:** Operation fails or negative amount is rejected, balance unchanged

**Actual Result:** TBD

**Status:** TBD

**Comments:** Tests input validation for credit operations

---

### TC009 - Verify debit operation with zero amount
**Test Case ID:** TC009

**Description:** Tests edge case of debiting zero amount.

**Pre-conditions:** Application is running.

**Test Steps:**
1. Select option 3 (Debit Account)
2. Enter 0.00 as debit amount
3. View balance

**Expected Result:** Balance remains unchanged (no debit applied)

**Actual Result:** TBD

**Status:** TBD

**Comments:** Tests edge case for zero debit

---

### TC010 - Verify debit operation with negative amount
**Test Case ID:** TC010

**Description:** Tests input validation for negative debit amounts.

**Pre-conditions:** Application is running.

**Test Steps:**
1. Select option 3 (Debit Account)
2. Enter a negative amount (e.g., -50.00)
3. View balance

**Expected Result:** Operation fails or negative amount is rejected, balance unchanged

**Actual Result:** TBD

**Status:** TBD

**Comments:** Tests input validation for debit operations

---

### TC011 - Verify application exit functionality
**Test Case ID:** TC011

**Description:** Tests that the application exits properly.

**Pre-conditions:** Application is running.

**Test Steps:**
1. Select option 4 (Exit)

**Expected Result:** Application terminates gracefully without errors

**Actual Result:** TBD

**Status:** TBD

**Comments:** Tests proper application shutdown

---

### TC012 - Verify menu display and navigation
**Test Case ID:** TC012

**Description:** Tests the user interface and menu handling.

**Pre-conditions:** Application is running.

**Test Steps:**
1. Observe main menu display
2. Select invalid menu option (e.g., 5)
3. Verify menu redisplays

**Expected Result:** Menu shows all options clearly, invalid selections are handled gracefully, menu redisplays

**Actual Result:** TBD

**Status:** TBD

**Comments:** Tests user interface and input handling

---

## Test Execution Notes
- All tests should be executed in a clean environment starting from the initial state
- Balance should be reset to $1,000.00 between test sessions if persistence is implemented across runs
- Input validation tests (TC007-TC010) may reveal areas where the COBOL application lacks robust input checking
- The "Actual Result" and "Status" columns should be filled during test execution
- This test plan will be used to create automated tests in the Node.js transformation