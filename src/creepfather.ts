export const ROLE_HAVESTER = 'harvester';
export const ROLE_UPGRADER = 'upgrader';
export const ROLE_BUILDER = 'builder';

export const creepFather = {
	born: function (spawn: StructureSpawn, role: string) {
		var newName = role + Game.time;
		switch (role) {
			case ROLE_HAVESTER:
				spawn.spawnCreep([WORK, WORK, CARRY, CARRY, MOVE], newName, {
					memory: {
						role: ROLE_HAVESTER,
						room: spawn.room.name, working: false, building: false, upgrading: false, sourceIdx: 1
					}
				});
				break;
			case ROLE_UPGRADER:
				spawn.spawnCreep([WORK, CARRY, CARRY, CARRY, MOVE], newName, {
					memory: {
						role: ROLE_UPGRADER,
						room: spawn.room.name, working: false, building: false, upgrading: false, sourceIdx: 1
					}
				});
				break;
			case ROLE_BUILDER:
				spawn.spawnCreep([WORK, CARRY, CARRY, CARRY, MOVE], newName, {
					memory: {
						role: ROLE_BUILDER,
						room: spawn.room.name, working: false, building: false, upgrading: false, sourceIdx: 0
					}
				});
				break;
			default:
				console.log('No role found: ' + role + '');
				return;
		}
		console.log('Spawning new ' + role + ': ' + newName);
	}
}
