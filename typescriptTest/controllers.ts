/// <reference path="scripts/typings/angularjs/angular.d.ts" />
/// <reference path="appModule.ts" /> 
/// <reference path="services.ts" /> 
/// <reference path="scopes.ts" /> 
module Controllers
{
    export interface baseFormController
    {
        saveIncome(): void;
        changeSelectedDate(monthYear: string): void;
        saveEdits(expenses: Array<Models.Expense>): void;
        addRow(): void;
        getUniqueMonths(): Array<string>;
        getUniqueYears(): Array<string>;
        getIncome(): void;
        getTotal(): number;
        getRemaining(): number;
    }
    class FormController implements baseFormController
    {
        _scope: formScope;
        _expenseService: Services.IExpenseService;
        _monthName: Models.Month = new Models.Month();
        _incomeService: Services.IIncomeService
        constructor(
            $scope: formScope,
            expenseService: Services.IExpenseService,
            MonthYearService: Services.IMonthYearService,
            IncomeService: Services.IIncomeService
            )
        {
            this._scope = $scope;
            this._scope.event = this;
            this._expenseService = expenseService;
            this._incomeService = IncomeService;
            
            $scope.currentDate = new Date();
            $scope.monthYear = new Models.MonthYear();
            $scope.expenses = [];
            this.setMonthYearStrings();
            $scope.income = new Models.MonthlyIncome();
            MonthYearService.saveMonthYear($scope.monthYear);
            $scope.allMonthYears = MonthYearService.getAllMonthYears();
            this.setExpenses();
            this.getIncome();
        }
        private setMonthYearStrings() : void
        {
            this._scope.monthYear.month = this._monthName.getMonthName(
                    this._scope.currentDate.getMonth());
            this._scope.monthYear.year =
                    this._scope.currentDate.getFullYear().toString();
        }
        setExpenses() : void
        {
            this._scope.expenses = this._expenseService.getAll(this._scope.monthYear.concat());
        }
        changeSelectedDate(monthYear : string): void
        {
            this._scope.expenses = this._expenseService.getAll(monthYear);
            this._scope.monthYear = this._scope.monthYear.splitAndSet(monthYear);
            this.setExpenses();
            this.getIncome();
        }
        saveEdits(expenses: Array<Models.Expense>): void
        {
            var filteredExpenses = this._scope.expenses.filter((expense) => !expense.isMarkDelete);
            this._expenseService.saveAll(filteredExpenses, this._scope.monthYear.concat());
            this.setExpenses();
        }
        addRow(): void
        {
            var expense = new Models.Expense();
            expense.amount = 0;
            expense.name = "";
            expense.isRecurring = false;
            this._scope.expenses.push(expense);
        }
        getUniqueMonths(): Array<string>
        {
            var uniqueDictionary = {};
            var uniqueMonths = this._scope.allMonthYears.filter(
                (my) => uniqueDictionary.hasOwnProperty(my.month) ? false : (uniqueDictionary[my.month] = true)
                ).map((my) => my.month);
            return uniqueMonths;
        }
        getUniqueYears(): Array<string>
        {
            var uniqueDictionary = {};
            var uniqueYears = this._scope.allMonthYears.filter(
                (my) => uniqueDictionary.hasOwnProperty(my.year) ? false : (uniqueDictionary[my.year] = true)
                ).map((my) => my.year);
            return uniqueYears;
        }
        saveIncome(): void
        {
            this._incomeService.saveIncome(this._scope.income, this._scope.monthYear.concat());
            this.getIncome();
        }
        getIncome() : void
        {
            var monthly = this._incomeService.getIncome(this._scope.monthYear.concat());
            if (monthly.income)
            {
                this._scope.income = monthly;
            }
        }
        getTotal(): number
        {
            var total = 0;
            for (var i = 0; i < this._scope.expenses.length; i++)
            {
                var amount = this._scope.expenses[i].amount;
                if (typeof this._scope.expenses[i].amount === 'string')
                {
                    amount = parseInt(this._scope.expenses[i].amount.toString());
                }
                total += amount;
            }
            return total;
        }
        getRemaining(): number
        {
            return typeof this._scope.income.income === 'string' ?
                this._scope.income.income - this.getTotal() :
                parseInt(this._scope.income.income.toString()) - this.getTotal();
        }
    }
    
    app.controller(
        'FormController',
        ['$scope', 'LocalExpenseService', 'MonthYearService', 'IncomeService',
        FormController]);
}