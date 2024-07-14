export const tower = {
    run: function (structure: StructureTower): boolean {
        if (structure.store.getUsedCapacity(RESOURCE_ENERGY) == 0) {
            return false;
        }
        let enemieWithAttack = structure.pos.findClosestByPath(FIND_HOSTILE_CREEPS, {
            filter: (creep) => {
                return creep.getActiveBodyparts(ATTACK) > 0;
            }
        });

        let enemieWithHeal = structure.pos.findClosestByPath(FIND_HOSTILE_CREEPS, {
            filter: (creep) => {
                return creep.getActiveBodyparts(HEAL) > 0;
            }
        });
        let enemie = enemieWithHeal || enemieWithAttack;

        let closestHostile = structure.pos.findClosestByPath(FIND_HOSTILE_CREEPS);

        if (closestHostile) {
            enemie = closestHostile;
        }

        if (!enemie) {
            return false;
        }

        structure.attack(enemie);
        return true
    }
}

export const towersRun = function () {
    for (const twrIdx in Object.values(Game.structures)) {
        let stc = Object.values(Game.structures)[twrIdx];
        if (stc.structureType == STRUCTURE_TOWER) {
            let twr = stc as StructureTower;
            console.log(`tower[${twr.pos.x},${twr.pos.y}] run, energy: ${twr.store.getUsedCapacity(RESOURCE_ENERGY)}`);
            tower.run(twr);
        }
    }
}
