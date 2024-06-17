import { ROLE_BUILDER } from "creepfather";
import { haveEmptyPositionsAroundSource, updateSourceIdx } from "helper";

export const taskBuild = {
	name: 'build',
	run: function (creep: Creep): boolean {
		if (creep.room.find(FIND_FLAGS).length > 0) {
			let fs = creep.room.find(FIND_FLAGS);
			let targetFlag = fs.filter((f) => f.name.startsWith(ROLE_BUILDER))[0];
			creep.moveTo(targetFlag);
			return false;
		}

		// if cannot build, return false
		if (creep.room.find(FIND_CONSTRUCTION_SITES).length == 0) {
			return false;
		}

		let sourceIdx = creep.memory.sourceIdx;

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
				creep.build(targets[0])
				creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
			}
		} else {
			var sources = creep.room.find(FIND_SOURCES);
			if (creep.harvest(sources[sourceIdx]) == ERR_NOT_IN_RANGE) {
				updateSourceIdx(creep, sources);
			}
			creep.moveTo(sources[sourceIdx], { visualizePathStyle: { stroke: '#ffaa00' } });
		}
		return true;
	},
};
