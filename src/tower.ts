export const tower = {
    run: function (tower: StructureTower): boolean {
        if (tower.store.getUsedCapacity(RESOURCE_ENERGY) == 0) {
            return false;
        }
        let enemieWithAttack = tower.pos.findClosestByPath(FIND_HOSTILE_CREEPS, {
            filter: (creep) => {
                return creep.getActiveBodyparts(ATTACK) > 0;
            }
        });

        let enemieWithHeal = tower.pos.findClosestByPath(FIND_HOSTILE_CREEPS, {
            filter: (creep) => {
                return creep.getActiveBodyparts(HEAL) > 0;
            }
        });
        let enemie = enemieWithHeal || enemieWithAttack;

        let closestHostile = tower.pos.findClosestByPath(FIND_HOSTILE_CREEPS);

        if (closestHostile && !enemie) {
            enemie = closestHostile;
        }

        if (!enemie) {
            let p0Walls = tower.pos.findClosestByPath(FIND_STRUCTURES, {
              filter: wall => {
                return (
                  wall.structureType == STRUCTURE_WALL &&
                  wall.room.name == tower.room.name &&
                  wall.hits < Math.ceil(wall.hitsMax / 1000)
                );
              }
            });
            // let p1Walls = tower.pos.findClosestByPath(FIND_STRUCTURES, {
            //   filter: wall => {
            //     return (
            //       wall.structureType == STRUCTURE_WALL &&
            //       wall.room.name == tower.room.name &&
            //       wall.hits < Math.ceil(wall.hitsMax / 500)
            //     );
            //   }
            // });
            let p1Walls = undefined;
            let walls = p0Walls ? p0Walls : p1Walls;
            if (walls && tower.store.getUsedCapacity(RESOURCE_ENERGY) > tower.store.getCapacity(RESOURCE_ENERGY) * 0.5) {
              console.log(`repair ${walls} walls`);
              tower.repair(walls);
            }
            return true;
          }

        tower.attack(enemie);
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
