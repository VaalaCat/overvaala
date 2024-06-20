import { ROLE_HAVESTER } from "creepfather";
import { updateSourceIdx } from "helper";
import { taskWithdraw } from "task.withdraw";

export const taskHarvest = {
	name: 'harvest',
	run: function (creep: Creep): boolean {
		if (creep.room.find(FIND_FLAGS).length > 0) {
			let fs = creep.room.find(FIND_FLAGS);
			let targetFlag = fs.filter((f) => f.name.startsWith(ROLE_HAVESTER))[0];
			if (targetFlag == null) {
				creep.moveTo(targetFlag);
				return true;
			}
		}

		// if cannot harvest, return false
		let p0target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
			filter: (structure) => {
				return (structure.structureType == STRUCTURE_EXTENSION ||
					structure.structureType == STRUCTURE_SPAWN ||
					structure.structureType == STRUCTURE_TOWER) &&
					structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
			}
		});
		let p1target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
			filter: (structure) => {
				return (structure.structureType == STRUCTURE_CONTAINER ||
					structure.structureType == STRUCTURE_STORAGE) &&
					structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
			}
		});

		let target = p0target ? p0target : p1target;

		let sources = creep.room.find(FIND_SOURCES);

		if (sources.length == 0 || !target) {
			return false;
		}

		let avaliableSources = sources.filter((s) => {
			return s.energy > 0
		})

		let sourceIdx = creep.memory.sourceIdx;
		if (creep.store.getFreeCapacity() > 0 && !creep.memory.transfering) {
			if (p0target) {
				if (taskWithdraw.run(creep)) {
					return true;
				}
			}

			if (avaliableSources.length == 0) {
				return false
			}

			const code = creep.harvest(sources[sourceIdx])
			if (code == OK) {
				return true
			}
			if (code == ERR_NOT_IN_RANGE) {
				creep.moveTo(sources[sourceIdx], { visualizePathStyle: { stroke: '#ffaa00' } });
				updateSourceIdx(creep, sources);
				return true;
			}
			updateSourceIdx(creep, sources);
		} else {
			creep.memory.transfering = true;
			if (target) {
				if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
					updateSourceIdx(creep, sources);
				}
			}
			if (creep.store.getUsedCapacity() == 0) {
				creep.memory.transfering = false;
			}
		}
		return true;
	},
};

