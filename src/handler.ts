import { ROLE_BUILDER, ROLE_HAVESTER, ROLE_UPGRADER } from "creepfather";
import { taskBuild as taskBuild } from "task.build";
import { taskHarvest as taskHarvest } from "task.harvest";
import { taskUpgrad as taskUpgrad } from "task.upgrad";
import { spawner } from "spawn";

export const handler = () => {
	// run all creeps
	for (const [name, creep] of Object.entries(Game.creeps)) {
		if (name.startsWith(ROLE_HAVESTER))
		{ taskHarvest.run(creep as Creep, 1); }

		if (name.startsWith(ROLE_UPGRADER))
		{ taskUpgrad.run(creep as Creep, 1); }
		// { roleBuilder.run(creep as Creep, 1); }

		if (name.startsWith(ROLE_BUILDER))
		{ taskBuild.run(creep as Creep, 0); }
	}

	spawner.run('Spawn1');
}
