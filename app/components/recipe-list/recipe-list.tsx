import React from "react";
import RecipeCard from "../recipe-card/recipe-card";
import Recipe from "@/app/models/recipe";
import styles from "./recipe-list.module.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SaveIcon from "@mui/icons-material/Save";
import { useAtom } from "jotai";
import { recipesAtom } from "@/app/state/recipe-atoms";

const sxSstyle = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 200,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    borderRadius: "10px",
};

const RecipeList = () => {
    const [recipes, setRecipes] = useAtom(recipesAtom);

    const [open, setOpen] = React.useState(false);
    const [newRecipeName, setNewRecipeName] = React.useState("");
    const [newRecipeDescription, setNewRecipeDescription] = React.useState("");

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setNewRecipeName("");
        setNewRecipeDescription("");
        setOpen(false);
    };
    const handleNewRecipeNameChange = (event: any) => {
        setNewRecipeName(event.currentTarget?.value);
    };
    const handleNewRecipeDescriptionChange = (event: any) => {
        setNewRecipeDescription(event.currentTarget?.value);
    };
    const handleSave = () => {
        setRecipes([
            ...recipes,
            {
                id: Math.floor(Math.random() * 1000) + 1,
                name: newRecipeName,
                description: newRecipeDescription,
                ingredients: [],
            },
        ]);

        handleClose();
    };

    return (
        <div className={styles.recipegrid}>
            <div className={styles.recipelistheader}>
                <Typography variant="h4">Recipes</Typography>
            </div>

            <div className={styles.addNewButton}>
                <Button
                    variant="outlined"
                    startIcon={<AddCircleIcon />}
                    onClick={handleOpen}
                >
                    New
                </Button>
            </div>
            <div className={styles.recipelist}>
                {recipes.map((recipe: Recipe) => {
                    return <RecipeCard key={recipe.id} recipe={recipe} />;
                })}
            </div>
            <Modal open={open} onClose={handleClose}>
                <Box sx={sxSstyle} component="form" noValidate autoComplete="off">
                    <Typography variant="h6">New Recipe</Typography>
                    <div>
                        <TextField
                            id="recipe-name-text-box"
                            label="Name"
                            variant="standard"
                            onChange={handleNewRecipeNameChange}
                        />
                    </div>
                    <div>
                        <TextField
                            id="recipe-description-text-box"
                            label="Description"
                            variant="standard"
                            onChange={handleNewRecipeDescriptionChange}
                        />
                    </div>
                    <br />
                    <Button
                        variant="outlined"
                        startIcon={<SaveIcon />}
                        onClick={handleSave}
                    >
                        Save
                    </Button>
                </Box>
            </Modal>
        </div>
    );
};

export default RecipeList;
