import AbstractBlock from '../blocks/AbstractBlock';
import Blocks from '../blocks/Blocks';
import Tile from '../client/renderer/Tile';
import { game } from '../main';
import PIXI from '../PIXI';
import { StringTilePosition } from '../types';
import ChunkPosition from '../utils/ChunkPosition';
import Collection from '../utils/Collection';
import Position from '../utils/Position';
import TilePosition from '../utils/TilePosition';
import IDisplayable from '../utils/IDisplayable';

export default class Chunk implements IDisplayable {
	private _displayed: boolean;

	public get displayed(): boolean {
		return this._displayed;
	}

	public set displayed(displayed: boolean) {
		if (this._displayed !== displayed) {
			this._displayed = displayed;
			this.tiles.forEach((t) => {
				t.sprite.visible = displayed;
			});
		}
	}

	public readonly tiles: Collection<StringTilePosition, Tile> = new Collection<StringTilePosition, Tile>();
	private container: PIXI.Container;

	public constructor(public position: ChunkPosition) {
		this.container = new PIXI.Container();
		this.fill(Blocks.AIR);
	}

	public setTile(tile: Tile): Tile {
		const stringTilePosition: StringTilePosition = tile.position.stringify();
		if (this.tiles.has(stringTilePosition)) game.app.stage.removeChild(this.tiles.get(stringTilePosition).getAsSprite());
		this.tiles.set(stringTilePosition, tile);
		tile.addToApplication(game.app);
		return tile;
	}

	public clear(): void {
		this.tiles.forEach((t) => {
			game.app.stage.removeChild(t.getAsSprite());
		});
		this.tiles.clear();
		this.fill(Blocks.AIR);
	}

	public getTileAt(position: TilePosition): Tile | null {
		if (!this.tiles.has(position.stringify())) {
			return null;
		}

		return this.tiles.get(position.stringify());
	}

	public update(): void {
		for (const tile of this.tiles.values()) {
			const tileSprite = tile.getAsSprite();
			if (this.displayed && !game.app.stage.children.includes(tileSprite)) {
				game.app.stage.addChild(tileSprite);
			} else if (!this.displayed && game.app.stage.children.includes(tileSprite)) {
				game.app.stage.removeChild(tileSprite);
			}
			tile.update();
		}
	}

	public updateRendering(): void {
		this.displayed = !this.canHide();
	}

	public fill(block: AbstractBlock): void {
		for (let i = 0; i < 16; i++) {
			for (let j = 0; j < 16; j++) {
				const position = new TilePosition(i, j).addTilePosition(this.position.toTilePosition());
				this.setTile(new Tile(block, position));
			}
		}
	}

	public canHide(): boolean {
		const position: Position = this.position.toTilePosition();
		return position.distanceFrom(game.player.tileOn) > 96;
	}
}
