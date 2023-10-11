import { atom } from 'jotai'
import Recipe from '../models/recipe';

export const recipesAtom = atom<Recipe[]>([]);
export const selectedRecipeAtom = atom<Recipe>({} as Recipe);