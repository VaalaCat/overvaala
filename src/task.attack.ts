export const taskAttack = {
	name: 'attack',
	run: function (creep: Creep): boolean {
        const target = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS);
        if (!target) {
            return false;
        }

        const allTarget = creep.room.find(FIND_HOSTILE_CREEPS);

        if (creep.attack(target) == ERR_NOT_IN_RANGE) {
            for (let i of allTarget) {
                creep.attack(i)
            }
            creep.moveTo(target, { visualizePathStyle: { stroke: '#ffaa00' } });
        }
        return true;
	}
}
