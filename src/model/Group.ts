import { Expense } from "./Expense"

export class Group
{
    public user_list:Array<string>;
    public user_expense_list:Array<number>;
    public expense_list:Array<Expense>;
    public user_number:number = 0;
    public expense_number:number = 0;

    constructor(public creator:string, public name:string) {
        this.user_list = new Array();
        this.expense_list = new Array();
        this.user_expense_list = new Array();
        this.addUser(creator);
    }
    addUser(user:string) {
        this.user_list[this.user_number] = user;
        this.user_expense_list[this.user_number] = 0;
        this.user_number++;
    }
    addExpense(user:string, message:string, cost:number) {
        this.expense_list[this.expense_number] = new Expense(message, cost, user, this.expense_number);
        this.user_expense_list[this.get_user_id_from_name(user)] += cost;
        this.expense_number++;
    }
    deleteExpense(id:number) {
        let id_user = this.get_user_id_from_name(this.expense_list[id].user);
        let expense = this.expense_list[id];
        
        this.user_expense_list[id_user] -= this.expense_list[id].cost;
        this.expense_list = this.expense_list.filter(item => item.id != id);
        this.expense_number--;
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