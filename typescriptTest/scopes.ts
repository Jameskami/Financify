/// <reference path="scripts/typings/angularjs/angular.d.ts" />
/// <reference path="models.ts"/>
/// <reference path="controllers.ts"/>
interface baseScope extends ng.IScope
{
    event: Controllers.baseFormController;
}
interface formScope extends baseScope
{
    yearStrs: Array<string>;
    monthStrs: Array<string>;
    expenses: Array<Models.Expense>;
    currentDate: Date;
    monthYear: Models.MonthYear;
    allMonthYears: Array<Models.MonthYear>;
    income: Models.MonthlyIncome;
}