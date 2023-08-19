import { ROLE_MISCER, creepFather } from "creepfather";
import { taskBuild } from "task.build";
import { taskHarvest } from "task.harvest";
import { taskUpgrade } from "task.upgrade";

export const spawner = {
	run: (name: string) => {
		if (Game.spawns[name].spawning != null) {
			const spawningCreep = Game.creeps[(Game.spawns[name].spawning as Spawning).name];
			Game.spawns[name].room.visual.text(
				'🛠️' + spawningCreep.memory.role,
				Game.spawns[name].pos.x + 1,
				Game.spawns[name].pos.y,
				{ align: 'left', opacity: 0.8 });
			return;
		} else if (Game.spawns[name].room.energyAvailable < 300) {
			return;
		} else {
			console.log('can Spawning new creep');
		}
		taskBuild.born(2);
		taskUpgrade.born(1);
		taskHarvest.born(2);
		bornCreepLimit(2, ROLE_MISCER);
	}
}

const bornCreepLimit = function (creepLimit: number, role: string) {
	let numOfUpgrader = Object.keys(Game.creeps)
		.filter((name) => name.startsWith(role)).length;
	if (numOfUpgrader < creepLimit) {
		creepFather.born(Game.spawns['Spawn1'], role);
	}
}
