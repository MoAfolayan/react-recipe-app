import React from "react";
import styles from "./ingredient-card.module.css";
import Ingredient from "@/app/models/ingredient";
import Box from "@mui/material/Box";
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
import { useAtom } from "jotai";
import { selectedRecipeAtom } from "@/app/state/recipe-atoms";

type Props = {
    ingredient: Ingredient;
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

const IngredientCard = ({ ingredient }: Props) => {
    const [selectedRecipe, setSelectedRecipe] = useAtom(selectedRecipeAtom);

    /************************** card ***************************/
    const card = (
        <React.Fragment>
            <CardContent>
                <Typography variant="h5">
                    Name: {ingredient.name} <br />
                </Typography>
                <Typography variant="body2">
                    Quantity: {ingredient.quantity} {ingredient.unit}
                </Typography>
            </CardContent>
        </React.Fragment>
    );

    /************************** edit modal ***************************/
    const [editModalOpen, setEditModalOpen] = React.useState(false);
    const [updatedIngredientName, setUpdatedIngredientName] = React.useState(
        ingredient && ingredient.name
    );
    const [updatedIngredientQuantity, setUpdatedIngredientQuantity] =
        React.useState(ingredient && ingredient.quantity);
    const [updatedIngredientUnit, setUpdatedIngredientUnit] = React.useState(
        ingredient && ingredient.unit
    );

    const handleOpenEditModal = () => setEditModalOpen(true);
    const handleCloseEditModal = () => {
        setEditModalOpen(false);
        setUpdatedIngredientName(ingredient.name);
        setUpdatedIngredientQuantity(ingredient.quantity);
        setUpdatedIngredientUnit(ingredient.unit);
    };
    const handleIngredientNameChange = (event: any) => {
        setUpdatedIngredientName(event.currentTarget?.value);
    };
    const handleIngredientQuantityChange = (event: any) => {
        setUpdatedIngredientQuantity(event.currentTarget?.value);
    };
    const handleIngredientUnitChange = (event: any) => {
        setUpdatedIngredientUnit(event.currentTarget?.value);
    };
    const handleSaveUpdatedIngredient = () => {
        setSelectedRecipe({
            id: selectedRecipe.id,
            name: selectedRecipe.name,
            description: selectedRecipe.description,
            ingredients: selectedRecipe.ingredients.map((i) => {
                if (i.id == ingredient.id) {
                    return {
                        ...i,
                        name: updatedIngredientName,
                        quantity: updatedIngredientQuantity,
                        unit: updatedIngredientUnit,
                    };
                } else {
                    return i;
                }
            }),
        });

        handleCloseEditModal();
    };

    const editModal = (
        <React.Fragment>
            <Modal open={editModalOpen} onClose={handleCloseEditModal}>
                <Box sx={sxSstyle} component="form" noValidate autoComplete="off">
                    <Typography variant="h6">Edit Ingredient</Typography>
                    <div>
                        <TextField
                            id="edit-ingredient-name-text-box"
                            label="Name"
                            variant="standard"
                            value={updatedIngredientName}
                            onChange={handleIngredientNameChange}
                        />
                    </div>
                    <div>
                        <TextField
                            id="edit-ingredient-quantity-text-box"
                            label="Quantity"
                            variant="standard"
                            value={updatedIngredientQuantity}
                            onChange={handleIngredientQuantityChange}
                        />
                    </div>
                    <div>
                        <TextField
                            id="edit-ingredient-unit-text-box"
                            label="Unit"
                            variant="standard"
                            value={updatedIngredientUnit}
                            onChange={handleIngredientUnitChange}
                        />
                    </div>
                    <br />
                    <Button
                        variant="outlined"
                        startIcon={<SaveIcon />}
                        onClick={handleSaveUpdatedIngredient}
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
    const handleDeleteIngredient = () => {
        setSelectedRecipe({
            id: selectedRecipe.id,
            name: selectedRecipe.name,
            description: selectedRecipe.description,
            ingredients: selectedRecipe.ingredients.filter(
                (i) => i.id != ingredient.id
            ),
        });

        handleCloseDeleteModal();
    };

    const deleteModal = (
        <React.Fragment>
            <Modal open={deleteModalOpen} onClose={handleCloseDeleteModal}>
                <Box sx={sxSstyle} component="form" noValidate autoComplete="off">
                    <Typography variant="h6">Delete Ingredient</Typography>
                    <Typography variant="body2">
                        Are you sure you want to delete this ingredient?
                    </Typography>
                    <br />
                    <Button
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                        onClick={handleDeleteIngredient}
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
                <Card variant="outlined">
                    <div className={styles.ingredientcardgrid}>
                        <div className={styles.ingredientcarddetails}>{card}</div>
                        <div className={styles.ingredientcardbuttons}>
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

export default IngredientCard;
