#! /usr/bin/env node

import inquirer from "inquirer";

import chalk from "chalk";




console.log(chalk.rgb(51,255,51)(`\n\n\tWELCOME  TO  FINANCIAL  SOLUTIONS  BANK`));



// Bank account interface

interface BankAccount {

    accountNumber: number;

    balance: number;

    withdraw(amount: number): void;

    DEPOSIT(amount: number): void;

    checkBalance(): void;

}



// Bank account class implementing the interface

class BankAccountImpl implements BankAccount {

    accountNumber: number;

    balance: number;

    constructor(accountNumber: number, balance: number) {

        this.accountNumber = accountNumber;

        this.balance = balance;

    }


    // Debit money

    withdraw(amount: number): void {

        if (this.balance >= amount) {

            this.balance -= amount;

            console.log(chalk.rgb(204,102,0)(`\nWITHDRAWAL OF $${amount} SUCCESSFUL`));

            console.log(chalk.rgb(0,255,128)(`\nYOUR BALANCE IS $${this.balance}`));

        } else {

            console.log(chalk.rgb(255,0,0)("\nINSUFFICIENT BALANCE."));

        }

    }


    // Credit money

    DEPOSIT(amount: number): void {

        if (amount > 100) {

            amount -= 1;

        }

        this.balance += amount;

        console.log(chalk.rgb(0,255,255)(`\nDEPOSIT ${amount} SUCCESSFUL`));

        console.log(chalk.rgb(127,0,255)(`\nREMAINING BALANCE: $${this.balance}`));

    }


    checkBalance(): void {

        console.log(chalk.rgb(255,0,255)(`\nCURRENT BALANCE: $${this.balance}`));

    }

}



// Customer class

class Customer {

    firstName: string;

    lastName: string;

    age: number;

    gender: string;

    mobileNumber: number;

    account: BankAccount;



    constructor(firstName: string, lastName: string, age: number, gender: string, mobileNumber: number, account: BankAccount) {

        this.firstName = firstName;

        this.lastName = lastName;

        this.age = age;

        this.gender = gender;

        this.mobileNumber = mobileNumber;

        this.account = account;

    }

}



// Create bank accounts

let accounts: BankAccount[] = [

    new BankAccountImpl(1001, 5000),

    new BankAccountImpl(1002, 10000),

    new BankAccountImpl(1003, 20000)

];



// Create customers

let customers: Customer[] = [

    new Customer("ABDUL", "REHMAN", 17, "Male", 3452788216, accounts[0]),

    new Customer("ABBAS", "ALI", 47, "Male", 3152644525, accounts[1]),

    new Customer("ZAYYAN", "ZUBAIR", 34, "Male", 3182576017, accounts[2])

];



// Function to interact with bank account

async function service() {

    while (true) {

        let accountNumberInput = await inquirer.prompt([

            {

                name: "accountNumber",

                type: "number",

                message: "\nENTER YOUR ACCOUNT NUMBER"

            }

        ]);



        let customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber);



        if (customer) {

            console.log(chalk.yellow(`\n\tWELCOME , ${customer.firstName} ${customer.lastName}`));



            let service = await inquirer.prompt([

                {

                    name: "service",

                    type: "list",

                    message: "\nSELECT YOUR OPERATION",

                    choices: ["DEPOSIT", "WITHDRAW", "CHECK BALANCE", "EXIT"]

                }

            ]);



            switch (service.service) {

                case "DEPOSIT":

                let DEPOSITAmount = await inquirer.prompt([

                        {

                            name: "amount",

                            type: "number",

                            message: "\nENTER AMOUNT TO DEPOSIT"

                        }

                    ]);

                    customer.account.DEPOSIT(DEPOSITAmount.amount);

                    break;



                    case "WITHDRAW":

                let withdrawAmount = await inquirer.prompt([

                        {

                            name: "amount",

                            type: "number",

                            message: "\nENTER AMOUNT TO WITHDRAW"

                        }

                    ]);

                    customer.account.withdraw(withdrawAmount.amount);

                    break;



                    case "CHECK BALANCE":

                customer.account.checkBalance();

                    break;



                    case "EXIT":

                console.log(chalk.rgb(255,0,0)("\nEXITING BANK PROGRAM..."));

                console.log(chalk.rgb(255,255,153)(`\n\tPRESENTING  BY  ABDUL  REHMAN`));
                

                    return;



                    default:

                console.log(chalk.rgb(255,0,0)("\nINVALID OPTION SELECTED."));

                }

        } else {

            console.log(chalk.rgb(255,0,0)("\nINVALID ACCOUNT NUMBER. PLEASE TRY AGAIN."));

        }

    }

}


service();

