export const taskToFlag = {
    name: 'toflag',
    run: function (creep: Creep): boolean {
        const target = creep.pos.findClosestByRange(FIND_FLAGS, {
            filter: (f) => { return f.name.startsWith(creep.memory.role) }
        });

        if (target) {
            creep.moveTo(target, { visualizePathStyle: { stroke: '#ffaa00' } });
        }
        return true;
    }
}
