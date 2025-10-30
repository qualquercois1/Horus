import supabase from '../config/databaseConfig.js';

const supabaseClient = supabase;

export async function findAllProfiles() {
    const {data, error} = await supabaseClient.from('profiles').select('*');
    if(error) throw new Error(error.message);
    return data;
}