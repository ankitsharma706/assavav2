import React from 'react';
import { CartPanel, CategoryModal, RitualToast } from './CoffeeComponents';
import type { CartItem, Product } from '../types';

interface AppOverlaysProps {
  isCartOpen: boolean;
  onCloseCart: () => void;
  items: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQty: (id: string, delta: number) => void;
  isCategoriesOpen: boolean;
  onCloseCategories: () => void;
  latestAddedItem: Product | null;
  showToast: boolean;
}

const AppOverlays: React.FC<AppOverlaysProps> = (props) => (
  <>
    <CartPanel
      isOpen={props.isCartOpen}
      onClose={props.onCloseCart}
      items={props.items}
      onRemove={props.onRemove}
      onUpdateQty={props.onUpdateQty}
    />
    <CategoryModal isOpen={props.isCategoriesOpen} onClose={props.onCloseCategories} />
    <RitualToast item={props.latestAddedItem} isVisible={props.showToast} />
  </>
);

export default AppOverlays;
