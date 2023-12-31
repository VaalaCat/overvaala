import { taskBuild } from "task.build";
import { taskCollect } from "task.collect";
import { taskHarvest } from "task.harvest";
import { taskMourn } from "task.mourn";
import { taskRepair } from "task.repair";
import { taskUpgrade } from "task.upgrade";

export const roleBuilderTaskList: TaskNode = {
	name: taskBuild.name,
	exec: taskBuild.run,
	next: {
		name: taskHarvest.name,
		exec: taskHarvest.run,
		next: {
			name: taskUpgrade.name,
			exec: taskUpgrade.run,
			next: null,
		},
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

export const roleMiscerTaskList: TaskNode = {
	name: taskMourn.name,
	exec: taskMourn.run,
	next: {
		name: taskCollect.name,
		exec: taskCollect.run,
		next: {
			name: taskRepair.name,
			exec: taskRepair.run,
			next: {
				name: taskUpgrade.name,
				exec: taskUpgrade.run,
				next: null,
			},
		},
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
