const { AccountManagementSystem } = require('./index');

describe('AccountManagementSystem', () => {
    let app;
    let mockRl;

    beforeEach(() => {
        // Mock readline interface
        mockRl = {
            question: jest.fn(),
            close: jest.fn(),
            on: jest.fn(),
            removeAllListeners: jest.fn()
        };

        // Create app instance with mocked readline
        app = new AccountManagementSystem(mockRl);
    });

    afterEach(() => {
        jest.clearAllMocks();
        // Ensure readline is properly closed
        if (app.rl && app.rl.close) {
            app.rl.close();
        }
    });

    describe('TC001 - Verify initial balance display', () => {
        test('should start with initial balance of $1000.00', () => {
            expect(app.balance).toBe(1000.00);
        });

        test('viewBalance should display correct initial balance', () => {
            const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
            app.viewBalance();
            expect(consoleSpy).toHaveBeenCalledWith('Current balance: $1000.00');
            consoleSpy.mockRestore();
        });
    });

    describe('TC002 - Verify credit operation with valid amount', () => {
        test('should credit account with positive amount', async () => {
            const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
            mockRl.question.mockImplementation((query, callback) => {
                if (query.includes('Enter amount:')) {
                    callback('50.00');
                }
            });

            await app.creditAccount();

            expect(app.balance).toBe(1050.00);
            expect(consoleSpy).toHaveBeenCalledWith('Amount credited. New balance: $1050.00');
            consoleSpy.mockRestore();
        });
    });

    describe('TC003 - Verify debit operation with sufficient funds', () => {
        test('should debit account when sufficient funds exist', async () => {
            const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
            mockRl.question.mockImplementation((query, callback) => {
                if (query.includes('Enter amount:')) {
                    callback('200.00');
                }
            });

            await app.debitAccount();

            expect(app.balance).toBe(800.00);
            expect(consoleSpy).toHaveBeenCalledWith('Amount debited. New balance: $800.00');
            consoleSpy.mockRestore();
        });
    });

    describe('TC004 - Verify debit operation with insufficient funds', () => {
        test('should reject debit when insufficient funds', async () => {
            const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
            mockRl.question.mockImplementation((query, callback) => {
                if (query.includes('Enter amount:')) {
                    callback('1500.00');
                }
            });

            await app.debitAccount();

            expect(app.balance).toBe(1000.00); // Balance should remain unchanged
            expect(consoleSpy).toHaveBeenCalledWith('Insufficient funds for this debit.');
            consoleSpy.mockRestore();
        });
    });

    describe('TC005 - Verify multiple sequential operations', () => {
        test('should handle multiple operations correctly', async () => {
            const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

            // Credit +100
            mockRl.question.mockImplementationOnce((query, callback) => {
                if (query.includes('Enter amount:')) callback('100.00');
            });
            await app.creditAccount();
            expect(app.balance).toBe(1100.00);

            // Debit -50
            mockRl.question.mockImplementationOnce((query, callback) => {
                if (query.includes('Enter amount:')) callback('50.00');
            });
            await app.debitAccount();
            expect(app.balance).toBe(1050.00);

            // Credit +25
            mockRl.question.mockImplementationOnce((query, callback) => {
                if (query.includes('Enter amount:')) callback('25.00');
            });
            await app.creditAccount();
            expect(app.balance).toBe(1075.00);

            consoleSpy.mockRestore();
        });
    });

    describe('TC006 - Verify balance persistence across operations', () => {
        test('should maintain balance across multiple view operations', () => {
            const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

            app.viewBalance();
            expect(consoleSpy).toHaveBeenCalledWith('Current balance: $1000.00');

            app.balance = 1200.00; // Simulate operation
            app.viewBalance();
            expect(consoleSpy).toHaveBeenCalledWith('Current balance: $1200.00');

            consoleSpy.mockRestore();
        });
    });

    describe('TC007 - Verify credit operation with zero amount', () => {
        test('should reject zero credit amount', async () => {
            const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
            mockRl.question.mockImplementation((query, callback) => {
                if (query.includes('Enter amount:')) {
                    callback('0.00');
                }
            });

            await app.creditAccount();

            expect(app.balance).toBe(1000.00); // Balance should remain unchanged
            expect(consoleSpy).toHaveBeenCalledWith('Invalid amount. Please enter a positive number.');
            consoleSpy.mockRestore();
        });
    });

    describe('TC008 - Verify credit operation with negative amount', () => {
        test('should reject negative credit amount', async () => {
            const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
            mockRl.question.mockImplementation((query, callback) => {
                if (query.includes('Enter amount:')) {
                    callback('-50.00');
                }
            });

            await app.creditAccount();

            expect(app.balance).toBe(1000.00); // Balance should remain unchanged
            expect(consoleSpy).toHaveBeenCalledWith('Invalid amount. Please enter a positive number.');
            consoleSpy.mockRestore();
        });
    });

    describe('TC009 - Verify debit operation with zero amount', () => {
        test('should reject zero debit amount', async () => {
            const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
            mockRl.question.mockImplementation((query, callback) => {
                if (query.includes('Enter amount:')) {
                    callback('0.00');
                }
            });

            await app.debitAccount();

            expect(app.balance).toBe(1000.00); // Balance should remain unchanged
            expect(consoleSpy).toHaveBeenCalledWith('Invalid amount. Please enter a positive number.');
            consoleSpy.mockRestore();
        });
    });

    describe('TC010 - Verify debit operation with negative amount', () => {
        test('should reject negative debit amount', async () => {
            const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
            mockRl.question.mockImplementation((query, callback) => {
                if (query.includes('Enter amount:')) {
                    callback('-50.00');
                }
            });

            await app.debitAccount();

            expect(app.balance).toBe(1000.00); // Balance should remain unchanged
            expect(consoleSpy).toHaveBeenCalledWith('Invalid amount. Please enter a positive number.');
            consoleSpy.mockRestore();
        });
    });

    describe('TC011 - Verify application exit functionality', () => {
        test('should exit application when choice 4 is selected', async () => {
            const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

            await app.processChoice(4);

            expect(app.continueFlag).toBe(false);
            expect(consoleSpy).toHaveBeenCalledWith('Exiting the program. Goodbye!');
            expect(mockRl.close).toHaveBeenCalled();
            consoleSpy.mockRestore();
        });
    });

    describe('TC012 - Verify menu display and navigation', () => {
        test('should display menu correctly', () => {
            const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

            app.displayMenu();

            expect(consoleSpy).toHaveBeenCalledWith('--------------------------------');
            expect(consoleSpy).toHaveBeenCalledWith('Account Management System');
            expect(consoleSpy).toHaveBeenCalledWith('1. View Balance');
            expect(consoleSpy).toHaveBeenCalledWith('2. Credit Account');
            expect(consoleSpy).toHaveBeenCalledWith('3. Debit Account');
            expect(consoleSpy).toHaveBeenCalledWith('4. Exit');
            consoleSpy.mockRestore();
        });

        test('should handle invalid menu choice', async () => {
            const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

            await app.processChoice(5);

            expect(consoleSpy).toHaveBeenCalledWith('Invalid choice, please select 1-4.');
            consoleSpy.mockRestore();
        });
    });

    // Additional helper method tests
    describe('getUserChoice', () => {
        test('should parse user choice correctly', async () => {
            mockRl.question.mockImplementation((query, callback) => {
                callback('2');
            });

            const choice = await app.getUserChoice();
            expect(choice).toBe(2);
        });
    });

    describe('getAmount', () => {
        test('should parse amount correctly', async () => {
            mockRl.question.mockImplementation((query, callback) => {
                callback('123.45');
            });

            const amount = await app.getAmount();
            expect(amount).toBe(123.45);
        });
    });
});