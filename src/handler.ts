import { ROLE_BUILDER, ROLE_HAVESTER, ROLE_MISCER, ROLE_UPGRADER } from "creepfather";
import { spawner } from "spawn";
import { role, roleBuilderTaskList, roleHarvesterTaskList, roleMiscerTaskList, roleUpgraderTaskList } from "role";
import { haveEmptyPositionsAroundSource } from "helper";

export const handler = () => {
	// run all creeps
	for (const [name, creep] of Object.entries(Game.creeps)) {
		if (name.startsWith(ROLE_HAVESTER)) { role.run(creep, roleHarvesterTaskList) }
		if (name.startsWith(ROLE_UPGRADER)) { role.run(creep, roleUpgraderTaskList) }
		if (name.startsWith(ROLE_BUILDER)) { role.run(creep, roleBuilderTaskList) }
		if (name.startsWith(ROLE_MISCER)) { role.run(creep, roleMiscerTaskList) }
	}
	// let resources = Game.spawns['Spawn1'].room.find(FIND_SOURCES)
	// console.log(`1 - ok: ${haveEmptyPositionsAroundSource(resources[0])}, pos: ${resources[0].pos}`);
	// console.log(`2 - ok: ${haveEmptyPositionsAroundSource(resources[1])}, pos: ${resources[1].pos}`);
	spawner.run('Spawn1');
}
