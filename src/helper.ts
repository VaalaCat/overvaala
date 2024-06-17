export function updateSourceIdx(creep: Creep, sources: Source[]) {
	let pathsLen: { id: number, length: number, ok: boolean }[] = [];
	for (let s = 0; s < sources.length; s++) {
		pathsLen.push({
			id: s,
			length: creep.pos.getRangeTo(sources[s]),
			ok: haveEmptyPositionsAroundSource(sources[s])
		});
	}
	pathsLen.sort((a, b: { id: number, length: number, ok: boolean }) => a.length - b.length);
	// console.log("pathsLen:", JSON.stringify(pathsLen));
	if (pathsLen.length > 0) {
		for (let i = 0; i < pathsLen.length; i++) {
			let item = pathsLen[i] as { id: number, length: number, ok: boolean };
			if (item.ok) {
				creep.memory.sourceIdx = item.id;
				return;
			}
		}
	}
}

export function haveEmptyPositionsAroundSource(source: Source): boolean {
	let posList: RoomPosition[] = []
	source.room.lookForAtArea(LOOK_TERRAIN,
		source.pos.y - 1, source.pos.x - 1,
		source.pos.y + 1, source.pos.x + 1,
		true).forEach((look) => {
			// console.log(`pos: ${look.x + ',' + look.y}, look.creep: ${look.creep}, look.terrain: ${look.terrain}`);
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
