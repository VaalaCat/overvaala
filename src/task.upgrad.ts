import { ROLE_UPGRADER, creepFather } from "creepfather";

export const taskUpgrad = {
	run: function (creep: Creep, sourceIdx: number) {
		if (creep.room.find(FIND_FLAGS).length > 0) {
			let fs = creep.room.find(FIND_FLAGS);
			let targetFlag = fs.filter((f) => f.name.startsWith(ROLE_UPGRADER))[0];
			creep.moveTo(targetFlag);
			return;
		}

		if (creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
			creep.memory.upgrading = false;
			creep.say('🔄 harvest');
		}
		if (!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
			creep.memory.upgrading = true;
			creep.say('⚡ upgrade');
		}

		if (creep.memory.upgrading) {
			if (creep.upgradeController(creep.room.controller as StructureController) == ERR_NOT_IN_RANGE) {
				creep.moveTo(creep.room.controller as StructureController, { visualizePathStyle: { stroke: '#ffffff' } });
			}
		}
		else {
			var sources = creep.room.find(FIND_SOURCES);
			if (creep.harvest(sources[sourceIdx]) == ERR_NOT_IN_RANGE) {
				creep.moveTo(sources[sourceIdx], { visualizePathStyle: { stroke: '#ffaa00' } });
			}
		}
	},
	born: function (creepLimit: number) {
		let numOfUpgrader = Object.keys(Game.creeps)
			.filter((name) => name.startsWith(ROLE_UPGRADER)).length;
		if (numOfUpgrader <= creepLimit) {
			creepFather.born(Game.spawns['Spawn1'], ROLE_UPGRADER);
		}
	}
};
