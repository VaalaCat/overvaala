import { roleBuilder } from "role.builder";
import { roleHarvester } from "role.harvester";
import { roleUpgrader } from "role.upgrader";

export const spawner = {
	run: (name: string) => {
		if (Game.spawns[name].spawning != null) {
			const spawningCreep = Game.creeps[(Game.spawns[name].spawning as Spawning).name];
			Game.spawns[name].room.visual.text(
				'🛠️' + spawningCreep.memory.role,
				Game.spawns[name].pos.x + 1,
				Game.spawns[name].pos.y,
				{ align: 'left', opacity: 0.8 });
			return;
		} else if (Game.spawns[name].room.energyAvailable < 300) {
			return;
		} else {
			console.log('can Spawning new creep');
		}
		roleBuilder.born(5);
		roleUpgrader.born(1);
		roleHarvester.born(2);
	}
}
