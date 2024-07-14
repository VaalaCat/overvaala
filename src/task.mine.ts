import { ROLE_HAVESTER } from "creepfather";
import { updateSourceIdxForMiner } from "helper";

export const taskMine = {
	name: 'mine',
	run: function (creep: Creep): boolean {
		if (creep.room.find(FIND_FLAGS).length > 0) {
			let fs = creep.room.find(FIND_FLAGS);
			let targetFlag = fs.filter((f) => f.name.startsWith(ROLE_HAVESTER))[0];
			if (targetFlag) {
				creep.moveTo(targetFlag);
				return true;
			}
		}

		let sources = creep.room.find(FIND_SOURCES);
		if (sources.length == 0) {
			return false;
		}

		updateSourceIdxForMiner(creep, sources);
		let avaliableSources = sources.filter((s) => {
			return s.energy > 0
		})

		let sourceIdx = creep.memory.sourceIdx;
		if (avaliableSources.length == 0) {
			return false
		}

		let source = sources[sourceIdx];
		let minePoses = source.pos.findInRange(FIND_STRUCTURES, 1, {
			filter: (s) => {
				return s.structureType == STRUCTURE_CONTAINER
			}
		})

		let minePos: StructureContainer;
		if (minePoses.length > 0) {
			minePos = minePoses[0] as StructureContainer;
		} else {
			return false
		}

		const code = creep.harvest(sources[sourceIdx])
		if (code == OK) {
			return true
		}
		if (code == ERR_NOT_IN_RANGE) {
			creep.moveTo(minePos, { visualizePathStyle: { stroke: '#ffaa00' } });
			return true;
		}

		return true;
	}
};
