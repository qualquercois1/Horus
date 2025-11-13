import supabase from "../config/databaseConfig.js";

const supabaseClient = supabase;

export const createAuthUser = async (email, password, displayName) => {
    const {data, error} = await supabaseClient.auth.signUp({
        email, 
        password,
        options: {
            data: {
                full_name: displayName,
            }
        }
    });
    if (error) throw new Error(error.message);
    return data
};

export const signInAuthUser = async (email, password) => {
    const {data, error} = await supabaseClient.auth.signInWithPassword({
        email,
        password,
    });
    if(error) throw new Error(error.message);
    return data;
}