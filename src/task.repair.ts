export const taskRepair = {
	name: 'repair',
	run: function (creep: Creep): boolean {
		const target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
			filter: (structure) => {
				return structure.hits < structure.hitsMax &&
					structure.structureType != STRUCTURE_WALL;
			}
		});
		if (!target) {
			return false;
		}

		if (creep.store.getUsedCapacity() == 0) {
			// get energy from container
			let containers = creep.room.find(FIND_STRUCTURES, {
				filter: (structure) => {
					return structure.structureType == STRUCTURE_CONTAINER &&
						structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0;
				}
			});
			if (containers.length > 0) {
				if (creep.withdraw(containers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					creep.moveTo(containers[0], { visualizePathStyle: { stroke: '#ffffff' } });
					return true;
				}
			}
			return false;
		}

		if (creep.repair(target) == ERR_NOT_IN_RANGE && creep.store.getUsedCapacity() > 0) {
			creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
		}
		return true;
	}
}
