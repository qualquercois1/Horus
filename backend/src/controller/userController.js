import {findAllProfiles} from '../service/userService.js';

export async function getProfiles(req,res) {
    try {
        const profiles = await findAllProfiles();
        res.status(200).json(profiles);
    } catch (error) {
        res.status(500).json({
            message: 'Erro ao buscar perfis',
            details: error.message
        });
    }
    
}