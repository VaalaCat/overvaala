import { ROLE_BUILDER, creepFather } from "creepfather";

export const taskBuild = {

	run: function (creep: Creep, sourceIdx: number) {
		if (creep.room.find(FIND_FLAGS).length > 0) {
			let fs = creep.room.find(FIND_FLAGS);
			let targetFlag = fs.filter((f) => f.name.startsWith(ROLE_BUILDER))[0];
			creep.moveTo(targetFlag);
			return;
		}

		if (creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
			creep.memory.building = false;
			creep.say('🔄 harvest');
		}
		if (!creep.memory.building && creep.store.getFreeCapacity() == 0) {
			creep.memory.building = true;
			creep.say('🚧 build');
		}

		if (creep.memory.building) {
			var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
			if (targets.length) {
				if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
					creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
				}
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
			.filter((name) => name.startsWith(ROLE_BUILDER)).length;
		if (numOfUpgrader <= creepLimit) {
			creepFather.born(Game.spawns['Spawn1'], ROLE_BUILDER);
		}
	}
};
