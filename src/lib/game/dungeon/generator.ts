/**
 * Dungeon Generator
 * Procedural dungeon generation using BSP (Binary Space Partitioning)
 */

import type { Dungeon, DungeonConfig, Room, TileType } from './types'
import { TileType as Tile } from './types'

/**
 * Simple seeded random number generator (LCG)
 */
class SeededRandom {
	private seed: number

	constructor(seed: number = Date.now()) {
		this.seed = seed
	}

	next(): number {
		this.seed = (this.seed * 1103515245 + 12345) & 0x7fffffff
		return this.seed / 0x7fffffff
	}

	nextInt(min: number, max: number): number {
		return Math.floor(this.next() * (max - min + 1)) + min
	}
}

/**
 * Generate a procedural dungeon
 */
export function generateDungeon(config: DungeonConfig): Dungeon {
	const rng = new SeededRandom(config.seed)
	const tiles = createEmptyGrid(config.width, config.height)
	const rooms: Room[] = []

	// Generate rooms
	const numRooms = rng.nextInt(config.minRooms, config.maxRooms)
	let attempts = 0
	const maxAttempts = 100

	while (rooms.length < numRooms && attempts < maxAttempts) {
		const room = generateRoom(config, rng)

		if (!overlapsWithExistingRooms(room, rooms)) {
			rooms.push(room)
			carveRoom(tiles, room)
		}

		attempts++
	}

	// Connect rooms with corridors
	connectRooms(tiles, rooms, rng)

	// Mark entrance and exit
	const entrance = { x: rooms[0].centerX, y: rooms[0].centerY }
	const exit = { x: rooms[rooms.length - 1].centerX, y: rooms[rooms.length - 1].centerY }

	tiles[entrance.y][entrance.x] = Tile.ENTRANCE
	tiles[exit.y][exit.x] = Tile.EXIT

	rooms[0].hasEntrance = true
	rooms[rooms.length - 1].hasExit = true

	// Create explored grid (all false initially)
	const explored = createBooleanGrid(config.width, config.height, false)

	return {
		id: generateDungeonId(),
		config,
		tiles,
		rooms,
		entrance,
		exit,
		explored,
		createdAt: Date.now(),
	}
}

/**
 * Create empty tile grid
 */
function createEmptyGrid(width: number, height: number): TileType[][] {
	return Array.from({ length: height }, () => Array(width).fill(Tile.EMPTY))
}

/**
 * Create boolean grid
 */
function createBooleanGrid(width: number, height: number, value: boolean): boolean[][] {
	return Array.from({ length: height }, () => Array(width).fill(value))
}

/**
 * Generate a random room
 */
function generateRoom(config: DungeonConfig, rng: SeededRandom): Room {
	const width = rng.nextInt(config.minRoomSize, config.maxRoomSize)
	const height = rng.nextInt(config.minRoomSize, config.maxRoomSize)
	const x = rng.nextInt(1, config.width - width - 1)
	const y = rng.nextInt(1, config.height - height - 1)

	return {
		id: generateRoomId(),
		x,
		y,
		width,
		height,
		centerX: Math.floor(x + width / 2),
		centerY: Math.floor(y + height / 2),
		connected: false,
	}
}

/**
 * Check if room overlaps with existing rooms
 */
function overlapsWithExistingRooms(room: Room, existingRooms: Room[]): boolean {
	for (const existing of existingRooms) {
		if (
			room.x < existing.x + existing.width + 1 &&
			room.x + room.width + 1 > existing.x &&
			room.y < existing.y + existing.height + 1 &&
			room.y + room.height + 1 > existing.y
		) {
			return true
		}
	}
	return false
}

/**
 * Carve a room into the tile grid
 */
function carveRoom(tiles: TileType[][], room: Room): void {
	// Carve walls first
	for (let y = room.y; y < room.y + room.height; y++) {
		for (let x = room.x; x < room.x + room.width; x++) {
			if (
				x === room.x ||
				x === room.x + room.width - 1 ||
				y === room.y ||
				y === room.y + room.height - 1
			) {
				tiles[y][x] = Tile.WALL
			}
		}
	}

	// Then carve floor
	for (let y = room.y + 1; y < room.y + room.height - 1; y++) {
		for (let x = room.x + 1; x < room.x + room.width - 1; x++) {
			tiles[y][x] = Tile.FLOOR
		}
	}
}

/**
 * Connect all rooms with corridors
 */
function connectRooms(tiles: TileType[][], rooms: Room[], rng: SeededRandom): void {
	for (let i = 0; i < rooms.length - 1; i++) {
		const roomA = rooms[i]
		const roomB = rooms[i + 1]

		// Randomly choose horizontal-first or vertical-first
		if (rng.next() > 0.5) {
			createHorizontalCorridor(tiles, roomA.centerX, roomB.centerX, roomA.centerY)
			createVerticalCorridor(tiles, roomA.centerY, roomB.centerY, roomB.centerX)
		} else {
			createVerticalCorridor(tiles, roomA.centerY, roomB.centerY, roomA.centerX)
			createHorizontalCorridor(tiles, roomA.centerX, roomB.centerX, roomB.centerY)
		}

		roomA.connected = true
		roomB.connected = true
	}
}

/**
 * Create a horizontal corridor
 */
function createHorizontalCorridor(
	tiles: TileType[][],
	x1: number,
	x2: number,
	y: number
): void {
	const startX = Math.min(x1, x2)
	const endX = Math.max(x1, x2)

	for (let x = startX; x <= endX; x++) {
		if (tiles[y][x] === Tile.EMPTY) {
			tiles[y][x] = Tile.CORRIDOR
		}
	}
}

/**
 * Create a vertical corridor
 */
function createVerticalCorridor(tiles: TileType[][], y1: number, y2: number, x: number): void {
	const startY = Math.min(y1, y2)
	const endY = Math.max(y1, y2)

	for (let y = startY; y <= endY; y++) {
		if (tiles[y][x] === Tile.EMPTY) {
			tiles[y][x] = Tile.CORRIDOR
		}
	}
}

/**
 * Generate unique dungeon ID
 */
function generateDungeonId(): string {
	return `dungeon_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Generate unique room ID
 */
function generateRoomId(): string {
	return `room_${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Get tile character for display (for debugging)
 */
export function getTileChar(tile: TileType): string {
	switch (tile) {
		case Tile.EMPTY:
			return ' '
		case Tile.FLOOR:
			return '.'
		case Tile.WALL:
			return '#'
		case Tile.DOOR:
			return '+'
		case Tile.CORRIDOR:
			return '.'
		case Tile.ENTRANCE:
			return 'E'
		case Tile.EXIT:
			return 'X'
		case Tile.CHEST:
			return 'C'
		case Tile.ENEMY:
			return 'M'
		default:
			return '?'
	}
}

/**
 * Print dungeon to console (for debugging)
 */
export function printDungeon(dungeon: Dungeon): void {
	const lines: string[] = []

	for (let y = 0; y < dungeon.config.height; y++) {
		let line = ''
		for (let x = 0; x < dungeon.config.width; x++) {
			line += getTileChar(dungeon.tiles[y][x])
		}
		lines.push(line)
	}

	console.log(lines.join('\n'))
}
