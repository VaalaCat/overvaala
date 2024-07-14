import { ROLE_UPGRADER } from "creepfather";
import { taskWithdraw } from "task.withdraw";

export const taskUpgrade = {
	name: 'upgrade',
	run: function (creep: Creep): boolean {
		if (creep.room.find(FIND_FLAGS).length > 0) {
			let fs = creep.room.find(FIND_FLAGS);
			let targetFlag = fs.filter((f) => f.name.startsWith(ROLE_UPGRADER))[0];
			if (targetFlag) {
				creep.moveTo(targetFlag);
				return true;
			}
		}

		if (creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
			creep.memory.upgrading = false;
			creep.say('🔄 harvest');
		}
		if (!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
			creep.memory.upgrading = true;
			creep.say('⚡ upgrade');
		}

		if (creep.memory.upgrading) {
			creep.upgradeController(creep.room.controller as StructureController)
			creep.moveTo(creep.room.controller as StructureController, { visualizePathStyle: { stroke: '#ffffff' } });
		} else {
			return taskWithdraw.run(creep)
		}
		return true;
	},
};
