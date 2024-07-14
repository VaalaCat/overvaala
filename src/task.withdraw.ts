export const taskWithdraw = {
	name: 'withdraw',
	run: function (creep: Creep): boolean {
		// find structure and withdraw its energy
		const target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
			filter: (structure) => { return (structure.structureType == STRUCTURE_CONTAINER ||
					structure.structureType == STRUCTURE_STORAGE ||
					structure.structureType == STRUCTURE_TERMINAL
				) && structure.store.getUsedCapacity(RESOURCE_ENERGY) >= 50; }
		});

		if (!target || creep.store.getFreeCapacity() == 0) {
			return false;
		}
		if (creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
			creep.moveTo(target, { visualizePathStyle: { stroke: '#ffaa00' } });
			return true;
		}
		return false;
	}
}
