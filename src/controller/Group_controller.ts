import { Group } from "../model/Group"

export class Group_controller
{
    public group_list:Array<Group>;
    private nb_group = 0;
    constructor() {
        this.group_list = new Array();
    }
    create_group(creator:string, name:string) {
        console.log("Creation du groupe...");
        this.group_list[this.nb_group] = new Group(creator, name);
        this.nb_group++;
    }
    add_group(group:Group) {
        this.group_list[this.nb_group] = group;
        this.nb_group++;
    }
    get_joined_groups(name:string) {
        var result = new Array();
        let id = -1;
        let i = 0;

        this.group_list.forEach(item => {
            id = item.get_user_id_from_name(name);
            if (id != -1) {
                console.log(name + " fait parti du groupe " + item.name);
                result[i] = item;
                i++;
            }
        });
        return result;
    }
}