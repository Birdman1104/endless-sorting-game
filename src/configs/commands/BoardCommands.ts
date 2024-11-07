import Head from '../../models/HeadModel';
import { ItemType } from '../../models/ItemModel';

export const onMatchCommand = (type: ItemType, index: number) => {
    Head.gameModel?.board?.matchedItems.push(type);
    Head.gameModel?.board?.addNewItems(index);
};
