export const ROLE_HAVESTER = 'harvester';
export const ROLE_UPGRADER = 'upgrader';
export const ROLE_BUILDER = 'builder';
export const ROLE_COLLECTOR = 'collector';
export const ROLE_MISCER = 'miscer';

export const creepFather = {
	born: function (spawn: StructureSpawn, role: string) {
		var newName = role + Game.time;
		let source = Math.round(Math.random());
		switch (role) {
			case ROLE_HAVESTER:
				spawn.spawnCreep([WORK, CARRY, CARRY, CARRY, MOVE, MOVE], newName, {
					memory: {
						role: ROLE_HAVESTER,
						room: spawn.room.name, working: false, building: false, upgrading: false, sourceIdx: source
					}
				});
				break;
			case ROLE_UPGRADER:
				spawn.spawnCreep([WORK, CARRY, CARRY, CARRY, MOVE, MOVE], newName, {
					memory: {
						role: ROLE_UPGRADER,
						room: spawn.room.name, working: false, building: false, upgrading: false, sourceIdx: source
					}
				});
				break;
			case ROLE_BUILDER:
				spawn.spawnCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE], newName, {
					memory: {
						role: ROLE_BUILDER,
						room: spawn.room.name, working: false, building: false, upgrading: false, sourceIdx: source
					}
				});
				break;
			case ROLE_MISCER:
				spawn.spawnCreep([WORK, CARRY, CARRY, MOVE, MOVE, MOVE], newName, {
					memory: {
						role: ROLE_MISCER,
						room: spawn.room.name, working: false, building: false, upgrading: false, sourceIdx: source
					}
				})
				return
			default:
				console.log('No role found: ' + role + '');
				return;
		}
		console.log('Spawning new ' + role + ': ' + newName);
	}
}
