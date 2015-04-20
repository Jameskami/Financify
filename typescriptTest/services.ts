/// <reference path="appModule.ts" /> 
/// <referece path="models.ts"/>
/// <reference path="controllers.ts"/>
module Services
{
    export interface IExpenseService
    {
        save(expense: Models.Expense, monthYearConcat: string): void;
        getExpenses(monthYearConcat: string): Array<Models.Expense>;
        getRecurring(): Array<Models.Expense>;
        getAll(monthYearConcat: string): Array<Models.Expense>;
        saveAll(expenses: Array<Models.Expense>, monthYearConcat: string): void;
    }
    export interface IMonthYearService
    {
        getAllMonthYears(): Array<Models.MonthYear>;
        saveMonthYear(monthYear: Models.MonthYear): void;
    }
    export interface IIncomeService
    {
        getIncome(monthYearConcat: string): Models.MonthlyIncome;
        saveIncome(income: Models.MonthlyIncome, monthYearConcat: string): void
    }
    export class LocalExpenseService implements IExpenseService
    {
        recurringExpenses = 'recurringExpenses';
        save(expense: Models.Expense, monthYearConcat: string) : void
        {
            if (expense.isRecurring)
            {
                var recurring = this.getRecurring();
                recurring.push(expense);
                localStorage[this.recurringExpenses] = recurring;
            }
            else
            {
                var expenses = this.getExpenses(monthYearConcat);
                expenses.push(expense);
                localStorage[monthYearConcat] = JSON.stringify(expenses);
            }
            
        }
        getExpenses(monthYearConcat: string): Array<Models.Expense>
        {
            var expenses: Array<Models.Expense> = [];
            if (localStorage[monthYearConcat])
            {
                var arrayOfExpenses = JSON.parse(localStorage[monthYearConcat]);
                for (var i = 0; i < arrayOfExpenses.length; i++)
                {
                    var expense = new Models.Expense();
                    expense.amount = arrayOfExpenses[i].amount;
                    expense.name = arrayOfExpenses[i].name;
                    expense.isRecurring = arrayOfExpenses[i].isRecurring;
                    expenses.push(expense);
                }
            }
            return expenses;
        }
        getRecurring(): Array<Models.Expense>
        {
            var expenses: Array<Models.Expense> = [];
            if (localStorage[this.recurringExpenses])
            {
                var arrayOfExpenses = JSON.parse(localStorage[this.recurringExpenses]);
                for (var i = 0; i < arrayOfExpenses.length; i++)
                {
                    var expense = new Models.Expense();
                    expense.amount = arrayOfExpenses[i].amount;
                    expense.name = arrayOfExpenses[i].name;
                    expense.isRecurring = arrayOfExpenses[i].isRecurring;
                    expenses.push(expense);
                }
            }
            return expenses;
        }
        getAll(monthYearConcat: string): Array<Models.Expense>
        {
            var monthlyExpenses = this.getExpenses(monthYearConcat);
            var recurring = this.getRecurring();
            var all: Array<Models.Expense> = [];
            for (var i = 0; i < monthlyExpenses.length; i++)
            {
                var expense = new Models.Expense();
                expense.amount = monthlyExpenses[i].amount;
                expense.name = monthlyExpenses[i].name;
                expense.isRecurring = monthlyExpenses[i].isRecurring;
                all.push(expense);
            }
            for (var j = 0; j < recurring.length; j++)
            {
                var expense = new Models.Expense();
                expense.amount = recurring[i].amount;
                expense.name = recurring[i].name;
                expense.isRecurring = recurring[i].isRecurring;
                all.push(expense);
            }
            return all;
        }
        saveAll(expenses: Array<Models.Expense>, monthYearConcat: string): void
        {
            localStorage[monthYearConcat] = JSON.stringify(expenses);
        }
    }
    export class MonthYearService implements IMonthYearService
    {
        getAllMonthYears(): Array<Models.MonthYear>
        {
            var monthYears: any;
            var monthYearReturn: Array<Models.MonthYear> = [];
            if (localStorage['monthYears'])
            {
                monthYears = JSON.parse(localStorage['monthYears']);
            }
            if (!monthYears) return monthYearReturn;

            for (var i = 0; i < monthYears.length; i++)
            {
                monthYearReturn[i] = new Models.MonthYear();
                monthYearReturn[i].year = monthYears[i].year;
                monthYearReturn[i].month = monthYears[i].month;
            }
            return monthYearReturn;
        }
        saveMonthYear(monthYear: Models.MonthYear) : void
        {
            var monthYears: Array<Models.MonthYear> = this.getAllMonthYears();
            if (monthYears.filter((my)=> my.year == monthYear.year && my.month == monthYear.month).length > 0) return;
            monthYears ? monthYears.push(monthYear) : monthYears = [monthYear];
            localStorage['monthYears'] = JSON.stringify(monthYears); 
        }
    }
    export class IncomeService implements IIncomeService
    {
        getIncome(monthYearConcat: string): Models.MonthlyIncome
        {
            var income = new Models.MonthlyIncome();
            if (localStorage['income' + monthYearConcat])
            {
                income = JSON.parse(localStorage['income' + monthYearConcat]);
            }
            return income;
        }
        saveIncome(income: Models.MonthlyIncome, monthYearConcat: string): void
        {
            if (income.income)
            {
                localStorage['income' + monthYearConcat] = JSON.stringify(income);
            }
        }
    }
    
    app.service('LocalExpenseService', LocalExpenseService);
    app.service('MonthYearService', MonthYearService);
    app.service('IncomeService', IncomeService);
}