import { pool } from "../../config/db"

export default async function handler(req, res) {

    if (req.method == "GET"){
        try{
        const schools = await pool.query("SELECT school_name FROM schools");
        const divisions = await pool.query("select division_name from divisions")
        return res.status(200).json({schools,divisions});
        }
        catch(error){
            return res.status(500).json({ error });
        }
    }

    if (req.method == "POST"){
        try {
            const schools = await pool.query("call getSchoolsByDivision(?)", [req.body.selectedDivision]);
            console.log(schools)
            console.log(req.body)
            return res.status(200).json(schools);
        }
        catch (error){
            return res.status(500).json({ error });
        }
    }
  }