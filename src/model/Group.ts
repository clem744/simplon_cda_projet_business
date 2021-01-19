import { Expense } from "./Expense"

export class Group
{
    public user_list:Array<string>;
    public user_expense_list:Array<number>;
    public expense_list:Array<Expense>;
    public user_number:number = 0;
    public expense_number:number = 0;

    constructor(private creator:string, public name:string) {
        this.user_list = new Array();
        this.expense_list = new Array();
        this.user_expense_list = new Array();
        this.addUser(creator);
        console.log(creator + " à creer le groupe " + name);
    }
    addUser(user:string) {
        this.user_list[this.user_number] = user;
        this.user_expense_list[this.user_number] = 0;
        this.user_number++;
        if (user != this.creator)
        console.log(user + " fait maintenant parti du groupe " + this.name + " !");
    }
    addExpense(user:string, message:string, cost:number) {
        let id = this.get_user_id_from_name(user);

        if (id == -1)
            return;
        else {
            this.expense_list[this.expense_number] = new Expense(message, cost, user, this.expense_number);
            this.user_expense_list[id] += cost;
            this.expense_number++;
        }
        console.log(user + " à dépenser " + String(cost) + "€ pour " + message);
    }
    deleteExpense(id:number) {
        let id_user = this.get_user_id_from_name(this.expense_list[id].user);
        let expense = this.expense_list[id];
        
        this.user_expense_list[id_user] -= this.expense_list[id].cost;
        this.expense_list = this.expense_list.filter(item => item.id != id);
        this.expense_number--;
        console.log(this.user_list[id_user] + " à annulé son achat de " + expense.note + ", " + String(expense.cost) + "€ de moins a payer.");
    }
    get_user_id_from_name(name:string)
    {
        for(let i = 0; i < this.user_number; i++) {
            if (this.user_list[i] == name) {
                return (i);
            }
        }
        return (-1);
    }
    get_group_balance()
    {
        var expenses_recap = new Array();

        for(let i = 0; i < this.user_number; i++) {
            expenses_recap[i] = this.user_expense_list[i];
        }
        for(let i = 0; i < this.expense_number; i++) {
            for(let j = 0; j < this.user_number; j++) {
                expenses_recap[j] -= this.expense_list[i].cost/this.user_number;
            }
        }
        for(let i = 0; i < this.user_number; i++) {
            expenses_recap[i] = Math.round(expenses_recap[i] * 100) / 100;
            if (expenses_recap[i] == 0)
                console.log(this.user_list + " est au point");
            if (expenses_recap[i] < 0)
                console.log(this.user_list[i] + " doit rembourser un total de " + String(expenses_recap[i] * -1) + "€ au groupe");
            if (expenses_recap[i] > 0)
                console.log(this.user_list[i] +" doit se faire rembourser un total de " + String(expenses_recap[i]) + "€ par le groupe");
        }
        return (expenses_recap);
    }
    settle_group_balance()
    {
        this.user_expense_list = this.get_group_balance();
        for(let i = 0; i < this.user_number; i++) {
            if (this.user_expense_list[i] > 0) {
                for(let j = 0; j < this.user_number; j++) {
                    if (this.user_expense_list[i] == 0)
                        break;
                    if (this.user_expense_list[j] < 0) {
                        if (this.user_expense_list[j] * -1 < this.user_expense_list[i]) {
                            console.log(this.user_list[j] + " doit rembourser " + String(this.user_expense_list[j] * -1) + "€ a " + this.user_list[i]);
                            this.user_expense_list[i] += this.user_expense_list[j];
                            this.user_expense_list[j] = 0;
                        }
                        else {
                            console.log(this.user_list[j] + " doit rembourser " + String(this.user_expense_list[i]) + "€ a " + this.user_list[i]);
                            this.user_expense_list[j] += this.user_expense_list[i];
                            this.user_expense_list[i] = 0;
                        }
                    }
                }
            }
        }
    }
}