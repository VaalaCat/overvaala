export const taskStash = {
    name: 'stash',
    run: function (creep: Creep): boolean {
        let storeTargets = creep.pos.findInRange(FIND_STRUCTURES, 1, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_CONTAINER)
            }
        });

        if (storeTargets.length == 0) {
            return false;
        }

        let target = storeTargets[0];

        if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
            return true;
        }
        return false;
    }
}
