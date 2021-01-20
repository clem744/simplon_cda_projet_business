import { Group } from "../model/Group"
import { GroupBusiness } from "../model/GroupBusiness"

export class Group_controller
{
    public groups:Array<GroupBusiness>;
    private nb_group = 0;
    constructor() {
        this.groups = new Array();
    }
    create_group(creator:string, name:string) {
        console.log("Creation du groupe...");
        this.groups[this.nb_group] = new GroupBusiness(new Group(creator, name));
        this.nb_group++;
    }
    add_group(group:Group) {
        this.groups[this.nb_group] = new GroupBusiness(group);
        this.nb_group++;
    }
    get_joined_groups(name:string) {
        var result = new Array();
        let id = -1;
        let i = 0;

        this.groups.forEach(item => {
            id = item.group.get_user_id_from_name(name);
            if (id != -1) {
                console.log(name + " fait parti du groupe " + item.group.name);
                result[i] = item;
                i++;
            }
        });
        return result;
    }
}