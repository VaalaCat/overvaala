export const taskCollect = {
	name: 'collect',
	run: function (creep: Creep) {
		if (creep.memory.working && creep.store.getFreeCapacity() == 0) {
			creep.memory.working = false;
			creep.say('🔄 harvest');
		}
		if (!creep.memory.working && creep.store.getUsedCapacity() == 0) {
			creep.memory.working = true;
			creep.say('🚧 collect');
		}
		if (creep.memory.working) {
			const target = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
			if (target) {
				if (creep.pickup(target) == ERR_NOT_IN_RANGE) {
					creep.moveTo(target, { visualizePathStyle: { stroke: '#ffaa00' } });
				}
				return true;
			}
		} else {
			const target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
				filter: (structure) => {
					return (structure.structureType == STRUCTURE_CONTAINER ||
						structure.structureType == STRUCTURE_STORAGE) &&
						structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0;
				}
			});
			if (target) {
				if (creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					creep.moveTo(target, { visualizePathStyle: { stroke: '#ffaa00' } });
				}
				return true;
			}
		}
		return false;
	}
}
