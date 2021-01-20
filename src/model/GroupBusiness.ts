import { Group } from "./Group"

export class GroupBusiness
{
    constructor(public group:Group){}

    addUser(name:string) {
        this.group.addUser(name);
    }
    addExpense(user:string, note:string, cost:number) {
        this.group.addExpense(user, note, cost);
    }
    get_group_balance()
    {
        var expenses_recap = new Array();

        for(let i = 0; i < this.group.user_number; i++) {
            expenses_recap[i] = this.group.user_expense_list[i];
        }
        for(let i = 0; i < this.group.expense_number; i++) {
            for(let j = 0; j < this.group.user_number; j++) {
                expenses_recap[j] -= this.group.expense_list[i].cost/this.group.user_number;
            }
        }
        for(let i = 0; i < this.group.user_number; i++) {
            expenses_recap[i] = Math.round(expenses_recap[i] * 100) / 100;
            if (expenses_recap[i] == 0)
                console.log(this.group.user_list + " est au point");
            if (expenses_recap[i] < 0)
                console.log(this.group.user_list[i] + " doit rembourser un total de " + String(expenses_recap[i] * -1) + "€ au groupe");
            if (expenses_recap[i] > 0)
                console.log(this.group.user_list[i] +" doit se faire rembourser un total de " + String(expenses_recap[i]) + "€ par le groupe");
        }
        return (expenses_recap);
    }
    settle_group_balance()
    {
        this.group.user_expense_list = this.get_group_balance();
        for(let i = 0; i < this.group.user_number; i++) {
            if (this.group.user_expense_list[i] > 0) {
                for(let j = 0; j < this.group.user_number; j++) {
                    if (this.group.user_expense_list[i] == 0)
                        break;
                    if (this.group.user_expense_list[j] < 0) {
                        if (this.group.user_expense_list[j] * -1 < this.group.user_expense_list[i]) {
                            console.log(this.group.user_list[j] + " doit rembourser " + String(this.group.user_expense_list[j] * -1) + "€ a " + this.group.user_list[i]);
                            this.group.user_expense_list[i] += this.group.user_expense_list[j];
                            this.group.user_expense_list[j] = 0;
                        }
                        else {
                            console.log(this.group.user_list[j] + " doit rembourser " + String(this.group.user_expense_list[i]) + "€ a " + this.group.user_list[i]);
                            this.group.user_expense_list[j] += this.group.user_expense_list[i];
                            this.group.user_expense_list[i] = 0;
                        }
                    }
                }
            }
        }
    }   
}