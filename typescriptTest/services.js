/// <reference path="appModule.ts" /> 
/// <referece path="models.ts"/>
/// <reference path="controllers.ts"/>
var Services;
(function (Services) {
    var LocalExpenseService = (function () {
        function LocalExpenseService() {
            this.recurringExpenses = 'recurringExpenses';
        }
        LocalExpenseService.prototype.save = function (expense, monthYearConcat) {
            if (expense.isRecurring) {
                var recurring = this.getRecurring();
                recurring.push(expense);
                localStorage[this.recurringExpenses] = recurring;
            }
            else {
                var expenses = this.getExpenses(monthYearConcat);
                expenses.push(expense);
                localStorage[monthYearConcat] = JSON.stringify(expenses);
            }
        };
        LocalExpenseService.prototype.getExpenses = function (monthYearConcat) {
            var expenses = [];
            if (localStorage[monthYearConcat]) {
                var arrayOfExpenses = JSON.parse(localStorage[monthYearConcat]);
                for (var i = 0; i < arrayOfExpenses.length; i++) {
                    var expense = new Models.Expense();
                    expense.amount = arrayOfExpenses[i].amount;
                    expense.name = arrayOfExpenses[i].name;
                    expense.isRecurring = arrayOfExpenses[i].isRecurring;
                    expenses.push(expense);
                }
            }
            return expenses;
        };
        LocalExpenseService.prototype.getRecurring = function () {
            var expenses = [];
            if (localStorage[this.recurringExpenses]) {
                var arrayOfExpenses = JSON.parse(localStorage[this.recurringExpenses]);
                for (var i = 0; i < arrayOfExpenses.length; i++) {
                    var expense = new Models.Expense();
                    expense.amount = arrayOfExpenses[i].amount;
                    expense.name = arrayOfExpenses[i].name;
                    expense.isRecurring = arrayOfExpenses[i].isRecurring;
                    expenses.push(expense);
                }
            }
            return expenses;
        };
        LocalExpenseService.prototype.getAll = function (monthYearConcat) {
            var monthlyExpenses = this.getExpenses(monthYearConcat);
            var recurring = this.getRecurring();
            var all = [];
            for (var i = 0; i < monthlyExpenses.length; i++) {
                var expense = new Models.Expense();
                expense.amount = monthlyExpenses[i].amount;
                expense.name = monthlyExpenses[i].name;
                expense.isRecurring = monthlyExpenses[i].isRecurring;
                all.push(expense);
            }
            for (var j = 0; j < recurring.length; j++) {
                var expense = new Models.Expense();
                expense.amount = recurring[i].amount;
                expense.name = recurring[i].name;
                expense.isRecurring = recurring[i].isRecurring;
                all.push(expense);
            }
            return all;
        };
        LocalExpenseService.prototype.saveAll = function (expenses, monthYearConcat) {
            localStorage[monthYearConcat] = JSON.stringify(expenses);
        };
        return LocalExpenseService;
    })();
    Services.LocalExpenseService = LocalExpenseService;
    var MonthYearService = (function () {
        function MonthYearService() {
        }
        MonthYearService.prototype.getAllMonthYears = function () {
            var monthYears;
            var monthYearReturn = [];
            if (localStorage['monthYears']) {
                monthYears = JSON.parse(localStorage['monthYears']);
            }
            if (!monthYears)
                return monthYearReturn;
            for (var i = 0; i < monthYears.length; i++) {
                monthYearReturn[i] = new Models.MonthYear();
                monthYearReturn[i].year = monthYears[i].year;
                monthYearReturn[i].month = monthYears[i].month;
            }
            return monthYearReturn;
        };
        MonthYearService.prototype.saveMonthYear = function (monthYear) {
            var monthYears = this.getAllMonthYears();
            if (monthYears.filter(function (my) { return my.year == monthYear.year && my.month == monthYear.month; }).length > 0)
                return;
            monthYears ? monthYears.push(monthYear) : monthYears = [monthYear];
            localStorage['monthYears'] = JSON.stringify(monthYears);
        };
        return MonthYearService;
    })();
    Services.MonthYearService = MonthYearService;
    var IncomeService = (function () {
        function IncomeService() {
        }
        IncomeService.prototype.getIncome = function (monthYearConcat) {
            var income = new Models.MonthlyIncome();
            if (localStorage['income' + monthYearConcat]) {
                income = JSON.parse(localStorage['income' + monthYearConcat]);
            }
            return income;
        };
        IncomeService.prototype.saveIncome = function (income, monthYearConcat) {
            if (income.income) {
                localStorage['income' + monthYearConcat] = JSON.stringify(income);
            }
        };
        return IncomeService;
    })();
    Services.IncomeService = IncomeService;
    app.service('LocalExpenseService', LocalExpenseService);
    app.service('MonthYearService', MonthYearService);
    app.service('IncomeService', IncomeService);
})(Services || (Services = {}));
//# sourceMappingURL=services.js.map