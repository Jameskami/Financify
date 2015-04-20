/// <reference path="scripts/typings/angularjs/angular.d.ts" />
/// <reference path="appModule.ts" /> 
/// <reference path="services.ts" /> 
/// <reference path="scopes.ts" /> 
var Controllers;
(function (Controllers) {
    var FormController = (function () {
        function FormController($scope, expenseService, MonthYearService, IncomeService) {
            this._monthName = new Models.Month();
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
        FormController.prototype.setMonthYearStrings = function () {
            this._scope.monthYear.month = this._monthName.getMonthName(this._scope.currentDate.getMonth());
            this._scope.monthYear.year = this._scope.currentDate.getFullYear().toString();
        };
        FormController.prototype.setExpenses = function () {
            this._scope.expenses = this._expenseService.getAll(this._scope.monthYear.concat());
        };
        FormController.prototype.changeSelectedDate = function (monthYear) {
            this._scope.expenses = this._expenseService.getAll(monthYear);
            this._scope.monthYear = this._scope.monthYear.splitAndSet(monthYear);
            this.setExpenses();
            this.getIncome();
        };
        FormController.prototype.saveEdits = function (expenses) {
            var filteredExpenses = this._scope.expenses.filter(function (expense) { return !expense.isMarkDelete; });
            this._expenseService.saveAll(filteredExpenses, this._scope.monthYear.concat());
            this.setExpenses();
        };
        FormController.prototype.addRow = function () {
            var expense = new Models.Expense();
            expense.amount = 0;
            expense.name = "";
            expense.isRecurring = false;
            this._scope.expenses.push(expense);
        };
        FormController.prototype.getUniqueMonths = function () {
            var uniqueDictionary = {};
            var uniqueMonths = this._scope.allMonthYears.filter(function (my) { return uniqueDictionary.hasOwnProperty(my.month) ? false : (uniqueDictionary[my.month] = true); }).map(function (my) { return my.month; });
            return uniqueMonths;
        };
        FormController.prototype.getUniqueYears = function () {
            var uniqueDictionary = {};
            var uniqueYears = this._scope.allMonthYears.filter(function (my) { return uniqueDictionary.hasOwnProperty(my.year) ? false : (uniqueDictionary[my.year] = true); }).map(function (my) { return my.year; });
            return uniqueYears;
        };
        FormController.prototype.saveIncome = function () {
            this._incomeService.saveIncome(this._scope.income, this._scope.monthYear.concat());
            this.getIncome();
        };
        FormController.prototype.getIncome = function () {
            var monthly = this._incomeService.getIncome(this._scope.monthYear.concat());
            if (monthly.income) {
                this._scope.income = monthly;
            }
        };
        FormController.prototype.getTotal = function () {
            var total = 0;
            for (var i = 0; i < this._scope.expenses.length; i++) {
                var amount = this._scope.expenses[i].amount;
                if (typeof this._scope.expenses[i].amount === 'string') {
                    amount = parseInt(this._scope.expenses[i].amount.toString());
                }
                total += amount;
            }
            return total;
        };
        FormController.prototype.getRemaining = function () {
            return typeof this._scope.income.income === 'string' ? this._scope.income.income - this.getTotal() : parseInt(this._scope.income.income.toString()) - this.getTotal();
        };
        return FormController;
    })();
    app.controller('FormController', ['$scope', 'LocalExpenseService', 'MonthYearService', 'IncomeService', FormController]);
})(Controllers || (Controllers = {}));
//# sourceMappingURL=controllers.js.map