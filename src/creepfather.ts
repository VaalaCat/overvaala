export const ROLE_HAVESTER = 'harvester';
export const ROLE_UPGRADER = 'upgrader';
export const ROLE_BUILDER = 'builder';
export const ROLE_COLLECTOR = 'collector';
export const ROLE_MISCER = 'miscer';

export type CreepRoleType = typeof ROLE_HAVESTER | typeof ROLE_UPGRADER | typeof ROLE_BUILDER | typeof ROLE_COLLECTOR | typeof ROLE_MISCER

const RoleBodyParts = {
	[ROLE_HAVESTER]: [WORK, CARRY, CARRY, CARRY, MOVE, MOVE],
	[ROLE_UPGRADER]: [WORK, CARRY, CARRY, CARRY, MOVE, MOVE],
	[ROLE_BUILDER]: [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
	[ROLE_MISCER]: [WORK, CARRY, CARRY, MOVE, MOVE, MOVE]
}

const reduceCreepCost = function (parts: BodyPartConstant[], maxCost: number): BodyPartConstant[] {
	let totalCost = 0;
	let trueCost = 0;
	const result: BodyPartConstant[] = [];
	const partCounts: { [key in BodyPartConstant]?: number } = {};
	for (const part of parts) {
		partCounts[part] = (partCounts[part] || 0) + 1;
	}

	while (totalCost < maxCost) {
		for (const part in partCounts) {
			if (partCounts[part as BodyPartConstant] == undefined || partCounts[part as BodyPartConstant] == 0) {
				continue;
			}
			const nowCost = _.sum(result.map(part => BODYPART_COST[part]));
			totalCost = nowCost + BODYPART_COST[part as BodyPartConstant];
			if (totalCost > maxCost) {
				trueCost = nowCost;
				break;
			}

			result.push(part as BodyPartConstant);
			(partCounts[part as BodyPartConstant] as number)--
		}
	}

	console.log("Reduced creep cost to: " + totalCost + ", parts: " + result);

	return result;
};

export const creepFather = {
	born: function (spawn: StructureSpawn, role: string) {
		var newName = role + Game.time;
		let source = Math.round(Math.random());

		spawn.spawnCreep(reduceCreepCost(RoleBodyParts[role as keyof typeof RoleBodyParts],
			spawn.room.energyCapacityAvailable),
			newName,
			{
				memory: {
					role: role,
					room: spawn.room.name,
					working: false,
					building: false,
					upgrading: false,
					sourceIdx: source
				}
			});

		console.log('Spawning new ' + role + ': ' + newName);
	}
}
