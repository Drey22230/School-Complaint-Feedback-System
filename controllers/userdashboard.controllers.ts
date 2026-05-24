import { getUserDashboardData } from "@/models/userdashboard.models";
export const UserDashboardController = async (user_id: number) => {
    try {
        const result = await getUserDashboardData(user_id);

    return result;
    } catch (error){
        console.error(error)

        throw error
    }
}