import { ROLE_BUILDER } from "creepfather";
import { taskWithdraw } from "task.withdraw";

export const taskBuild = {
	name: 'build',
	run: function (creep: Creep): boolean {
		if (creep.room.find(FIND_FLAGS).length > 0) {
			let fs = creep.room.find(FIND_FLAGS);
			let targetFlag = fs.filter((f) => f.name.startsWith(ROLE_BUILDER))[0];
			creep.moveTo(targetFlag);
			return false;
		}

		// if cannot build, return false
		if (creep.room.find(FIND_CONSTRUCTION_SITES).length == 0) {
			return false;
		}

		if (creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
			creep.memory.building = false;
			creep.say('🔄 harvest');
		}
		if (!creep.memory.building && creep.store.getFreeCapacity() == 0) {
			creep.memory.building = true;
			creep.say('🚧 build');
		}

		if (creep.memory.building) {
			var target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
			if (target) {
				creep.build(target)
				creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
			}
		} else {
			return taskWithdraw.run(creep);
		}
		return true;
	},
};
