var Models;
(function (Models) {
    var Expense = (function () {
        function Expense() {
            this.isMarkDelete = false;
            this.isRecurring = false;
        }
        return Expense;
    })();
    Models.Expense = Expense;
    var MonthYear = (function () {
        function MonthYear() {
        }
        MonthYear.prototype.concat = function () {
            return this.month + '_' + this.year;
        };
        MonthYear.prototype.splitAndSet = function (monthYearString) {
            var monthYearProperties = monthYearString.split('_');
            var monthYear = new MonthYear();
            monthYear.month = monthYearProperties[0];
            monthYear.year = monthYearProperties[1];
            return monthYear;
        };
        return MonthYear;
    })();
    Models.MonthYear = MonthYear;
    var MonthlyIncome = (function () {
        function MonthlyIncome() {
            this.income = 0;
        }
        MonthlyIncome.prototype.getDisplayClassName = function () {
            return this.income >= 0 ? "inTheGreen" : "inTheRed";
        };
        return MonthlyIncome;
    })();
    Models.MonthlyIncome = MonthlyIncome;
    var Month = (function () {
        function Month() {
            this.monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        }
        Month.prototype.getMonthName = function (monthNumber) {
            return this.monthNames[monthNumber];
        };
        return Month;
    })();
    Models.Month = Month;
})(Models || (Models = {}));
//# sourceMappingURL=models.js.map