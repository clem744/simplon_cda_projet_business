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
}