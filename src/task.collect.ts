export const taskCollect = {
	name: 'collect',
	run: function (creep: Creep): boolean {
		// if there is no energy dropped
		let droppedEnergy = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES, {
			filter: (resource) => {
				return resource.amount > 0
			}
		});
		if (!droppedEnergy || creep.store.getFreeCapacity() == 0) {
			return false
		}

		if (droppedEnergy.amount / creep.pos.getRangeTo(droppedEnergy) < 1) {
			return false
		}

		if (droppedEnergy) {
			if (creep.pickup(droppedEnergy) == ERR_NOT_IN_RANGE) {
				creep.moveTo(droppedEnergy, { visualizePathStyle: { stroke: '#ffaa00' } });
			}
			return true;
		}


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
		return false;
	}
}
