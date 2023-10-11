import React from "react";
import IngredientCard from "../ingredient-card/ingedient-card";
import Ingredient from "@/app/models/ingredient";
import styles from "./ingredient-list.module.css";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SaveIcon from "@mui/icons-material/Save";
import { useAtom } from "jotai";
import { selectedRecipeAtom } from "@/app/state/recipe-atoms";

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

const IngredientsList = () => {
    const [selectedRecipe, setSelectedRecipe] = useAtom(selectedRecipeAtom);

    const [open, setOpen] = React.useState(false);
    const [newIngredientName, setNewIngredientName] = React.useState("");
    const [newIngredientQuantity, setNewIngredientQuantity] = React.useState(0);
    const [newIngredientUnit, setNewIngredientUnit] = React.useState("");

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setNewIngredientName("");
        setNewIngredientQuantity(0);
        setNewIngredientUnit("");
        setOpen(false);
    };
    const handleNewIngredientNameChange = (event: any) => {
        setNewIngredientName(event.currentTarget?.value);
    };
    const handleNewIngredientQuantityChange = (event: any) => {
        setNewIngredientQuantity(event.currentTarget?.value);
    };
    const handleNewIngredientUnitChange = (event: any) => {
        setNewIngredientUnit(event.currentTarget?.value);
    };
    const handleSave = () => {
        setSelectedRecipe({
            ...selectedRecipe,
            ingredients: [
                ...selectedRecipe.ingredients,
                {
                    id: Math.floor(Math.random() * 1000) + 1,
                    name: newIngredientName,
                    quantity: newIngredientQuantity,
                    unit: newIngredientUnit,
                },
            ],
        });

        handleClose();
    };

    return (
        <div className={styles.ingredientgrid}>
            <div className={styles.ingredientlistheader}>
                <Typography variant="h4">Ingredients</Typography>
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
            <div className={styles.ingredientlist}>
                {selectedRecipe &&
                    selectedRecipe.ingredients &&
                    selectedRecipe.ingredients.map((ingredient: Ingredient) => {
                        return (
                            <IngredientCard key={ingredient.id} ingredient={ingredient} />
                        );
                    })}
            </div>

            <Modal open={open} onClose={handleClose}>
                <Box sx={sxSstyle} component="form" noValidate autoComplete="off">
                    <Typography variant="h6">New Ingredient</Typography>
                    <div>
                        <TextField
                            id="ingredient-name-text-box"
                            label="Name"
                            variant="standard"
                            onChange={handleNewIngredientNameChange}
                        />
                    </div>
                    <div>
                        <TextField
                            id="ingredient-quantity-text-box"
                            label="Quantity"
                            variant="standard"
                            onChange={handleNewIngredientQuantityChange}
                        />
                    </div>
                    <div>
                        <TextField
                            id="ingredient-unit-text-box"
                            label="Unit"
                            variant="standard"
                            onChange={handleNewIngredientUnitChange}
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

export default IngredientsList;
