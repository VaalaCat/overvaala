import { ROLE_HAVESTER, creepFather } from "creepfather";

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
		let targets = creep.room.find(FIND_STRUCTURES, {
			filter: (structure) => {
				return (structure.structureType == STRUCTURE_EXTENSION ||
					structure.structureType == STRUCTURE_CONTAINER ||
					structure.structureType == STRUCTURE_SPAWN ||
					structure.structureType == STRUCTURE_TOWER) &&
					structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
			}
		});

		if (creep.room.find(FIND_SOURCES).length == 0 || targets.length == 0) {
			return false;
		}

		let sourceIdx = creep.memory.sourceIdx
		if (creep.store.getFreeCapacity() > 0) {
			var sources = creep.room.find(FIND_SOURCES);
			if (creep.harvest(sources[sourceIdx]) == ERR_NOT_IN_RANGE) {
				creep.moveTo(sources[sourceIdx], { visualizePathStyle: { stroke: '#ffaa00' } });
			}
		} else {
			if (targets.length > 0) {
				if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
				}
			}
		}
		return true;
	},
	born: function (creepLimit: number) {
		let numOfUpgrader = Object.keys(Game.creeps)
			.filter((name) => name.startsWith(ROLE_HAVESTER)).length;
		if (numOfUpgrader < creepLimit) {
			creepFather.born(Game.spawns['Spawn1'], ROLE_HAVESTER);
		}
	}
};
