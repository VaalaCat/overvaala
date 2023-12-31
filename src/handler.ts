import { ROLE_BUILDER, ROLE_HAVESTER, ROLE_MISCER, ROLE_UPGRADER } from "creepfather";
import { spawner } from "spawn";
import { role, roleBuilderTaskList, roleHarvesterTaskList, roleMiscerTaskList, roleUpgraderTaskList } from "role";

export const handler = () => {
	// run all creeps
	for (const [name, creep] of Object.entries(Game.creeps)) {
		if (name.startsWith(ROLE_HAVESTER)) { role.run(creep, roleHarvesterTaskList) }
		if (name.startsWith(ROLE_UPGRADER)) { role.run(creep, roleUpgraderTaskList) }
		if (name.startsWith(ROLE_BUILDER)) { role.run(creep, roleBuilderTaskList) }
		if (name.startsWith(ROLE_MISCER)) { role.run(creep, roleMiscerTaskList) }
	}
	spawner.run('Spawn1');
}
