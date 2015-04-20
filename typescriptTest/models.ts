module Models
{
    export class Expense
    {
        name: string;
        amount: number;
        isRecurring: boolean;
        isMarkDelete: boolean;
        constructor()
        {
            this.isMarkDelete = false;
            this.isRecurring = false;
        }
    }
    export class MonthYear
    {
        month: string;
        year: string;
        isSaved: boolean;
        concat(): string
        {
            return this.month + '_' + this.year;
        }
        splitAndSet(monthYearString: string): MonthYear
        {
            var monthYearProperties = monthYearString.split('_');
            var monthYear = new MonthYear();
            monthYear.month = monthYearProperties[0];
            monthYear.year = monthYearProperties[1];
            return monthYear;
        }
    }
    export class MonthlyIncome
    {
        income: number = 0;
        getDisplayClassName(): string
        {
            return this.income >= 0 ? "inTheGreen" : "inTheRed";
        }
    }
    export class Month
    {
        monthNames : Array<string> = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"];
        getMonthName(monthNumber: number): string
        {
            return this.monthNames[monthNumber];
        }
    }
}