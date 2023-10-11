import Ingredient from "./ingredient";

interface Recipe {
    id: number;
    name: string;
    description: string;
    ingredients: Ingredient[];
}

export default Recipe;
