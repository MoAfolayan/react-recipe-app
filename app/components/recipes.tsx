import React from "react";
import RecipeList from "./recipe-list/recipe-list";
import IngredientsList from "./ingredient-list/ingredient-list";
import { useSetAtom } from "jotai";
import { recipesAtom } from "../state/recipe-atoms";

const Recipes = () => {
    const setRecipes = useSetAtom(recipesAtom);

    const getRecipes = () => {
        fetch("http://localhost:3000/api/user/1")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Could not fetch the data for that resource");
                }
                return response.json();
            })
            .then((data) => {
                setRecipes(data.user.recipes);
            })
            .catch((error) => {
                console.error(
                    "There has been a problem with your fetch operation:",
                    error
                );
            });
    };

    React.useEffect(() => {
        getRecipes();
    }, []);

    return (
        <>
            <div className="global-recipe-list">
                <RecipeList />
            </div>
            <div className="global-ingredient-list">
                <IngredientsList />
            </div>
        </>
    );
};

export default Recipes;
