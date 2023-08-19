import { ROLE_BUILDER, ROLE_HAVESTER, ROLE_UPGRADER } from "creepfather";
import { roleBuilder } from "role.builder";
import { roleHarvester } from "role.harvester";
import { roleUpgrader } from "role.upgrader";
import { spawner } from "spawn";

export const handler = () => {
	// run all creeps
	for (const [name, creep] of Object.entries(Game.creeps)) {
		if (name.startsWith(ROLE_HAVESTER))
		{ roleHarvester.run(creep as Creep); }

		if (name.startsWith(ROLE_UPGRADER))
		// { roleUpgrader.run(creep as Creep); }
		{ roleBuilder.run(creep as Creep, 0); }

		if (name.startsWith(ROLE_BUILDER))
		{ roleBuilder.run(creep as Creep, 1); }
	}

	spawner.run('Spawn1');
}
