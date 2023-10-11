import Recipe from "./recipe";

interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    recipes: Recipe[];
}

export default User;
