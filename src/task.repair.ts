export const taskRepair = {
	name: 'repair',
	run: function (creep: Creep) {
		if (creep.memory.working && creep.store.getFreeCapacity() == 0) {
			creep.memory.working = false;
			creep.say('🚧 repair');
		}
		if (!creep.memory.working && creep.store.getUsedCapacity() == 0) {
			creep.memory.working = true;
			creep.say('🔄 harvest');
		}
		if (creep.memory.working) {
			const target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
				filter: (structure) => {
					return structure.hits < structure.hitsMax &&
						structure.structureType != STRUCTURE_WALL;
				}
			});
			if (target) {
				if (creep.repair(target) == ERR_NOT_IN_RANGE) {
					creep.moveTo(target, { visualizePathStyle: { stroke: '#ffaa00' } });
				}
				return true;
			}
		} else {
			const target = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
			if (target) {
				if (creep.harvest(target) == ERR_NOT_IN_RANGE) {
					creep.moveTo(target, { visualizePathStyle: { stroke: '#ffaa00' } });
				}
				return true;
			}
		}
		return false;
	}
}
