import {
	CreepRoleType,
	ROLE_BUILDER,
	ROLE_HAVESTER,
	ROLE_MISCER,
	ROLE_UPGRADER,
	creepFather,
} from "creepfather";

const bornCreepSchedule = [
	{role: ROLE_HAVESTER, limit: 2},
	{role: ROLE_UPGRADER, limit: 1},
	{role: ROLE_MISCER, limit: 2},
	{role: ROLE_BUILDER, limit: 1},
]

export const spawner = {
	run: (name: string) => {
		console.log('spawn ' + name + ' running');
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

		bornCreepScheduler()
	}
}

const bornCreepLimit = function (creepLimit: number, role: string): boolean {
	let numOfCreepType = Object.keys(Game.creeps)
		.filter((name) => name.startsWith(role)).length;
	if (numOfCreepType < creepLimit) {
		creepFather.born(Game.spawns['Spawn1'], role);
		return true
	}
	return false
}

const bornCreepScheduler = function () {
	for (const item of bornCreepSchedule) {
		if (bornCreepLimit(item.limit, item.role)){
			return
		}
	}
}
