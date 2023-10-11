import React from "react";
import Recipe from "@/app/models/recipe";
import Box from "@mui/material/Box";
import styles from "./recipe-card.module.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import { useAtom, useSetAtom } from "jotai";
import { recipesAtom, selectedRecipeAtom } from "@/app/state/recipe-atoms";

type Props = {
    recipe: Recipe;
};

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

const RecipeCard = ({ recipe }: Props) => {
    const [recipes, setRecipes] = useAtom(recipesAtom);
    const setSelectedRecipe = useSetAtom(selectedRecipeAtom);

    /************************** card ***************************/
    const card = (
        <React.Fragment>
            <CardContent>
                <Typography variant="h5">Name: {recipe && recipe.name}</Typography>
                <Typography variant="body2">
                    Description: {recipe && recipe.description}
                </Typography>
            </CardContent>
        </React.Fragment>
    );

    /************************** edit modal ***************************/
    const [editModalOpen, setEditModalOpen] = React.useState(false);
    const [updatedRecipeName, setUpdatedRecipeName] = React.useState(
        recipe && recipe.name
    );
    const [updatedRecipeDescription, setUpdatedRecipeDescription] =
        React.useState(recipe && recipe.description);

    const handleOpenEditModal = () => setEditModalOpen(true);
    const handleCloseEditModal = () => {
        setEditModalOpen(false);
        setUpdatedRecipeName(recipe.name);
        setUpdatedRecipeDescription(recipe.description);
    };
    const handleRecipeNameChange = (event: any) => {
        setUpdatedRecipeName(event.currentTarget?.value);
    };
    const handleRecipeDescriptionChange = (event: any) => {
        setUpdatedRecipeDescription(event.currentTarget?.value);
    };
    const handleSaveUpdatedRecipe = () => {
        setRecipes(
            recipes.map((r) => {
                if (r.id === recipe.id) {
                    return {
                        ...r,
                        name: updatedRecipeName,
                        description: updatedRecipeDescription,
                    };
                } else {
                    return r;
                }
            })
        );

        handleCloseEditModal();
    };

    const editModal = (
        <React.Fragment>
            <Modal open={editModalOpen} onClose={handleCloseEditModal}>
                <Box sx={sxSstyle} component="form" noValidate autoComplete="off">
                    <Typography variant="h6">Edit Recipe</Typography>
                    <div>
                        <TextField
                            id="edit-recipe-name-text-box"
                            label="Name"
                            variant="standard"
                            value={updatedRecipeName}
                            onChange={handleRecipeNameChange}
                        />
                    </div>
                    <div>
                        <TextField
                            id="edit-recipe-name-text-box"
                            label="Description"
                            variant="standard"
                            value={updatedRecipeDescription}
                            onChange={handleRecipeDescriptionChange}
                        />
                    </div>
                    <br />
                    <Button
                        variant="outlined"
                        startIcon={<SaveIcon />}
                        onClick={handleSaveUpdatedRecipe}
                    >
                        Save
                    </Button>
                </Box>
            </Modal>
        </React.Fragment>
    );

    /************************** delete modal ***************************/
    const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);

    const handleOpenDeleteModal = () => setDeleteModalOpen(true);
    const handleCloseDeleteModal = () => setDeleteModalOpen(false);
    const handleDeleteRecipe = () => {
        setRecipes(recipes.filter((r) => r.id !== recipe.id));
        handleCloseDeleteModal();
    };

    const deleteModal = (
        <React.Fragment>
            <Modal open={deleteModalOpen} onClose={handleCloseDeleteModal}>
                <Box sx={sxSstyle} component="form" noValidate autoComplete="off">
                    <Typography variant="h6">Delete Recipe</Typography>
                    <Typography variant="body2">
                        Are you sure you want to delete this recipe?
                    </Typography>
                    <br />
                    <Button
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                        onClick={handleDeleteRecipe}
                    >
                        Delete
                    </Button>
                </Box>
            </Modal>
        </React.Fragment>
    );

    return (
        <>
            <Box>
                <Card variant="outlined" onClick={() => setSelectedRecipe(recipe)}>
                    <div className={styles.recipecardgrid}>
                        <div className={styles.recipecarddetails}>{card}</div>
                        <div className={styles.recipecardbuttons}>
                            <Stack direction="row" spacing={1}>
                                <IconButton color="primary" onClick={handleOpenEditModal}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton color="primary" onClick={handleOpenDeleteModal}>
                                    <DeleteIcon />
                                </IconButton>
                            </Stack>
                        </div>
                    </div>
                </Card>
            </Box>
            {editModal}
            {deleteModal}
            <br />
        </>
    );
};

export default RecipeCard;
