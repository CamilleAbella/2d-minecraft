import AbstractBlock from '../blocks/AbstractBlock';
import { ItemType } from '../types';
import AbstractItem from './AbstractItem';

export default class BlockItem extends AbstractItem {
	public constructor(name: string, public block: AbstractBlock) {
		super(name, ItemType.BLOCK);
	}

	public static from(block: AbstractBlock): BlockItem {
		return new BlockItem(block.name, block);
	}
}
