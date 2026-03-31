const readline = require('readline');

class AccountManagementSystem {
    constructor(rl = null) {
        this.balance = 1000.00; // Initial balance as per business rules
        this.continueFlag = true;
        this.rl = rl || readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    displayMenu() {
        console.log("--------------------------------");
        console.log("Account Management System");
        console.log("1. View Balance");
        console.log("2. Credit Account");
        console.log("3. Debit Account");
        console.log("4. Exit");
        console.log("--------------------------------");
    }

    async getUserChoice() {
        return new Promise((resolve) => {
            this.rl.question("Enter your choice (1-4): ", (choice) => {
                resolve(parseInt(choice));
            });
        });
    }

    async getAmount() {
        return new Promise((resolve) => {
            this.rl.question("Enter amount: ", (amount) => {
                resolve(parseFloat(amount));
            });
        });
    }

    viewBalance() {
        console.log(`Current balance: $${this.balance.toFixed(2)}`);
    }

    async creditAccount() {
        const amount = await this.getAmount();
        if (amount > 0) {
            this.balance += amount;
            console.log(`Amount credited. New balance: $${this.balance.toFixed(2)}`);
        } else {
            console.log("Invalid amount. Please enter a positive number.");
        }
    }

    async debitAccount() {
        const amount = await this.getAmount();
        if (amount > 0) {
            if (this.balance >= amount) {
                this.balance -= amount;
                console.log(`Amount debited. New balance: $${this.balance.toFixed(2)}`);
            } else {
                console.log("Insufficient funds for this debit.");
            }
        } else {
            console.log("Invalid amount. Please enter a positive number.");
        }
    }

    async processChoice(choice) {
        switch (choice) {
            case 1:
                this.viewBalance();
                break;
            case 2:
                await this.creditAccount();
                break;
            case 3:
                await this.debitAccount();
                break;
            case 4:
                this.continueFlag = false;
                console.log("Exiting the program. Goodbye!");
                this.rl.close();
                break;
            default:
                console.log("Invalid choice, please select 1-4.");
        }
    }

    async run() {
        console.log("Welcome to the Account Management System");

        while (this.continueFlag) {
            this.displayMenu();
            const choice = await this.getUserChoice();
            await this.processChoice(choice);
        }
    }
}

// Only run the application if this file is executed directly (not imported for testing)
if (require.main === module) {
    const app = new AccountManagementSystem();
    app.run().catch(console.error);
}

module.exports = { AccountManagementSystem };