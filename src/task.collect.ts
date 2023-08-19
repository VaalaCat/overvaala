export const taskCollect = {
	name: 'collect',
	run: function (creep: Creep): boolean {
		// if there is no energy dropped
		let droppedEnergy = creep.room.find(FIND_DROPPED_RESOURCES);
		if (droppedEnergy.length == 0) {
			return false
		}

		if (droppedEnergy[0]) {
			if (creep.pickup(droppedEnergy[0]) == ERR_NOT_IN_RANGE) {
				creep.moveTo(droppedEnergy[0], { visualizePathStyle: { stroke: '#ffaa00' } });
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
