import { CreepRoleType } from "creepfather";

export function updateSourceIdx(creep: Creep, sources: Source[]) {
	type SourceWithRange ={ source: Source, length: number, ok: boolean, idx: number };
	let pathsLen: SourceWithRange[] = [];
	for (let s = 0; s < sources.length; s++) {
		pathsLen.push({
			source: sources[s],
			length: creep.pos.getRangeTo(sources[s]),
			ok: sources[s].energy > 0,
			idx: s
		});
	}
	pathsLen.sort((a, b: SourceWithRange) => a.length - b.length);
	// console.log("pathsLen:", JSON.stringify(pathsLen));
	if (pathsLen.length > 0) {
		for (let i = 0; i < pathsLen.length; i++) {
			let item = pathsLen[i] as SourceWithRange;
			if (item.ok) {
				creep.memory.sourceIdx = item.idx;
				return;
			}
		}
	}
}

export function updateSourceIdxForMiner(creep: Creep, sources: Source[]) {
	let container = posHaveContainer(creep.pos)
	if (container && containerHaveSourceAround(container)) {
		return
	}

	type SourceWithRange ={ source: Source, length: number, ok: boolean, idx: number };
	let pathsLen: SourceWithRange[] = [];
	for (let s = 0; s < sources.length; s++) {
		pathsLen.push({
			source: sources[s],
			length: creep.pos.getRangeTo(sources[s]),
			ok: haveContainerAroundSource(sources[s]),
			idx: s
		});
	}
	pathsLen.sort((a, b: SourceWithRange) => a.length - b.length);
	// console.log("pathsLen:", JSON.stringify(pathsLen));
	if (pathsLen.length > 0) {
		for (let i = 0; i < pathsLen.length; i++) {
			let item = pathsLen[i] as SourceWithRange;
			if (item.ok) {
				creep.memory.sourceIdx = item.idx;
				return;
			}
		}
	}
}

export function posHaveContainer(pos: RoomPosition): StructureContainer | null {
	let structs = pos.lookFor(LOOK_STRUCTURES).filter((s) => {
		return s.structureType == STRUCTURE_CONTAINER
	})
	if (structs.length == 0) {
		return null
	}
	return structs[0] as StructureContainer
}

export function containerHaveSourceAround(container: StructureContainer): boolean {
	let posList = container.pos.findInRange(FIND_SOURCES, 1)
	return posList.length > 0
}

export function haveContainerAroundSource(source: Source): boolean {
	let posList: RoomPosition[] = []
	source.room.lookForAtArea(LOOK_TERRAIN,
		source.pos.y - 1, source.pos.x - 1,
		source.pos.y + 1, source.pos.x + 1,
		true).forEach((look) => {
			if (look.x == source.pos.x && look.y == source.pos.y) {
				return
			}
			if (look.type == 'terrain' && look.terrain != 'wall') {
				posList.push(new RoomPosition(look.x, look.y, source.room.name))
			}
		})
	for (let i = 0; i < posList.length; i++) {
		let structs = source.room.lookForAt(LOOK_STRUCTURES, posList[i]).filter((s) => {
			return s.structureType == STRUCTURE_CONTAINER
		})

		if(structs.length == 0){
			continue
		}

		if (source.room.lookForAt(LOOK_CREEPS, posList[i]).length == 0) {
			return true
		}
	}
	return false
}

export function haveEmptyPositionsAroundSource(source: Source): boolean {
	let posList: RoomPosition[] = []
	source.room.lookForAtArea(LOOK_TERRAIN,
		source.pos.y - 1, source.pos.x - 1,
		source.pos.y + 1, source.pos.x + 1,
		true).forEach((look) => {
			if (look.x == source.pos.x && look.y == source.pos.y) {
				return
			}
			if (look.type == 'terrain' && look.terrain != 'wall') {
				posList.push(new RoomPosition(look.x, look.y, source.room.name))
			}
		})
	for (let i = 0; i < posList.length; i++) {
		if (source.room.lookForAt(LOOK_CREEPS, posList[i]).length == 0) {
			return true
		}
	}
	return false
}

export function getRandomItem<T>(arr: T[]): T {
	return arr[Math.floor(Math.random() * arr.length)];
}

export function getTypeOfCreeps(t: CreepRoleType): AnyCreep[] {
	return Object.values(Game.creeps).filter((c) => c.name.startsWith(t))
}
