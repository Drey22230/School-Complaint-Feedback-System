import { registerUser } from "@/models/register.models";

export const registerHandler = async (body: any) => {
    try {   
        const { username, email, password, role } = body;
        if (!username || !email || !password || !role) {
            throw new Error("All fields are required");
        }   
        const newUser = await registerUser(body);
        return newUser;
    }   catch (error) { 
        console.error("Error in registerHandler:", error);
        throw new Error((error as Error).message);
    }   
}