import { taskBuild } from "task.build";
import { taskHarvest } from "task.harvest";
import { taskUpgrade } from "task.upgrade";

export const roleBuilderTaskList: TaskNode = {
	name: taskBuild.name,
	exec: taskBuild.run,
	next: {
		name: taskHarvest.name,
		exec: taskHarvest.run,
		next: null,
	}
}

export const roleUpgraderTaskList: TaskNode = {
	name: taskUpgrade.name,
	exec: taskUpgrade.run,
	next: null,
}

export const roleHarvesterTaskList: TaskNode = {
	name: taskHarvest.name,
	exec: taskHarvest.run,
	next: {
		name: taskUpgrade.name,
		exec: taskUpgrade.run,
		next: null,
	},
}

export const role = {
	run: function (creep: Creep, taskList: TaskNode) {
		if (taskList.exec(creep, 0)) {
			return;
		} else {
			if (taskList.next) {
				this.run(creep, taskList.next);
			} else {
				console.log('No task found for creep: ' + creep.name);
			}
		}
	}
}

export interface TaskNode {
	name: string;
	exec: (creep: Creep, sourceIdx: number) => boolean;
	next: TaskNode | null;
}
