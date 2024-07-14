import { ROLE_MISCER } from "creepfather";

export const taskMourn = {
	name: 'mourn',
	run: function (creep: Creep): boolean {
		let fs = creep.room.find(FIND_FLAGS);
		if (fs.length > 0) {
			let targetFlag = fs.filter((f) => f.name.startsWith(ROLE_MISCER))[0];
			if (targetFlag) {
				creep.moveTo(targetFlag,{ visualizePathStyle: { stroke: '#ffffaa' } });
				return true;
			}
		}

		// find tombstone and collect its energy
		const target = creep.pos.findClosestByPath(FIND_TOMBSTONES, {
			filter: (tombstone) => { return tombstone.store.getUsedCapacity(RESOURCE_ENERGY) > 0; }
		});
		if (!target || creep.store.getCapacity() - creep.store.getFreeCapacity() > 50) {
			return false;
		}
		if (creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
			creep.moveTo(target, { visualizePathStyle: { stroke: '#ffaa00' } });
			return true;
		}

		// move energy to save
		const targetSave = creep.pos.findClosestByPath(FIND_STRUCTURES, {
			filter: (structure) => {
				return (structure.structureType == STRUCTURE_CONTAINER ||
					structure.structureType == STRUCTURE_STORAGE) &&
					structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
			}
		});
		if (targetSave) {
			if (creep.transfer(targetSave, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
				creep.moveTo(targetSave, { visualizePathStyle: { stroke: '#ffaa00' } });
			}
			return true;
		}
		return false;
	}
}
