export const taskRangeCollect = {
    name: 'range.collect',
    run: function (creep: Creep): boolean {
        // if there is no energy dropped
        let droppedEnergy = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES,
            {
                filter: (resource) => {
                    return resource.resourceType == RESOURCE_ENERGY && resource.amount > 0 &&
                        creep.pos.getRangeTo(resource) <= 10
                }
            });
        if (!droppedEnergy || creep.store.getFreeCapacity() == 0) {
            return false
        }

        if (creep.pickup(droppedEnergy) == ERR_NOT_IN_RANGE) {
            creep.moveTo(droppedEnergy, { visualizePathStyle: { stroke: '#ffaa00' } });
        }
        return true

    }
}
