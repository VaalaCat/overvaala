export const ROLE_HAVESTER = 'harvester';
export const ROLE_UPGRADER = 'upgrader';
export const ROLE_BUILDER = 'builder';
export const ROLE_COLLECTOR = 'collector';
export const ROLE_MISCER = 'miscer';
export const ROLE_MOVER = 'mover';
export const ROLE_ATTACKER = 'attacker';

export type CreepRoleType = typeof ROLE_HAVESTER
| typeof ROLE_UPGRADER | typeof ROLE_BUILDER
| typeof ROLE_COLLECTOR | typeof ROLE_MISCER
| typeof ROLE_MOVER | typeof ROLE_ATTACKER

export const RoleBodyParts = {
	[ROLE_HAVESTER]: [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
	[ROLE_UPGRADER]: [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
	[ROLE_BUILDER]: [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
	[ROLE_MISCER]: [WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
	[ROLE_MOVER]: [WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
	[ROLE_ATTACKER]: [ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE]
}

const reduceCreepCost = function (parts: BodyPartConstant[], maxCost: number): BodyPartConstant[] {
	let totalCost = 0;
	let trueCost = 0;
	let originCost = _.sum(parts.map(part => BODYPART_COST[part]));
	if (originCost <= maxCost) {
		return parts;
	}

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

	console.log("Reduced creep cost to: " + trueCost + ", parts: " + result);

	return result;
};

export const creepFather = {
	born: function (spawn: StructureSpawn, role: string, bodyParts: BodyPartConstant[]) {
		var newName = role + Game.time;
		let source = Math.round(Math.random());

		spawn.spawnCreep(reduceCreepCost(bodyParts,
			spawn.room.energyAvailable),
			newName,
			{
				memory: {
					role: role,
					room: spawn.room.name,
					working: false,
					building: false,
					upgrading: false,
					harvesting: false,
					transfering: false,
					sourceIdx: source
				}
			});

		console.log('Spawning new ' + role + ': ' + newName);
	}
}
